/* tslint:disable:curly */
import { Component, OnInit, OnDestroy, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpRequest, HttpResponse, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { guid, UploadFile, LocalFile, UPLOAD_FILE_STATE, LocalFilesService, ViewerService, FileService } from '../shared';

@Component({
    selector: 'dig-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss'],
    providers: [
        {provide: ViewerService, useClass: LocalFilesService}
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigFileUploaderComponent implements OnInit, OnDestroy {
    private _listenFileUploads: Subscription;
    private filesUploadQueue$ = new Subject<UploadFile>();
    uploadedFiles: string[] = [];
    selectedFileIndex: number;

    @Input() url = 'http://httpbin.org/post';

    dragAreaClass = 'dragarea';

    files: UploadFile[] = [];

    @HostListener('dragover', ['$event']) onDragOver(event) {
        this.dragAreaClass = 'droparea';
        event.preventDefault();
    }
    @HostListener('dragleave', ['$event']) onDragLeave(event) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
    }
    @HostListener('drop', ['$event']) onDrop(event) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
        event.stopPropagation();

        const files: File[] = event.dataTransfer.files;
        this.handleFileChange(files);
    }

    onFileChange(event) {
        const files: File[] = event.target.files;
        this.handleFileChange(files);
    }

    removeFile(file: UploadFile) {
        const fileIndex = this.files.findIndex(f => f.guid === file.guid);
        const carouselFileIndex = this.uploadedFiles.findIndex(f => JSON.parse(f).name === file.name);

        if (fileIndex === -1) return;

        this.files = [
            ...this.files.slice(0, fileIndex),
            ...this.files.slice(fileIndex + 1)
        ];

        this.uploadedFiles = [
            ...this.uploadedFiles.slice(0, carouselFileIndex),
            ...this.uploadedFiles.slice(carouselFileIndex + 1)
        ];
    }

    viewFile(file: UploadFile, index: number, carousel) {
        this.selectedFileIndex = index;
        carousel.openPanelWithBackdrop();
    }

    trackByRef(index: number, file: UploadFile) {
        const { guid, progress } = file;
        return [ guid, progress ].join('-');
    }

    handleFileChange(files: File[]) {
        this.selectedFileIndex = null;
        const _normalizedFiles = Array.from(files);

        if (_normalizedFiles && _normalizedFiles.length > 0) {
            const newFiles = _normalizedFiles.map(file => new UploadFile(file, guid()));
            this.files = [...this.files, ...newFiles];
            newFiles.forEach(file => this.filesUploadQueue$.next(file));
        }
    }

    updateFile = (file: UploadFile) => (updateFn: (f: UploadFile) => UploadFile) => {
        const index = this.files.findIndex(f => f.guid === file.guid);
        if (index === -1) return;

        const newFile = updateFn(
            new UploadFile(file.uploadedFile, file.guid)
        );

        this.files = [
            ...this.files.slice(0, index),
            newFile,
            ...this.files.slice(index + 1)
        ];

        this.ref.markForCheck();
    }

    constructor(private ref: ChangeDetectorRef,
                private httpClient: HttpClient,
                private fileService: FileService) {}

    ngOnInit() {
        this._listenFileUploads = this.filesUploadQueue$
            .asObservable()
            .concatMap(file => this.createUploadQueueItem(file))
            .subscribe();
    }

    ngOnDestroy() {
        this._listenFileUploads.unsubscribe();
    }

    createUploadQueueItem(file: UploadFile) {
        const formData = new FormData();
        formData.append('file', file.uploadedFile, file.name);
        const request = new HttpRequest<FormData>('POST', this.url, formData, {
            reportProgress: true
        });
        const update = this.updateFile(file);

        return this.httpClient
            .request<FormData>(request)
            .do(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    const progress = Math.round(100 * event.loaded / event.total);

                    update(newFile => {
                        newFile.progress = progress;
                        return newFile;
                    });
                }
            })
            .filter(event => event instanceof HttpResponse)
            .do(res => {
                update(newFile => {
                    newFile.state = UPLOAD_FILE_STATE.EDIT;
                    return newFile;
                });

                this.fileService.getLocalFile(file.uploadedFile)
                    .subscribe(localFile =>
                        this.uploadedFiles = [...this.uploadedFiles, JSON.stringify(localFile)]
                    );
            })
            .catch(err => {
                this.handleError(file, err);
                return empty();
            });
    }

    handleError(file: UploadFile, err: HttpErrorResponse) {
        this.updateFile(file)(newFile => {
            newFile.state = UPLOAD_FILE_STATE.FAILED;
            return newFile;
        });
    }
}

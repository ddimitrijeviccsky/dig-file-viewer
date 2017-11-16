import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LocalFilesService, FileService, ViewerService, guid, UploadFile, UPLOAD_FILE_STATE } from '../shared';

@Component({
    selector: 'dig-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
    providers: [
        {provide: ViewerService, useClass: LocalFilesService}
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigFileListComponent {
    private _selectedFileIndex: number;
    private _carouselFiles: string[] = [];
    private _files: UploadFile[];

    @Input()
    set files (files: File[]){

        this._carouselFiles = [];
        this._files = [];
        this._selectedFileIndex = null;

        files.forEach(file => {
            this.transformAndSend(file);
        });
    }

    get uploadFile() {
        return this._files;
    }

    get carouselFiles() {
        return this._carouselFiles;
    }
    get selectedFileIndex() {
        return this._selectedFileIndex;
    }

    private transformAndSend(file) {
        this.fileService.getLocalFile(file)
            .subscribe(response => {
                this._carouselFiles = [...this._carouselFiles, JSON.stringify(response)];

                const newFile = new UploadFile(file, guid());
                newFile.state = UPLOAD_FILE_STATE.FINISHED;
                this._files = [...this._files, newFile];
                this.ref.markForCheck();
            }
        );
    }

    constructor(private ref: ChangeDetectorRef,
                private fileService: FileService) {}

    viewFile(file: UploadFile, fileIndex: number, carousel) {
        this._selectedFileIndex = fileIndex;
        carousel.openPanelWithBackdrop();
    }

    trackByRef(index: number, file: UploadFile) {
        const { guid, progress } = file;
        return [ guid, progress ].join('-');
    }
}

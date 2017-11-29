/* tslint:disable:curly */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ViewerService, guid, UploadFile, UPLOAD_FILE_STATE } from '../shared';

@Component({
    selector: 'dig-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigFileListComponent {
    private _selectedFileIndex: number;
    private _carouselUrls: string[] = [];
    private _files: UploadFile[];
    errorMessages: string[] = [];

    @Input()
    set files (urls: string[]){

        this._carouselUrls = urls;
        this._files = [];
        this.errorMessages = [];
        this._selectedFileIndex = null;

        urls.forEach(url => {
            this.transformAndSend(url);
        });
    }

    get uploadFile() {
        return this._files;
    }

    get carouselUrls() {
        return this._carouselUrls;
    }
    get selectedFileIndex() {
        return this._selectedFileIndex;
    }

    private transformAndSend(url) {
        this.viewerService.getFile(url)
            .subscribe(response => {
                const newFile = new File([response.body], response.name, {type: response.type});
                const uploadFile = new UploadFile(newFile, guid());
                uploadFile.state = UPLOAD_FILE_STATE.FINISHED;
                this._files = [...this._files, uploadFile];
                this.ref.markForCheck();
            },
            err => {
                this.removeUrl(url);
                this.errorMessages = [...this.errorMessages, err.message];
            });
    }

    removeUrl(url: string) {
        const urlIndex = this._carouselUrls.findIndex(fileUrl => fileUrl === url);

        if (urlIndex === -1) return;

        this._carouselUrls = [
            ...this._carouselUrls.slice(0, urlIndex),
            ...this._carouselUrls.slice(urlIndex + 1)
        ];
    }

    constructor(private ref: ChangeDetectorRef,
                private viewerService: ViewerService) {}

    viewFile(file: UploadFile, fileIndex: number, carousel) {
        this._selectedFileIndex = fileIndex;
        carousel.openPanelWithBackdrop();
    }

    trackByRef(index: number, file: UploadFile) {
        const { guid, progress } = file;
        return [ guid, progress ].join('-');
    }
}

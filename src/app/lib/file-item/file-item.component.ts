import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { UploadFile, UPLOAD_FILE_STATE } from '../shared';

@Component({
    selector: 'dig-file-item',
    templateUrl: './file-item.component.html',
    styleUrls: ['./file-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigFileItemComponent {
    @Input() file: UploadFile;
    @Output() remove = new EventEmitter();
    @Output() view = new EventEmitter();

    STATE = UPLOAD_FILE_STATE;

    removeFile(file) {
        this.remove.emit(file);
    }

    viewFile(file) {
        this.view.emit(file);
    }
}

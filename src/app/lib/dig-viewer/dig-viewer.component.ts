/* tslint:disable:curly */
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { ViewerService, FileMIMEType, ViewFile } from '../shared';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

type DigViewerPayload
    = { valid: false, message: string }
    | { valid: true, file: ViewFile };

@Component({
    selector: 'dig-viewer',
    templateUrl: './dig-viewer.component.html',
    styleUrls: ['./dig-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigViewerComponent {
    payload$: Observable<DigViewerPayload> = of(null);

    // this will allow us to use enums inside template
    TYPE = FileMIMEType;

    @Input()
    set selectedUrl (url: string) {
        if (!url) return;

        this.payload$ = this.viewerService
            .getFile(url)
            .map(file => ({ file, valid: true as true }))
            .catch(err => of({ message: err, valid: false as false }));
    }

    constructor(private viewerService: ViewerService) { }
}

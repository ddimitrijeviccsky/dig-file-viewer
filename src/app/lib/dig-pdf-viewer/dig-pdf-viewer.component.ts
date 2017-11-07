import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'dig-pdf-viewer',
    templateUrl: './dig-pdf-viewer.component.html',
    styleUrls: ['./dig-pdf-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigPdfViewerComponent {
    @Input() pdfUrl: string;

    constructor(public sanitizer: DomSanitizer) { }
}

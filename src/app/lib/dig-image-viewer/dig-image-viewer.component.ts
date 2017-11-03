import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'dig-image-viewer',
    templateUrl: './dig-image-viewer.component.html',
    styleUrls: ['./dig-image-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigImageViewerComponent {
    @Input() base64image: string;
}

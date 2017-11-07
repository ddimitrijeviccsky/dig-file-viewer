import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'dig-video-viewer',
    templateUrl: './dig-video-viewer.component.html',
    styleUrls: ['./dig-video-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigVideoViewerComponent {
    @Input() base64video: string;
}

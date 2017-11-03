import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ViewFile } from '../shared';

@Component({
    selector: 'dig-other-viewer',
    templateUrl: './dig-other-viewer.component.html',
    styleUrls: ['./dig-other-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigOtherViewerComponent {
    @Input() file: ViewFile;
}

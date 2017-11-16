import { Component } from '@angular/core';

import { DigViewerCarouselComponent } from './lib/carousel';

@Component({
  selector: 'dig-viewer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    digUrls: string[] = [];
    fileList = [];

    populateUrls(urls: string, digCarousel: DigViewerCarouselComponent) {
        if (urls.length > 0) {
            this.digUrls = urls.split(' ');
            digCarousel.openPanelWithBackdrop();
        }
    }

    populateFileList(event) {
        const files = Array.from(event.target.files);
        this.fileList = [...this.fileList, ...files];
    }
}

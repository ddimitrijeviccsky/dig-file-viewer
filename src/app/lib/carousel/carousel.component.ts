import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import {
    ComponentPortal,
    Portal,
    TemplatePortalDirective
  } from '@angular/cdk/portal';

import {
    QueryList,
    ViewChild
} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'dig-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigViewerCarouselComponent {
    private _urls: string[];
    private _selectedUrlIndex = 0;

    @Input()
    set urls(urls: string[]) {
        this._urls = urls;
        // reset the carousel
        this.currentUrl$.next(urls[0]);
    }
    get urls() {
        return this._urls;
    }

    @Input()
    set selectedUrlIndex(index: number) {
        this._selectedUrlIndex = index;
        const currentUrl = this.urls[this._selectedUrlIndex];
        this.currentUrl$.next(currentUrl);
    }
    get selectedUrlIndex() {
        return this._selectedUrlIndex;
    }

    @ViewChild(TemplatePortalDirective) templatePortal: Portal<any>;

    currentUrl$: Subject<string> = new Subject();

    constructor(public overlay: Overlay) { }

    openPanelWithBackdrop() {
        const config = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-dark-backdrop',
            positionStrategy: this.overlay.position().global().centerHorizontally()
        });
        const overlayRef = this.overlay.create(config);
        overlayRef.attach(this.templatePortal);
        overlayRef.backdropClick().subscribe(() => overlayRef.detach());
        const currentUrl = this.urls[this._selectedUrlIndex];
        this.currentUrl$.next(currentUrl);
    }

    slideNext() {
        if (this.selectedUrlIndex < (this.urls.length - 1)) {
            this.selectedUrlIndex += 1;
        }
    }

    slidePrev() {
        if (this.selectedUrlIndex > 0) {
            this.selectedUrlIndex -= 1;
        }
    }
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {
    ComponentPortal,
    Portal,
    TemplatePortalDirective
  } from '@angular/cdk/portal';

import {
    QueryList,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'dig-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DigViewerCarouselComponent{
    @ViewChild(TemplatePortalDirective) templatePortal: Portal<any>;

    constructor(public overlay: Overlay){}

    openPanelWithBackdrop() {
        const config = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-dark-backdrop',
            positionStrategy: this.overlay.position().global().centerHorizontally()
        });
        const overlayRef = this.overlay.create(config);
        overlayRef.attach(this.templatePortal);
        overlayRef.backdropClick().subscribe(() => overlayRef.detach());
    }
}
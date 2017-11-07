import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

// Components
import { DigViewerCarouselComponent } from './carousel/carousel.component';

@NgModule({
    declarations: [
        DigViewerCarouselComponent
    ],
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule,
        AngularFontAwesomeModule
    ],
    exports: [
        DigViewerCarouselComponent,
    ],
    providers: []
})

export class DigViewerModule {}

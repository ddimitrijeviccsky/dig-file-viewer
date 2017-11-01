import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

//Components
import { DigViewerCarouselComponent } from './carousel/carousel.component';

@NgModule({
    declarations: [ 
        DigViewerCarouselComponent
    ],
    imports: [ 
        CommonModule, 
        OverlayModule,
        PortalModule
    ],
    exports: [
        DigViewerCarouselComponent,
    ],
    providers: []
})

export class DigViewerModule {}
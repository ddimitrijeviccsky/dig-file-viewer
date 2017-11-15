import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { HttpClientModule } from '@angular/common/http';

import './rxjs-operators';

import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

// Components
import { DigViewerComponent } from './dig-viewer';
import { DigViewerCarouselComponent } from './carousel';
import { DigOtherViewerComponent } from './dig-other-viewer';
import { DigImageViewerComponent } from './dig-image-viewer';
import { DigPdfViewerComponent } from './dig-pdf-viewer';
import { DigVideoViewerComponent } from './dig-video-viewer';
import { DigFileUploaderComponent } from './file-uploader';
import { DigFileItemComponent } from './file-item';

// Services
import { ViewerService, FileService } from './shared';

// Pipes
import { TruncatePipe } from './shared';

@NgModule({
    declarations: [
        DigViewerComponent,
        DigViewerCarouselComponent,
        DigOtherViewerComponent,
        DigImageViewerComponent,
        DigPdfViewerComponent,
        DigVideoViewerComponent,
        DigFileUploaderComponent,
        DigFileItemComponent,
        TruncatePipe
    ],
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule,
        HttpClientModule,
        AngularFontAwesomeModule
    ],
    exports: [
        DigViewerCarouselComponent,
        DigFileUploaderComponent
    ],
    providers: [ FileService ]
})

export class DigViewerModule {
    static forRoot() {
        return {
            ngModule: DigViewerModule,
            providers: [ViewerService]
        };
    }
}

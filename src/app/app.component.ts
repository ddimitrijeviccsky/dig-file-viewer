import { Component } from '@angular/core';

@Component({
  selector: 'dig-viewer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  digUrls: string[] = [];

  populateUrls(urls: string) {
    if (urls.length > 0) {
      this.digUrls = urls.split(' ');
    }
  }

}

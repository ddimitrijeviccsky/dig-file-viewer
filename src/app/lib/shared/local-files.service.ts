import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { ViewFile } from './view-file';

@Injectable()
export class LocalFilesService {

    getFile(f: string): Observable<ViewFile> {
        const file = JSON.parse(f);

        return Observable.create((observer: Observer<ViewFile>) => {
            observer.next({name: file.name, body: file.body, type: file.type, url: file.body});
        });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { of } from 'rxjs/observable/of';

import { ViewFile } from './view-file';
import { FileMIMEType } from './mime-types';

interface ResponseCache {
    [url: string]: ViewFile;
}

const ENCODE = [FileMIMEType.IMAGE_JPEG, FileMIMEType.IMAGE_PNG];

@Injectable()
export class ViewerService {

    private isValidUrl = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;

    private fileCache: Map<string, ViewFile> = new Map();

    constructor(private http: HttpClient) { }

    getFile(url: string): Observable<ViewFile> {
        if (!this.isValidUrl.test(url)) {
            return Observable.throw(`Wrong url format for "${url}"`);
        }

        return this.fileCache.has(url)
            ? of(this.fileCache.get(url))
            : this.http
                .get(url, { observe: 'response', responseType: 'blob' })
                .switchMap(response => responseToDigFile(response))
                .do(file => this.fileCache.set(url, file));
    }
}

function responseToDigFile(httpResponse: HttpResponse<Object>): Observable<ViewFile> {
    const type = httpResponse.headers.get('content-type');
    const url = httpResponse.url;

    return Observable.create((observer: Observer<ViewFile>) => {
        // we can remove this when we figure out
        // why encoded pdf wont render
        if (!ENCODE.includes(type as FileMIMEType)) {
            observer.next(null);
            observer.complete();
            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(httpResponse.body as Blob);

        reader.onloadend = () => {
            observer.next(reader.result);
            observer.complete();
        };

        reader.onerror = () => observer.error('Failed to parse the file.');
    })
    .map(body => ({ url, body, type }));
}

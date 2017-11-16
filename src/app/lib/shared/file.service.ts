import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { LocalFile } from '../shared';

@Injectable()
export class FileService {

    getLocalFile(file: File): Observable<LocalFile> {
        const type = file.type;
        const name = file.name;

        return Observable.create((observer: Observer<string>) => {
            const reader = new FileReader();

            reader.readAsDataURL(file as Blob);

            reader.onloadend = () => {
                observer.next(reader.result);
                observer.complete();
            };

            reader.onerror = () => observer.error('Failed to parse the file.');
        })
        .map(body => ({ name, body, type }));
    }

    getBase64File(file: File): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            const reader = new FileReader();

            reader.readAsDataURL(file as Blob);

            reader.onloadend = () => {
                observer.next(reader.result);
                observer.complete();
            };

            reader.onerror = () => observer.error('Failed to parse the file.');
        });
    }
}

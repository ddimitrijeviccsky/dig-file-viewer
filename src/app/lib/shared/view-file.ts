import { FileMIMEType } from './mime-types';

export interface ViewFile {
    type: FileMIMEType | string;
    body: any;
    url: string;
}

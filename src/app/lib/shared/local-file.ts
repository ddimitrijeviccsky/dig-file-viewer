import { FileMIMEType } from './mime-types';

export interface LocalFile {
    type: FileMIMEType | string;
    body: any;
    name: string;
}

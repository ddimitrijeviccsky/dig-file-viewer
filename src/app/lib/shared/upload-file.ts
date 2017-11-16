export enum UPLOAD_FILE_STATE  {
    EDIT,
    PROGRESS,
    FINISHED,
    FAILED
}

export class UploadFile {
    state: UPLOAD_FILE_STATE = UPLOAD_FILE_STATE.PROGRESS;

    constructor(
        private file: File,
        public readonly guid: string
    ) { }

    progress = 0;

    get name() {
        return this.file.name;
    }

    get type() {
        return this.file.type;
    }

    get size() {
        return this.file.size;
    }

    get uploadedFile() {
        return this.file;
    }
}

export default class OperationFailedException extends Error {
    constructor() {
        super('Operation failed');
        this.name = 'OperationFailedException';
    }
}

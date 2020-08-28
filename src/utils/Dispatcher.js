export default class Dispatcher {
    constructor() {
        this.handlers = [];
    }
    listen(handler) {
        this.handlers.push(handler);
    }
    emit(...args) {
        this.handlers.forEach((handler) => {
            handler(...args);
        });
    }
}

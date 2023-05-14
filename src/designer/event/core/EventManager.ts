class EventManager {
    events: any = {};

    register(type: string, handler: Function) {
        if (!this.events[type])
            this.events[type] = [];
        this.events[type].push(handler);
    }

    unregister(type: string, handler: Function) {
        if (!this.events[type])
            return;

        const index = this.events[type].indexOf(handler);
        if (index > -1)
            this.events[type].splice(index, 1);

    }

    emit(type: string, ...args: any[]) {
        if (!this.events[type])
            return;
        this.events[type].forEach((handler: Function) => {
            handler(...args);
        });
    }
}

const eventManager = new EventManager();
export default eventManager;
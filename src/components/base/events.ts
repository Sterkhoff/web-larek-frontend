type EventName = Events;
type Subscriber = (data: any) => void;

export enum Events {
    ORDER_SUBMIT = 'order-submit',
    ORDER_BEFORE_SUBMIT = 'order-before-submit',
    ORDER_SUCCESS = 'order-success',
    ORDER_CLOSE = 'order-close',
    ORDER_OPEN_CONTACTS = 'order-open-contacts',
    ORDER_CHANGE = 'order-change',
    ORDER_CONTACTS_CHANGE = 'order-contacts-change',
    BASKET_CHANGE = 'basket-change',
    BASKET_OPEN = 'basket-open',
    BASKET_ADD = 'basket-add',
    BASKET_REMOVE = 'basket-remove',
    BASKET_BUY = 'basket-buy',
    PRODUCT_SELECT = 'product-select'
}

export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

export class eventEmitter implements IEvents {
    _events: Map<EventName, Set<Subscriber>>;

    constructor() {
        this._events = new Map<EventName, Set<Subscriber>>();
    }

    on<T extends object>(eventName: EventName, callback: (event: T) => void) {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set<Subscriber>());
        }
        this._events.get(eventName)?.add(callback);
    }

    emit<T extends object>(eventName: string, data?: T) {
        this._events.forEach((subscribers, name) => {
            if (name === eventName) {
                subscribers.forEach(callback => callback(data));
            }
        });
    }

    trigger<T extends object>(eventName: string, context?: Partial<T>) {
        return (event: object = {}) => {
            this.emit(eventName, {
                ...(event || {}),
                ...(context || {})
            });
        };
    }
}


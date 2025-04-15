import { IOrder } from "../../types";
import { eventEmitter, Events } from '../base/events';
import { BasketModel } from "./BasketModel";

export class OrderModel implements IOrder {
	protected basketModel: BasketModel;
	payment: '' | 'Онлайн' | 'При получении';
	address: string;
	email: string;
	phone: string;
	total: number;
	items: string[];

	protected events: eventEmitter;
	constructor(events: eventEmitter, basketModel: BasketModel) {
		this.address = '';
		this.payment = '';
		this.email = '';
		this.phone = '';
		this.total = 0;
		this.items = [];
		this.events = events;
		this.basketModel = basketModel;
		events.on(Events.ORDER_SUCCESS, () => {
			this.clear();
		});
	}

	clear(): void {
		this.address = '';
		this.payment = '';
		this.email = '';
		this.phone = '';
		this.total = 0;
		this.items = [];
		this.events.emit(Events.ORDER_CHANGE, this);
	}
}
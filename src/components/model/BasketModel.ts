import { IBasket, IProduct } from '../../types';
import { Events, IEvents } from '../base/events';

export class BasketModel implements IBasket {
	constructor(protected events: IEvents) {}

	items: IProduct[] = [];

	add(product: IProduct): void {
		if (product && !this.items.some((p) => p.id === product.id)) {
			this.items.push(product);
			this.onChange();
		}

	}
	remove(product: IProduct): void {
		if (product) {
			this.items = this.items.filter((p) => p.id !== product.id);
			this.onChange();
		}
	}

	getTotal(): number {
		return this.items.reduce((acc, current) => {
			const price = parseInt(current.price);
			return acc + price;
		}, 0);
	}

	clear(): void {
		this.items = [];
		this.onChange();
	}

	protected onChange() {
		this.events.emit(Events.BASKET_CHANGE, { items: this.items });
	}
}
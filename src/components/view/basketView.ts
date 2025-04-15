import { IView } from '../../types';
import { eventEmitter, Events } from '../base/events';
import { BasketModel } from '../model/BasketModel';
import { BasketItemView } from './basketItemView';

export class BasketView implements IView<BasketModel> {
	protected container: HTMLElement;
	protected price: HTMLSpanElement;
	protected basketBuyButton: HTMLButtonElement;
	protected basketHeaderButton: HTMLButtonElement;
	protected basketCounter: HTMLSpanElement;
	protected cardBasketTemplate: HTMLTemplateElement;
	protected template: HTMLTemplateElement;

	constructor(
		protected events: eventEmitter,
	) {
		this.template = document.getElementById('basket') as HTMLTemplateElement;
		const basketElement = this.template.content.cloneNode(true) as DocumentFragment;
		this.cardBasketTemplate = document.getElementById(
			'card-basket'
		) as HTMLTemplateElement;
		this.container = basketElement.querySelector('.basket') as HTMLElement;
		this.basketBuyButton = this.container.querySelector(
			'.basket__button'
		) as HTMLButtonElement;
		this.price = this.container.querySelector(
			'.basket__price'
		) as HTMLSpanElement;
		this.basketCounter = document.querySelector(
			'.header__basket-counter'
		) as HTMLSpanElement;

		this.basketBuyButton.addEventListener('click', () => {
			this.events.emit(Events.BASKET_BUY);
		});

		this.basketHeaderButton = document.querySelector(
			'.header__basket'
		) as HTMLButtonElement;
		this.basketHeaderButton.addEventListener('click', () => {
			events.emit(Events.BASKET_OPEN);
		});
	}
	render(basketModel: BasketModel): HTMLElement {
		const items = basketModel.items.map((product, index) => {
			const itemView = new BasketItemView(this.cardBasketTemplate, this.events);
			return itemView.render({
				...product,
				index: index + 1,
			});
		})

		if (items) {
			const list = this.container.querySelector(
				'.basket__list'
			) as HTMLUListElement;
			if (list) {
				list.replaceChildren(...items);
			}
			this.price.textContent = `${basketModel
				.getTotal()
				.toString()} синапсов`;
			this.basketCounter.textContent =
				basketModel.items.length.toString();
			basketModel.items.length === 0
				? (this.basketBuyButton.disabled = true)
				: (this.basketBuyButton.disabled = false);
		}
		return this.container;
	}
}
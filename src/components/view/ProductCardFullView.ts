import { IProduct, IView } from '../../types';
import { eventEmitter, Events, IEvents } from '../base/events';
import { BasketModel } from '../model/BasketModel';
import { cardViewHelper } from './cardViewHelper';

export class ProductCardFullView implements IView<IProduct> {
	protected category: HTMLSpanElement;
	protected title: HTMLHeadingElement;
	protected image: HTMLImageElement;
	protected price: HTMLSpanElement;
	protected button: HTMLButtonElement;
	protected description: HTMLParagraphElement;

	protected item: IProduct;

	protected container: HTMLElement;

	constructor(
		protected events: IEvents
	) {
		const template = document.getElementById(
			'card-preview'
		) as HTMLTemplateElement;

		const previewElement = template.content.cloneNode(true) as DocumentFragment;
		this.container = previewElement.querySelector('.card_full');

		this.title = this.container.querySelector(
			'.card__title'
		) as HTMLHeadingElement;
		this.price = this.container.querySelector(
			'.card__price'
		) as HTMLSpanElement;
		this.category = this.container.querySelector(
			'.card__category'
		) as HTMLSpanElement;
		this.image = this.container.querySelector(
			'.card__image'
		) as HTMLImageElement;
		this.description = this.container.querySelector(
			'.card__text'
		) as HTMLParagraphElement;
		this.button = this.container.querySelector(
			'.card__button'
		) as HTMLButtonElement;

		this.button.addEventListener('click', () => {
			this.events.emit(Events.BASKET_ADD, { item: this.item });
			this.button.disabled = true;
		});
	}

	render(data: IProduct): HTMLElement {
		if (data) {
			this.item = data;
			this.title.textContent = data.title;
			this.price.textContent = data.price ? `${data.price} синапсов` : 'Бесценно';
			this.category.textContent = data.category;
			this.description.textContent = data.description;
			this.category.classList.add(cardViewHelper.categoryToClassName(data.category))
			this.image.src = cardViewHelper.imageNameToImageSrc(data.image);
			this.button.disabled = !data.price;
		}
		return this.container;
	}
}
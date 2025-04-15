import { IProduct, IView } from '../../types';
import { Events, IEvents } from '../base/events';
import { cardViewHelper } from './cardViewHelper';

export class ProductView implements IView<IProduct> {
	protected category: HTMLSpanElement;
	protected title: HTMLHeadingElement;
	protected image: HTMLImageElement;
	protected price: HTMLSpanElement;
	protected template: HTMLTemplateElement;

	protected item: IProduct;

	protected container: HTMLElement;

	constructor(
		protected events: IEvents,
	) {
		this.template = document.getElementById(
			'card-catalog'
		) as HTMLTemplateElement;
		const itemElement = this.template.content.cloneNode(true) as DocumentFragment;
		this.container = itemElement.querySelector('.gallery__item');

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

		this.container.addEventListener('click', () => {
			this.events.emit(Events.PRODUCT_SELECT, this.item);
		});
	}

	render(data: IProduct): HTMLElement {
		if (data) {
			this.item = data;
			this.title.textContent = data.title;
			this.price.textContent = data.price ? `${data.price} синапсов` : "Бесценно";
			this.category.textContent = data.category;
			this.category.classList.add(cardViewHelper.categoryToClassName(data.category))
			this.image.src = cardViewHelper.imageNameToImageSrc(data.image);
		}
		return this.container;
	}
}
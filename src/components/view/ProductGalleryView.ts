import { IProduct, IView } from '../../types';
import { Modal } from './modalView';
import { ProductCardFullView } from './ProductCardFullView';
import { Events, IEvents } from '../base/events';
import { ProductView } from './ProductView';

export class ProductGalleryView implements IView<IProduct[]> {
	protected previewTemplate: ProductCardFullView;

	constructor(protected container: HTMLElement, protected modal: Modal, protected events: IEvents) {
		this.previewTemplate = new ProductCardFullView(events);
		events.on(Events.PRODUCT_SELECT, (product: IProduct) => {
			this.openCardFullView(product);
		});
	}

	render(data: IProduct[]): HTMLElement {
		const items = data.map((product) => {
			const itemView = new ProductView(this.events);
			return itemView.render(product);
		});

		if (data) {
			this.container.replaceChildren(...items);
		}
		return this.container;
	}

	openCardFullView(product: IProduct) {
		this.modal.open(this.previewTemplate.render(product));
	}
}
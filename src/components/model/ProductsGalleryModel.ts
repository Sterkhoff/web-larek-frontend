import { ICatalog, IProduct } from '../../types';

export class ProductsGalleryModel implements ICatalog {
	items: IProduct[] = [];

	setItems(items: IProduct[]): void {
		this.items.push(...items);
	}

	getItems(): IProduct[] {
		return this.items;
	}
}
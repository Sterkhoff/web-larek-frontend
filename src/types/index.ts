export interface IProduct {
	id: string;
	category: ICategory;
	title: string;
	price: string;
	image: string;
	description: string;
}

export interface ICatalog {
	items: IProduct[];
}

type ICategory =  'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export interface IBasket {
	items: IProduct[];
	add(product: IProduct): void;
	remove(product: IProduct): void;
	getTotal(): number;
}

export interface IOrder {
	payment: '' | 'Онлайн' | 'При получении';
	address: string;
	email: string;
	phone: string;
	total: number;
	items: string[];
}

export interface IView<T> {
	render(data?: T): HTMLElement;
}
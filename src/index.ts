import { Api } from './components/base/api';
import { eventEmitter, Events } from './components/base/events';
import { BasketModel } from './components/model/BasketModel';
import { BasketView } from './components/view/basketView';
import { productsGalleryModel } from './components/model/productsGalleryModel';
import { ProductGalleryView } from './components/view/ProductGalleryView';
import { Modal } from './components/view/modalView';
import './scss/styles.scss';
import { IProduct, IOrder } from './types';
import { OrderModel } from './components/model/OrderModel';
import { OrderView } from './components/view/OrderView';
import { ContactsView } from './components/view/ContactsView';
import { OrderSuccessView } from './components/view/OrderSuccessView';
import { BasketController } from './components/controller/BasketController';
import { OrderController } from './components/controller/OrderController';


const events = new eventEmitter();
const modal = new Modal(events);

const basketModel = new BasketModel(events);
const basketView = new BasketView(events);
new BasketController(basketView, basketModel, events, modal);

const productGalleryView = new ProductGalleryView(document.querySelector('.gallery'), modal, events);
const catalogModel = new productsGalleryModel();

const ordModel = new OrderModel(events, basketModel);
const orderView = new OrderView(events, modal);
const contactsView = new ContactsView(events, modal)
new OrderController(orderView, basketModel, contactsView, ordModel, events, modal);
new OrderSuccessView(events, modal);

export const api = new Api('https://larek-api.nomoreparties.co/api/weblarek');

api
	.get('/product/')
	.then((response: { items: any[] }) => {
		const items = response.items;
		catalogModel.setItems(items as IProduct[]);
		renderCatalog(catalogModel.getItems());
	})
	.catch((err) => console.log(err));

function renderCatalog(products: IProduct[]) {
	productGalleryView.render(products);
}

events.on(Events.ORDER_SUBMIT, (event: IOrder) => {
	api
		.post('/order', event)
		.then((response: { data: any }) => {
			events.emit(Events.ORDER_SUCCESS, { response });
		})
		.catch((err) => console.log(err));
});
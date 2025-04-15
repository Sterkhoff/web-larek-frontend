import { Events, IEvents } from '../base/events';
import { Modal } from '../view/modalView';
import { OrderView } from '../view/OrderView';
import { OrderModel } from '../model/OrderModel';
import { ContactsView } from '../view/ContactsView';
import { BasketModel } from '../model/BasketModel';

export class OrderController {
	constructor(protected orderView: OrderView, protected basketModel: BasketModel, protected contactsView: ContactsView, protected orderModel: OrderModel, protected events: IEvents, protected modal: Modal) {
		events.on(Events.BASKET_BUY, () => {
			this.modal.open(this.orderView.render(this.orderModel))
		})

		events.on(Events.ORDER_CHANGE, (orderModel: OrderModel) => {
			this.orderModel = orderModel;
			this.orderView.render(orderModel);
		});

		events.on(Events.ORDER_OPEN_CONTACTS, () => {
			this.modal.open(this.contactsView.render(this.orderModel))
		})

		events.on(Events.ORDER_CONTACTS_CHANGE, (orderModel: OrderModel) => {
			this.orderModel = orderModel;
			this.contactsView.render(orderModel);
		});

		events.on(Events.ORDER_BEFORE_SUBMIT, () => {
			this.orderModel.total = this.basketModel.getTotal();
			this.orderModel.items = this.basketModel.items.map((item) => item.id);
			if (
				this.orderModel.payment &&
				this.orderModel.address &&
				this.orderModel.email &&
				this.orderModel.phone
			) {
				this.events.emit(Events.ORDER_SUBMIT, this.orderModel);
			} else {
				console.log('Не все поля заполнены');
			}
		});
	}
}
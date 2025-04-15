import { IView } from "../../types";
import { Events, IEvents } from '../base/events';
import { OrderModel } from "../model/OrderModel";
import { Modal } from './modalView';

export class OrderView implements IView<OrderModel> {

	protected container: HTMLElement;
	protected buttonOnline: HTMLButtonElement;
	protected buttonHome: HTMLButtonElement;
	protected buttonContinue: HTMLButtonElement;
	protected inputAddress: HTMLInputElement;
	protected template: HTMLTemplateElement;
	protected lastRenderedModel: OrderModel;

	constructor(
		protected events: IEvents,
		protected modal: Modal
	) {
		this.template = document.getElementById('order') as HTMLTemplateElement;
		const orderElement = this.template.content.cloneNode(true) as DocumentFragment;
		this.container = orderElement.querySelector('form') as HTMLFormElement;


		this.buttonOnline = this.container.querySelector('button[name="card"]') as HTMLButtonElement;
		this.buttonHome = this.container.querySelector('button[name="cash"]') as HTMLButtonElement;
		this.buttonContinue = this.container.querySelector('.order__button') as HTMLButtonElement;
		this.inputAddress = this.container.querySelector('.form__input') as HTMLInputElement;

		this.buttonOnline.addEventListener('click', () => {
			this.buttonOnline.classList.add('button_alt-active')
			this.buttonHome.classList.remove('button_alt-active')
			this.events.emit(Events.ORDER_CHANGE, {...this.lastRenderedModel, payment: 'Онлайн' });
		})

		this.buttonHome.addEventListener('click', () => {
			this.buttonHome.classList.add('button_alt-active')
			this.buttonOnline.classList.remove('button_alt-active')
			this.events.emit(Events.ORDER_CHANGE, {...this.lastRenderedModel, payment: 'При получении' });
		})

		this.inputAddress.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			this.events.emit(Events.ORDER_CHANGE, {...this.lastRenderedModel, address: target.value });
		})

		this.buttonContinue.addEventListener('click', () => {
			events.emit(Events.ORDER_OPEN_CONTACTS)
		})
	}

	render(data: OrderModel): HTMLElement {
		const isAddressFilled = data.address.trim().length > 0;
		const isPaymentSelected = data.payment !== '';
		this.buttonContinue.disabled = !(isAddressFilled && isPaymentSelected);
		this.lastRenderedModel = data;
		return this.container;
	}
}
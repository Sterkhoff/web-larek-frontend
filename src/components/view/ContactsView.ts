import { IView } from '../../types';
import { eventEmitter, Events } from '../base/events';
import { OrderModel } from '../model/OrderModel';
import { Modal } from './modalView';

export class ContactsView implements IView<OrderModel> {
	protected container: HTMLElement;
	protected inputEmail: HTMLInputElement;
	protected inputPhone: HTMLInputElement;
	protected buttonContinue: HTMLButtonElement;
	protected template: HTMLTemplateElement;
	protected lastRenderedModel: OrderModel;

	constructor(
		protected events: eventEmitter,
		protected modal: Modal
	) {
		this.template = document.getElementById('contacts') as HTMLTemplateElement
		const contactsElement = this.template.content.cloneNode(true) as DocumentFragment;
		this.container = contactsElement.querySelector('.form') as HTMLFormElement;
		this.inputEmail = this.container.querySelector('.form__input[name="email"]') as HTMLInputElement;
		this.inputPhone = this.container.querySelector('.form__input[name="phone"]') as HTMLInputElement;
		this.buttonContinue = this.container.querySelector('button') as HTMLButtonElement;

		this.inputEmail.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			this.events.emit(Events.ORDER_CONTACTS_CHANGE, {...this.lastRenderedModel, email: target.value });
		})

		this.inputPhone.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			this.events.emit(Events.ORDER_CONTACTS_CHANGE, {...this.lastRenderedModel, phone: target.value });
		})

		this.buttonContinue.addEventListener('click', (e: Event) => {
			e.preventDefault();
			this.events.emit(Events.ORDER_BEFORE_SUBMIT);
		})
	}

	render(data: OrderModel): HTMLElement {
		const isEmailFilled = data.email.trim().length > 0;
		const isPhoneFilled = data.phone.trim().length > 0;
		this.buttonContinue.disabled = !(isEmailFilled && isPhoneFilled);
		this.lastRenderedModel = data;
		return this.container;
	}
}
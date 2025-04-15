import { IView } from '../../types';
import { eventEmitter, Events } from '../base/events';
import { Modal } from './modalView';

export class OrderSuccessView implements IView<{ response: any }> {
	protected container: HTMLElement;
	protected price: HTMLSpanElement;
	protected buttonClose: HTMLButtonElement;
	protected template: HTMLTemplateElement;

	constructor(
		protected events: eventEmitter,
		protected modal: Modal
	) {
		this.template = document.getElementById('success') as HTMLTemplateElement;
		const successElement = this.template.content.cloneNode(true) as DocumentFragment;
		this.container = successElement.querySelector('.order-success') as HTMLDivElement;
		this.price = this.container.querySelector('.order-success__description') as HTMLSpanElement;
		this.buttonClose = this.container.querySelector('.order-success__close') as HTMLButtonElement;


		this.buttonClose.addEventListener('click', () => {
			events.emit(Events.ORDER_CLOSE)
		})

		events.on(Events.ORDER_SUCCESS, (response: any) => {
			modal.open(this.render(response))
		})
	}

	render(data: { response: any }): HTMLElement {
		this.price.textContent = `Списано ${data.response.total} синапсов`
		return this.container;
	}
}
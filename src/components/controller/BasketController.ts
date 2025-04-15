import { BasketView } from '../view/basketView';
import { BasketModel } from '../model/BasketModel';
import { Events, IEvents } from '../base/events';
import { Modal } from '../view/modalView';
import { IProduct } from '../../types';

export class BasketController {
	constructor(protected basketView: BasketView, protected basketModel: BasketModel, protected events: IEvents, protected modal: Modal) {
		events.on(Events.BASKET_OPEN, () => {
			modal.open(basketView.render(basketModel));
		})

		events.on(Events.BASKET_CHANGE, () => {
			basketView.render(basketModel);
		})

		events.on(Events.BASKET_ADD, (event: { item: IProduct }) => {
			basketModel.add(event.item);
		});

		events.on(Events.BASKET_REMOVE, (event: { item: IProduct }) => {
			basketModel.remove(event.item);
		});

		events.on(Events.ORDER_SUCCESS, () => {
			basketModel.clear();
		})
	}
}
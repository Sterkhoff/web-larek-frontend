import dotsImage from '../../images/5_Dots.png';
import shellImage from '../../images/Shell.png';
import asteriskImage from '../../images/Asterisk 2.png';
import softFlowerImage from '../../images/Soft Flower.png';
import vectorImage from '../../images/Vector 1.png';
import frameImage from '../../images/Frame 306.png';
import polygonImage from '../../images/Polygon.png';
import butterflyImage from '../../images/Butterfly.png';
import leafImage from '../../images/Leaf.png';
import mithosisImage from '../../images/Mithosis.png';

export class cardViewHelper {
	static categoryToClassName(category: string) {
		switch (category) {
			case 'софт-скил':
				return 'card__category_soft';

			case 'другое':
				return 'card__category_other';

			case 'дополнительное':
				return 'card__category_additional';

			case 'хард-скил':
				return 'card__category_hard';

			default:
				return 'card__category_soft';
		}
	}

	static imageNameToImageSrc(category: string) {
		switch (category) {
			case '/5_Dots.svg':
				return dotsImage;

			case '/Shell.svg':
				return shellImage;

			case '/Asterisk_2.svg':
				return asteriskImage;

			case '/Soft_Flower.svg':
				return softFlowerImage;

			case '/mute-cat.svg':
				return vectorImage;

			case '/Pill.svg':
				return frameImage;

			case '/Polygon.svg':
				return polygonImage;

			case '/Butterfly.svg':
				return butterflyImage;

			case '/Leaf.svg':
				return leafImage;

			case '/Mithosis.svg':
				return mithosisImage;

			default:
				return 'card__category_soft';
		}
	}
}
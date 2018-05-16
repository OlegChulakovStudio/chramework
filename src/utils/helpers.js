/*eslint no-undef: 0*/
/*eslint new-cap: 0*/

export const pluralize = (n, forms) => {
	return forms[
		n % 10 === 1 && n % 100 !== 11
			? 0
			: n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
	];
};

const buttons = [];
const initLike = (vkButtonId, url, title, image, pageId) => {
	const buttonElement = document.getElementById(vkButtonId) || vkButtonId;

	if (buttonElement) {
		VK.Widgets.Like(vkButtonId, {
			type: 'button',
			height: 20,
			pageUrl: url,
			pageTitle: title,
			pageImage: image,
		});
	}
};
const initShare = (vkButton, url, title, image, pageId) => {
	console.log({vkButton, url});

	const buttonElement = vkButton;
	if (buttonElement) {
		buttonElement.innerHTML = VK.Share.button(url, { type: 'link' });
	}
};
export const initVkButton = (vkButton, url, title, image, pageId, share = false) => {
	console.log({vkButton});

	if (typeof VK === 'undefined' && !window.isVkFetching) {
		window.isVkFetching = true;
		buttons.push({ vkButton, url, title, image, pageId });
		window.vkAsyncInit = () => {

			window.isVkFetching = false;
			VK.init({ apiId: 6370931, onlyWidgets: true });
			buttons.forEach(({ vkButton, url, title, image, pageId }) => {
				if (share) {
					initShare(vkButton, url, title, image, pageId);
				} else {
					initLike(vkButton, url, title, image, pageId);
				}
			});
		};

		setTimeout(() => {
			let vkApiTransport = document.getElementById('vk_api_transport');
			if (vkApiTransport === null) {
				vkApiTransport = document.createElement('div');
				document.body.appendChild(vkApiTransport);
			}
			const el = document.createElement('script');
			el.type = 'text/javascript';
			el.src = 'https://vk.com/js/api/openapi.js?152';
			el.async = true;
			vkApiTransport.appendChild(el);
			const share = document.createElement('script');
			share.type = 'text/javascript';
			share.src = 'https://vk.com/js/api/share.js?95';
			share.async = true;
			vkApiTransport.appendChild(share);
		}, 0);
	} else if (typeof VK === 'undefined' && window.isVkFetching) {
		buttons.push({ vkButton, url, title, image, pageId });
		window.vkAsyncInit = () => {
			window.isVkFetching = false;

			VK.init({ apiId: 6370931, onlyWidgets: true });
			buttons.forEach(({ vkButton, url, title, image, pageId }) => {
				if (share) {
					initShare(vkButton, url, title, image, pageId);
				} else {
					initLike(vkButton, url, title, image, pageId);
				}
			});
		};
	} else {
		VK.init({ apiId: 6370931, onlyWidgets: true });
		if (share) {
			initShare(vkButton, url, title, image, pageId);
		} else {
			initLike(vkButton, url, title, image, pageId);
		}
	}
	return true;
};

export const checkSpeed = (callback) => {
	const image = new Image();
	const imageFile = `https://chulakov.ru/test.jpg?${Date.now()}`;
	const imageSize = 521;
	const timeStart = Date.now();

	image.onload = () => {
		const timeEnd = Date.now();
		const timeLoad = timeEnd - timeStart;
		const speed = imageSize / (timeLoad / 1000);
		callback(speed);
	};
	image.src = imageFile;
};

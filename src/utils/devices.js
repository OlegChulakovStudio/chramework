export const isPhone = () => {
	return typeof window !== 'undefined' ? window.innerWidth <= 667 : false;
};
export const isPad = () => {
	return typeof window !== 'undefined' ? (window.innerWidth > 667 && window.innerWidth <= 1024) : false;
};
export const isMobile = () => {
	return typeof window !== 'undefined' ? window.innerWidth <= 1024 : false;
};
export const isAndroid = () => /(android)/i.test(navigator.userAgent);
export const isIos = () => /(iPad|iPhone|iPod touch)/i.test(navigator.userAgent);
export const isIphone = () => /(iPhone|iPod touch)/i.test(navigator.userAgent);
export const isIpad = () => /iPad/i.test(navigator.userAgent);
// export const isMac = () => (/Mac/i).test(navigator.platform);

export const isFirefox = () => (/firefox/i).test(navigator.userAgent);

export const iosVersion = () => {
	if (isIos() && typeof window !== 'undefined') {
		const v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
		if (v !== null) {
			return parseInt(v[1], 10);
		}
		return null;
	}
	return null;
};
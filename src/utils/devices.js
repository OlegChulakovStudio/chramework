export const isPhone = () => {
	return typeof window !== 'undefined' ? window.innerWidth <= 667 : false;
};
export const isPad = () => {
	return typeof window !== 'undefined' ? (window.innerWidth > 667 && window.innerWidth <= 1024) : false;
};
export const isMobile = () => {
	return typeof window !== 'undefined' ? window.innerWidth <= 1024 : false;
};
export const isAndroid = () => {
	console.log('- - - - - - - - - - -');
	console.log('chramework', navigator.userAgent);
	console.log('- - - - - - - - - - -');
	return /(android)/i.test(navigator.userAgent);
}
export const isIos = () => {
	const navigator = typeof window !== 'undefined' ? window.navigator : global.navigator;
	console.log('- - - - - - - - - - -');
	console.log('isIos chramework', navigator.userAgent);
	console.log('- - - - - - - - - - -');
	return /(iPad|iPhone|iPod touch)/i.test(navigator.userAgent);
}
export const isIphone = () => {
	const navigator = typeof window !== 'undefined' ? window.navigator : global.navigator;
	console.log('- - - - - - - - - - -');
	console.log('isIphone chramework', navigator.userAgent);
	console.log('- - - - - - - - - - -');
	return /(iPhone|iPod touch)/i.test(navigator.userAgent);
}
export const isIpad = () => {
	const navigator = typeof window !== 'undefined' ? window.navigator : global.navigator;
	console.log('- - - - - - - - - - -');
	console.log('isIpad chramework', navigator.userAgent);
	console.log('- - - - - - - - - - -');
	return /iPad/i.test(navigator.userAgent);
}
// export const isMac = () => (/Mac/i).test(navigator.platform);

export const isFirefox = () => (/firefox/i).test(navigator.userAgent);

export const iosVersion = () => {
	const navigator = typeof window !== 'undefined' ? window.navigator : global.navigator;
	console.log('- - - - - - - - - - -');
	console.log('iosVersion chramework', navigator.userAgent);
	console.log('- - - - - - - - - - -');
	if (isIos() && typeof window !== 'undefined') {
		const v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
		if (v !== null) {
			return parseInt(v[1], 10);
		}
		return null;
	}
	return null;
};

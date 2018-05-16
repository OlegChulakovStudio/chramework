import { actions as modalActions } from './modal.js';

export const types = {
	MENU_OPEN: 'MENU_OPEN',
	MENU_CLOSE: 'MENU_CLOSE',
	SET_MOD: 'SET_MOD',
	SET_SCROLL_SIZE: 'SET_SCROLL_SIZE',
	SET_SCROLL_PANEL_ON_PAGE: 'SET_SCROLL_PANEL_ON_PAGE',
	SET_SPEED: 'SET_SPEED',
};

const initialState = {
	menuIsOpened: false,
	mod: '',
	scrollSize: 0,
	scrollPanelOnPage: false,
	speed: '',
};

export default function ui(state = initialState, action) {
	switch (action.type) {
		case types.MENU_OPEN:
			return {
				...state,
				menuIsOpened: true,
			};

		case types.MENU_CLOSE:
			return {
				...state,
				menuIsOpened: false,
			};

		case types.SET_MOD:
			return {
				...state,
				mod: action.mod,
			};

		case types.SET_SCROLL_SIZE:
			return {
				...state,
				scrollSize: action.scrollSize,
			};

		case types.SET_SCROLL_PANEL_ON_PAGE:
			return {
				...state,
				scrollPanelOnPage: action.scrollPanelOnPage,
			};

		case types.SET_SPEED: {
			let speed = 'mob';
			switch (true) {
				case action.speed > 400 && action.speed <= 1000:
					speed = 'low';
					break;
				case action.speed > 1000:
					speed = 'hight';
					break;
				default:
					return '';
			}
			return {
				...state,
				speed,
			};

		}

		default:
			return state;
	}
}

export const actions = {
	menuOpen: () => dispatch => {
		dispatch({ type: types.MENU_OPEN });
		dispatch(
			modalActions.openModalMenu({
				modalType: 'Menu',
				modalProps: {
					closeButton: false,
					onClose: () => dispatch(actions.menuClose()),
					type: 'menu',
					animLayout: true,
				},
			}),
		);
	},
	menuClose: () => dispatch => {
		dispatch({ type: types.MENU_CLOSE });
		dispatch(modalActions.closeModalMenu());
	},
	setMod: mod => ({ type: types.SET_MOD, mod }),
	setScrollSize: scrollSize => ({ type: types.SET_SCROLL_SIZE, scrollSize }),
	setScrollPanelOnPage: scrollPanelOnPage => ({
		type: types.SET_SCROLL_PANEL_ON_PAGE,
		scrollPanelOnPage,
	}),
	setSpeed: speed => ({ type: types.SET_SPEED, speed }),
};

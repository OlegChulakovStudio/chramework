import { lockScroll, unlockScroll } from '../../utils/scrollLock';

export const types = {
	SHOW_MODAL: 'SHOW_MODAL',
	HIDE_MODAL: 'HIDE_MODAL',
	SHOW_MODAL_MENU: 'SHOW_MODAL_MENU',
	HIDE_MODAL_MENU: 'HIDE_MODAL_MENU',
	FINAL_HIDE_MODAL: 'FINAL_HIDE_MODAL',
};

const initialState = {
	modalType: null,
	modalProps: {},
	modalMenuType: null,
	modalMenuProps: {},
	modalIsOpened: false,
	modalIsHiding: true,
	modalMenuIsHiding: true,
};

export default function modal(state = initialState, action) {
	switch (action.type) {
		case types.SHOW_MODAL:
			return {
				...state,
				modalType: action.modalType,
				modalProps: action.modalProps,
				modalIsOpened: true,
				modalIsHiding: false,
			};

		case types.HIDE_MODAL:
			return {
				...state,
				modalIsHiding: true,
			};

		case types.FINAL_HIDE_MODAL:
			return {
				...state,
				// modalType: null,
				// modalProps: {},
				modalIsOpened: false,
			};
		case types.SHOW_MODAL_MENU:
			return {
				...state,
				modalMenuType: action.modalType,
				modalMenuProps: action.modalProps,
				modalIsOpened: true,
				modalMenuIsHiding: false,
			};

		case types.HIDE_MODAL_MENU:
			return {
				...state,
				modalMenuIsHiding: true,
			};

		default:
			return state;
	}
}

export const actions = {
	openModal: modalParams => {
		lockScroll();
		return {
			type: types.SHOW_MODAL,
			...modalParams,
		};
	},
	closeModal: () => {
		return {
			type: types.HIDE_MODAL,
		};
	},
	finalCloseModal: () => {
		unlockScroll();
		return {
			type: types.FINAL_HIDE_MODAL,
		};
	},
	openModalMenu: modalParams => {
		lockScroll();
		return {
			type: types.SHOW_MODAL_MENU,
			...modalParams,
		};
	},
	closeModalMenu: () => {
		unlockScroll();
		return {
			type: types.HIDE_MODAL_MENU,
		};
	},
};

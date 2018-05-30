import { combineReducers } from 'redux';
import ui from '../components/modules/ui.js';
import modal from '../components/modules/modal.js';

const rootReducer = combineReducers({
	modal,
	ui,
});

export default rootReducer;

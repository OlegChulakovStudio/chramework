import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ui from '../components/modules/ui.js';
import modal from '../components/modules/modal.js';

const rootReducer = combineReducers({
	form: formReducer,
	modal,
	ui
});

export default rootReducer;

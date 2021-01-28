import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import store from './AppReducer';

export const reduxStore = createStore(store, compose(applyMiddleware(ReduxThunk)));

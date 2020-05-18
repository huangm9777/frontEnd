import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
//import { ReactReduxContext } from 'redux';
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
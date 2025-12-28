import { createStore } from 'redux';
import { applyMiddleware } from 'redux';

import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger';

import contactsReducer from './reducers/contactsReducer';

const middleware = applyMiddleware(logger);

export default createStore(contactsReducer, composeWithDevTools(middleware));

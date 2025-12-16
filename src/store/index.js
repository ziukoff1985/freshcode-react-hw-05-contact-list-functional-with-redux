import { createStore } from 'redux';
import { applyMiddleware } from 'redux'; // метод для додавання middleware

import { composeWithDevTools } from '@redux-devtools/extension'; // для роботи Redux DevTools
import logger from 'redux-logger'; // для middleware - logger

import contactsReducer from './reducers/contactsReducer';

const middleware = applyMiddleware(logger); // додавання middleware logger

export default createStore(contactsReducer, composeWithDevTools(middleware));

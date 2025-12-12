import { createStore } from 'redux';
import contactsReducer from './reducers/contactsReducer';

export default createStore(contactsReducer);

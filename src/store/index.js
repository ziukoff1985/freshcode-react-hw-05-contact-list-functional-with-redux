// import { createStore } from 'redux';
// import { applyMiddleware } from 'redux';

// import { composeWithDevTools } from '@redux-devtools/extension';

// import contactsReducer from './reducers/contactsReducer';

// const middleware = applyMiddleware(logger);

// export default createStore(contactsReducer, composeWithDevTools(middleware));

import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import contactsReducer from './slices/contactsSlice';

export default configureStore({
    reducer: {
        contactsList: contactsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

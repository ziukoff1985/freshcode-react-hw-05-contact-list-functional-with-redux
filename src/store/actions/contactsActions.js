import ACTION_TYPES from './actionTypes';

const {
    GET_CONTACTS,
    CREATE_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    SET_CONTACT_FOR_EDIT,
} = ACTION_TYPES;

export const getContacts = (contacts) => {
    return {
        type: GET_CONTACTS,
        payload: contacts,
    };
};

export const createContact = (contact) => {
    return {
        type: CREATE_CONTACT,
        payload: contact,
    };
};

export const updateContact = (contact) => {
    return {
        type: UPDATE_CONTACT,
        payload: contact,
    };
};

export const deleteContact = (contactId) => {
    return {
        type: DELETE_CONTACT,
        payload: contactId,
    };
};

export const setContactForEdit = (contact) => {
    return {
        type: SET_CONTACT_FOR_EDIT,
        payload: contact,
    };
};

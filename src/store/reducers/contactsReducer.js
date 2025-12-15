import { contactsState } from '../../model/initialStates';
import { EMPTY_CONTACT } from '../../constants/constants';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
    contacts: contactsState,
    contactForEdit: EMPTY_CONTACT,
};

const {
    GET_CONTACTS,
    CREATE_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    SET_CONTACT_FOR_EDIT,
} = ACTION_TYPES;

export default function contactsReducer(
    state = initialState,
    { type, payload }
) {
    switch (type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: payload,
            };
        case CREATE_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, payload],
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map((contact) =>
                    contact.id === payload.id ? payload : contact
                ),
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(
                    (contact) => contact.id !== payload
                ),
                contactForEdit:
                    state.contactForEdit.id === payload
                        ? initialState.contactForEdit
                        : state.contactForEdit,
            };
        case SET_CONTACT_FOR_EDIT:
            return {
                ...state,
                contactForEdit: payload,
            };
        default:
            return state;
    }
}

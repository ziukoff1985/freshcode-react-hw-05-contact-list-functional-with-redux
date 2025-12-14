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

export default function contactsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
            };
        case CREATE_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map((contact) =>
                    contact.id === action.payload.id ? action.payload : contact
                ),
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(
                    (contact) => contact.id !== action.payload
                ),
                contactForEdit:
                    state.contactForEdit.id === action.payload
                        ? initialState.contactForEdit
                        : state.contactForEdit,
            };
        case SET_CONTACT_FOR_EDIT:
            return {
                ...state,
                contactForEdit: action.payload,
            };
        default:
            return state;
    }
}

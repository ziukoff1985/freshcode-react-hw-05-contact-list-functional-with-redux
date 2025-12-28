import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { contactsState } from '../../model/initialStates';
import { EMPTY_CONTACT, CONTACTS_SLICE_NAME } from '../../constants/constants';
import api from '../../api/contactsService';

const initialState = {
    contacts: contactsState,
    contactForEdit: EMPTY_CONTACT,
    isPending: false,
    error: null,
};

export const getContacts = createAsyncThunk(
    `${CONTACTS_SLICE_NAME}/getContacts`,
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/');
            if (response.status >= 400) {
                throw new Error(`Error status: ${response.status}`);
            }
            const { data } = response;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createContact = createAsyncThunk(
    `${CONTACTS_SLICE_NAME}/createContact`,
    async (contactData, { rejectWithValue }) => {
        try {
            const response = await api.post('/', contactData);
            if (response.status >= 400) {
                throw new Error(
                    `Can't create contact. Error status: ${response.status}`
                );
            }
            const { data } = response;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    `${CONTACTS_SLICE_NAME}/deleteContact`,
    async (contactId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/${contactId}`);
            if (response.status >= 400) {
                throw new Error(
                    `Can't delete contact. Error status: ${response.status}`
                );
            }
            return contactId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateContact = createAsyncThunk(
    `${CONTACTS_SLICE_NAME}/updateContact`,
    async (contactData, { rejectWithValue }) => {
        try {
            const response = await api.put(`/${contactData.id}`, contactData);
            if (response.status >= 400) {
                throw new Error(
                    `Can't update contact. Error status: ${response.status}`
                );
            }
            const { data } = response;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const setIsPending = (state) => {
    state.isPending = true;
    state.error = null;
};

const setError = (state, { payload }) => {
    state.isPending = false;
    state.error = payload;
};

const contactsSlice = createSlice({
    name: CONTACTS_SLICE_NAME,
    initialState,
    reducers: {
        setContactForEdit: (state, { payload }) => {
            state.contactForEdit = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getContacts.fulfilled, (state, { payload }) => {
            state.contacts = payload;
            state.isPending = false;
            state.error = null;
        });
        builder.addCase(createContact.fulfilled, (state, { payload }) => {
            state.contacts.push(payload);
            state.contactForEdit = { ...EMPTY_CONTACT };
            state.isPending = false;
            state.error = null;
        });
        builder.addCase(deleteContact.fulfilled, (state, { payload }) => {
            state.contacts = state.contacts.filter(
                (contact) => contact.id !== payload
            );
            state.contactForEdit =
                state.contactForEdit.id === payload
                    ? EMPTY_CONTACT
                    : state.contactForEdit;
            state.isPending = false;
            state.error = null;
        });
        builder.addCase(updateContact.fulfilled, (state, { payload }) => {
            state.contacts = state.contacts.map((contact) =>
                contact.id === payload.id ? payload : contact
            );
            state.contactForEdit = payload;
            state.isPending = false;
            state.error = null;
        });

        builder.addCase(getContacts.pending, setIsPending);
        builder.addCase(createContact.pending, setIsPending);
        builder.addCase(deleteContact.pending, setIsPending);
        builder.addCase(updateContact.pending, setIsPending);

        builder.addCase(getContacts.rejected, setError);
        builder.addCase(createContact.rejected, setError);
        builder.addCase(deleteContact.rejected, setError);
        builder.addCase(updateContact.rejected, setError);
    },
});

export const { setContactForEdit } = contactsSlice.actions;

export default contactsSlice.reducer;

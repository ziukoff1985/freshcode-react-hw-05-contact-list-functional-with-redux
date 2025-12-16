import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import api from '../../api/contactsService';
import { EMPTY_CONTACT } from '../../constants/constants';
import {
    getContacts,
    setContactForEdit,
} from '../../store/actions/contactsActions';
import ContactItem from '../ContactItem/ContactItem';

import styles from './ContactList.module.css';

function ContactList() {
    const dispatch = useDispatch();

    const contacts = useSelector((state) => state.contacts);

    function onAddNewContact() {
        dispatch(setContactForEdit(EMPTY_CONTACT));
    }

    useEffect(() => {
        async function fetchContacts() {
            try {
                const { data } = await api.get('/');
                dispatch(getContacts(data ?? []));
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchContacts();
    }, [dispatch]);

    return (
        <div className={styles.contactListWrapper}>
            <ul className={styles.contactList}>
                {contacts.length === 0
                    ? 'No contacts yet'
                    : contacts.map((contact) => (
                          <ContactItem key={contact.id} contact={contact} />
                      ))}
            </ul>
            <button
                className={styles.addButton}
                type='button'
                onClick={onAddNewContact}
            >
                New
            </button>
        </div>
    );
}

export default ContactList;

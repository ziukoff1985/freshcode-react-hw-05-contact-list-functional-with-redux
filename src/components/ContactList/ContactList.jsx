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
    //     {
    //     contactForEdit,
    //     contacts,
    //     onAddNewContact,
    //     onDeleteContact,
    //     onEditContact,
    // }

    const dispatch = useDispatch();

    const contacts = useSelector((state) => state.contacts);
    console.log(contacts);
    // const contactForEdit = useSelector((state) => state.contactForEdit);

    function onAddNewContact() {
        dispatch(setContactForEdit(EMPTY_CONTACT));
    }

    useEffect(() => {
        api.get('/')
            .then(({ data }) => {
                if (!data) {
                    dispatch(getContacts([]));
                } else {
                    dispatch(getContacts([...data]));
                }
            })
            .catch((err) => console.log(err.message));
    }, [dispatch]);

    return (
        <div className={styles.contactListWrapper}>
            <ul className={styles.contactList}>
                {contacts.length === 0
                    ? 'No contacts yet'
                    : contacts.map((contact) => (
                          <ContactItem
                              key={contact.id}
                              contact={contact}
                              //   onDeleteContact={onDeleteContact}
                              //   onEditContact={onEditContact}
                              //   contactForEdit={contactForEdit}
                          />
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

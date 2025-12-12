import { useDispatch, useSelector } from 'react-redux';

import api from '../../api/contactsService';
import {
    deleteContact,
    updateContact,
} from '../../store/actions/contactsActions';

import styles from './ContactItem.module.css';

function ContactItem({
    contact,
    // contactForEdit,
    // onDeleteContact,
    // onEditContact,
}) {
    const dispatch = useDispatch();

    const contactForEdit = useSelector((state) => state.contactForEdit);

    function onContactDelete() {
        // onDeleteContact(contact.id);
        api.delete(`/${contact.id}`)
            .then(() => {
                dispatch(deleteContact(contact.id));
            })
            .catch((err) => console.log(err.message));
    }

    function onContactEdit() {
        // onEditContact(contact);
        dispatch(updateContact(contact));
    }

    return (
        <li
            className={`${styles.contactItem} ${
                contactForEdit?.id === contact.id && styles.updating
            }`}
            onDoubleClick={onContactEdit}
        >
            <div className={styles.contactName}>
                {contact.firstName} {contact.lastName}
            </div>
            <button
                className={styles.deleteButton}
                type='button'
                onClick={onContactDelete}
            >
                ❌
            </button>
        </li>
    );
}

export default ContactItem;

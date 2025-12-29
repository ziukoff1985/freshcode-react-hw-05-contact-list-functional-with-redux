import { useDispatch, useSelector } from 'react-redux';

import {
    deleteContact,
    setContactForEdit,
} from '../../store/slices/contactsSlice';

import styles from './ContactItem.module.css';

function ContactItem({ contact }) {
    const dispatch = useDispatch();

    const contactForEdit = useSelector(
        (state) => state.contactsList.contactForEdit
    );

    function onContactDelete() {
        dispatch(deleteContact(contact.id));
    }

    function onContactEdit() {
        dispatch(setContactForEdit(contact));
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

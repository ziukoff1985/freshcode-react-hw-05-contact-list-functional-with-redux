import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '../../api/contactsService';
import {
    createContact,
    updateContact,
    deleteContact,
    setContactForEdit,
} from '../../store/actions/contactsActions';
import { EMPTY_CONTACT } from '../../constants/constants';

import styles from './ContactForm.module.css';

function ContactForm() {
    const dispatch = useDispatch();

    const contactForEdit = useSelector((state) => state.contactForEdit);

    const [contactData, setContactData] = useState(contactForEdit);

    useEffect(() => {
        setContactData(contactForEdit);
    }, [contactForEdit]);

    async function onAddNewContact() {
        try {
            const { data } = await api.post('/', contactData);
            dispatch(createContact(data));
            setContactData(EMPTY_CONTACT);
        } catch (error) {
            console.log(error.message);
        }
    }

    async function onEditOldContact() {
        try {
            const { data } = await api.put(`/${contactData.id}`, contactData);
            dispatch(updateContact(data));
            dispatch(setContactForEdit(data));
            setContactData(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    function onSubmitForm(event) {
        event.preventDefault();
        if (!contactData.id) {
            onAddNewContact();
        } else {
            onEditOldContact();
        }
    }

    async function onContactDelete() {
        try {
            await api.delete(`/${contactData.id}`);
            dispatch(deleteContact(contactData.id));
        } catch (error) {
            console.log(error.message);
        }
    }

    function onInputChange(event) {
        const { name, value } = event.target;
        setContactData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function onClearField(event) {
        const input = event.target.parentNode.firstChild;
        setContactData((prevState) => ({
            ...prevState,
            [input.name]: '',
        }));
    }

    return (
        <form onSubmit={onSubmitForm} className={styles.contactForm}>
            <div className={styles.inputWrapper}>
                <input
                    value={contactData.firstName}
                    className={styles.input}
                    name='firstName'
                    type='text'
                    placeholder='First name'
                    onChange={onInputChange}
                />
                <button
                    className={styles.deleteButton}
                    type='button'
                    onClick={onClearField}
                >
                    ❌
                </button>
            </div>
            <div className={styles.inputWrapper}>
                <input
                    value={contactData.lastName}
                    className={styles.input}
                    name='lastName'
                    type='text'
                    placeholder='Last name'
                    onChange={onInputChange}
                />
                <button
                    className={styles.deleteButton}
                    type='button'
                    onClick={onClearField}
                >
                    ❌
                </button>
            </div>
            <div className={styles.inputWrapper}>
                <input
                    value={contactData.email}
                    className={styles.input}
                    name='email'
                    type='email'
                    placeholder='Email'
                    autoComplete='on'
                    onChange={onInputChange}
                />
                <button
                    className={styles.deleteButton}
                    type='button'
                    onClick={onClearField}
                >
                    ❌
                </button>
            </div>
            <div className={styles.inputWrapper}>
                <input
                    value={contactData.phone}
                    className={styles.input}
                    name='phone'
                    type='tel'
                    placeholder='Phone'
                    autoComplete='on'
                    onChange={onInputChange}
                />
                <button
                    className={styles.deleteButton}
                    type='button'
                    onClick={onClearField}
                >
                    ❌
                </button>
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.formButton} type='submit'>
                    Save
                </button>
                {contactData.id && (
                    <button
                        className={styles.formButton}
                        type='button'
                        onClick={onContactDelete}
                    >
                        Delete
                    </button>
                )}
            </div>
        </form>
    );
}

export default ContactForm;

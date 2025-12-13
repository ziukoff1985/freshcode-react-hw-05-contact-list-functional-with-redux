import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import styles from './App.module.css';

function App() {
    return (
        <>
            <h1 className={styles.title}>Contact List</h1>
            <div className={styles.container}>
                <ContactList />
                <ContactForm />
            </div>
        </>
    );
}

export default App;

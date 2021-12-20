import { useState, useCallback, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

import Section from './shared/components/Section';
import FormContacts from './components/FormContacts';
import Input from './shared/components/Input';
import ContactList from './components/ContactList';

// import useLocalStorage from './hooks/useLocalStorage';

import './styles/App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    const contactsList = JSON.parse(localStorage.getItem('contacts'));

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!Array.isArray(contactsList)) {
        return;
      }
      if (contactsList.length) {
        setContacts(contactsList);
      }
      return;
    }
    if (contactsList.length !== contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  function checkContactHandler({ name, number }) {
    if (!name) {
      return alert('Please enter name!');
    }
    if (!number) {
      return alert('Please enter number!');
    }
    addContactHandler({ name, number });
  }

  function addContactHandler({ name, number }) {
    const lowerCaseName = name.toLowerCase();

    const findInArray = contacts.find(({ name }) => {
      const lowerCaseStateName = name.toLowerCase();
      return lowerCaseStateName === lowerCaseName;
    });

    if (findInArray) {
      return alert(`${name} is already in your contacts!`);
    }

    const contact = {
      name,
      number,
      id: nanoid(),
    };

    setContacts(contacts => [...contacts, contact]);
  }

  const deleteContactHandler = useCallback(
    id => {
      setContacts(contacts => contacts.filter(contact => contact.id !== id));
    },
    [setContacts]
  );

  function filterChangeHandler(e) {
    const { value } = e.target;
    setFilter(value);
  }

  function filterContactsHandler() {
    if (!filter) {
      return contacts;
    }

    const lowerCaseFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name }) => {
      const lowerCaseName = name.toLowerCase();
      return lowerCaseName.includes(lowerCaseFilter);
    });

    return filteredContacts;
  }

  return (
    <>
      <Section title={'Phonebook'} classEl={'phonebook'}>
        <FormContacts submitedData={checkContactHandler} />
        <Input
          labelName="Find contact by name"
          value={filter}
          onChange={filterChangeHandler}
          type="text"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholderValue="Search"
        />
      </Section>

      <Section title={'Contacts'} classEl={'contacts'}>
        <ContactList contacts={filterContactsHandler()} onDeleteItem={deleteContactHandler} />
      </Section>
    </>
  );
};

export default App;

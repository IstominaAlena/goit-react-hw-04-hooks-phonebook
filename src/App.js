import { useState } from 'react';

import { nanoid } from 'nanoid';

import Section from './shared/components/Section';
import FormContacts from './components/FormContacts';
import Input from './shared/components/Input';
import ContactList from './components/ContactList';

import useLocalStorage from './hooks/useLocalStorage';

import './styles/App.css';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

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
    const contact = {
      name,
      number,
      id: nanoid(),
    };

    const findInArray = this.state.contacts.find(({ name }) => {
      const lowerCaseStateName = name.toLowerCase();
      return lowerCaseStateName === lowerCaseName;
    });

    if (findInArray) {
      return alert(`${name} is already in your contacts!`);
    }

    setContacts(contacts => [...contacts, contact]);
  }

  function deleteContactHandler(id) {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  }

  function filterChangeHandler(e) {
    const { value } = e.currentTarget;
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

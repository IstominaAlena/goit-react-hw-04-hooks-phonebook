import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import Section from './shared/components/Section';
import FormContacts from './components/FormContacts';
import Input from './shared/components/Input';
import ContactList from './components/ContactList';

import './styles/App.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const prevStateContacts = prevState.contacts;
    const updetedStateContacts = this.state.contacts;

    if (updetedStateContacts !== prevStateContacts) {
      localStorage.setItem('contacts', JSON.stringify(updetedStateContacts));
    }
  }

  checkContactHandler = ({ name, number }) => {
    if (!name) {
      return alert('Please enter name!');
    }
    if (!number) {
      return alert('Please enter number!');
    }
    this.addContactHandler({ name, number });
  };

  deleteContactHandler = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  filterChangeHandler = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  filterContactsHandler = () => {
    const { contacts, filter } = this.state;

    if (!filter) {
      return contacts;
    }

    const lowerCaseFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name }) => {
      const lowerCaseName = name.toLowerCase();
      return lowerCaseName.includes(lowerCaseFilter);
    });

    return filteredContacts;
  };

  addContactHandler = ({ name, number }) => {
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

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  render() {
    const {
      filterContactsHandler,
      checkContactHandler,
      filterChangeHandler,
      deleteContactHandler,
    } = this;

    const contacts = filterContactsHandler();

    return (
      <>
        <Section title={'Phonebook'} classEl={'phonebook'}>
          <FormContacts submitedData={checkContactHandler} />
          <Input
            labelName="Find contact by name"
            value={this.state.filter}
            onChange={filterChangeHandler}
            type="text"
            name="filter"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            placeholderValue="Search"
          />
        </Section>

        <Section title={'Contacts'} classEl={'contacts'}>
          <ContactList contacts={contacts} onDeleteItem={deleteContactHandler} />
        </Section>
      </>
    );
  }
}

export default App;

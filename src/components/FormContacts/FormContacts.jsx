import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';

import styles from './FormContacts.module.css';

class FormContacts extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.submitedData(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    const { handleSubmit, handleInputChange } = this;

    return (
      <>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            labelName="Name"
            value={name}
            onChange={handleInputChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            placeholderValue="Jane Doe"
          />

          <Input
            labelName="Number"
            value={number}
            onChange={handleInputChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            placeholderValue="+38-099-123-45-67"
          />

          <Button type="submit" text="Add contact" />
        </form>
      </>
    );
  }
}

export default FormContacts;

FormContacts.propTypes = {
  submitedData: PropTypes.func.isRequired,
};

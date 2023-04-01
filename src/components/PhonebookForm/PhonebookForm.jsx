import React, { useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { PhonebookStyled } from './PhonebookForm.styled';
const PhonebookForm = props => {
  const [contact, setContact] = useState({
    name: '',
    number: '',
  });

  const nameInputId = shortid.generate();
  const tagInputId = shortid.generate();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const contactWithId = { ...contact, id: shortid.generate() };
    props.addContact(contactWithId);
    setContact({ name: '', number: '' });
  };

  const { name, number } = contact;
  return (
    <PhonebookStyled>
      <form className="phonebook-form" onSubmit={handleSubmit}>
        <label htmlFor={nameInputId} className="phonebook-form__name">
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            className="phonebook-form__input"
            value={name}
            onChange={handleChange}
            id={nameInputId}
          />
        </label>
        <label htmlFor={tagInputId} className="phonebook-form__name">
          Number
          <input
            type="tel"
            name="number"
            className="phonebook-form__input"
            onChange={handleChange}
            value={number}
            id={tagInputId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className="phonebook-form__button">
          Add contact
        </button>
      </form>
    </PhonebookStyled>
  );
};

export default PhonebookForm;

PhonebookForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

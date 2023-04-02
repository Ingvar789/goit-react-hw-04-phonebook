// імпорт компонент
import React, { useEffect, useState, useRef } from 'react';
import { Container } from './App.styled';
import PhonebookForm from 'components/PhonebookForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
const App = () => {
  const initialized = useRef(false);
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    const contacts = localStorage.getItem('contacts');
    const parsedСontacts = JSON.parse(contacts);
    if (parsedСontacts) {
      setContacts(parsedСontacts);
    }
    initialized.current = true;
  }, []);

  useEffect(() => {
    console.log('updated contacts');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = info => {
    setContacts(prevState => {
      const prevContacts = [...prevState];
      for (let contact of prevContacts) {
        if (info.name === contact.name) {
          alert(`${info.name} is already in contacts.`);
          return [...prevState];
        }
      }
      return [...prevState, info];
    });
  };

  const onDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <PhonebookForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={onDeleteContact}
      />
    </Container>
  );
};
export default App;

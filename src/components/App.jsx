import { useState, useEffect } from "react";
import shortid from 'shortid';
import Section from "./Section";
import Form from './Form';
import Filter from "./Filter";
import List from "./List";
import css from './app.module.scss';

const LS_KEY = 'contacts';

export function App() {
  const [contacts, setContacts] = useState(()=> {
    const contacts = JSON.parse(localStorage.getItem(LS_KEY));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts])

  const addContact = (name, number) => {
    if (isDublicate(name)) {
      alert(`${name} is already in contacts`); 
      return false;
    }

    setContacts(prevContacts => {
      const newContact = {
        id: shortid.generate(),
        name,
        number,
      };

      return [newContact, ...prevContacts];
    });

    return true;
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const isDublicate = (newName) => {
    const normaliazedName = newName.toLowerCase();
    const result = contacts.find(({ name }) => {
      return (name.toLowerCase() === normaliazedName)
    });
    return Boolean(result);
  }

  const getContacts = () => {
    if (!filter) return contacts;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({name}) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

    return (
      <div className={css.div}>
        <Section title="Phonebook">
          <Form onSubmit={addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={changeFilter} />
          <List
            contacts={getContacts()}
            onDeleteContact={deleteContact}
          />
        </Section>
      </div>
    );
};

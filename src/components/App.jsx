import { useSelector, useDispatch } from 'react-redux';

import Section from './Section';
import Form from './Form';
import Filter from './Filter';
import List from './List';

import { addContact, deleteContact, getFilteredContacts } from 'redux/contactsSlice';
import { getFilter, setFilter } from 'redux/filterSlice';

import css from './app.module.scss';

export function App() {
  const filteredContacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleAddContact = (name, number) => {
    dispatch(addContact( name, number ));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const changeFilter = ({target}) => {
    dispatch(setFilter(target.value));
  };

  const isBooks = Boolean(filteredContacts.length);

  return (
    <div className={css.div}>
      <Section title="Phonebook">
        <Form onSubmit={handleAddContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        {isBooks ? (
          <List
            contacts={filteredContacts}
            onDeleteContact={handleDeleteContact}
          />
        ) : (
          <p className={css.message}>There are no contacts in the phonebook.</p>
        )}
      </Section>
    </div>
  );
}

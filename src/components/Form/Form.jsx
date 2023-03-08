import { useState } from 'react';
import shortid from 'shortid';
import css from './form.module.scss';

export default function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      
      case 'number':
        setNumber(value);
        break;
      
      default:
        break;
    }
  }

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(name, number);
    
    setName('');
    setNumber('');
  };

    return (
      <form onSubmit={handleSubmit} className={css.form}>
        <label htmlFor={nameInputId}>
          Name{' '}
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            id={nameInputId}
            className={css.input}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor={numberInputId}>
          Number{' '}
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            className={css.input}
            id={numberInputId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button
          type="submit"
          className={css.button}
          disabled={!name || !number}
        >
          Add contact
        </button>
      </form>
    );
}

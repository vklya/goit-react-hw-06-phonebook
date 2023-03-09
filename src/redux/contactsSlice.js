import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: [],
    reducers: {
        addContact: {
            reducer(state, { payload }) {
                if (state.some(contact => contact.name.toLowerCase() === payload.name.toLowerCase()))
                    return alert(`${payload.name} is already in contacts`);
                state.unshift(payload);
            },
            prepare: (name, number) => {
                return {
                    payload: {
                        id: shortid.generate(),
                        name,
                        number,
                    },
                };
            },
        },
        deleteContact: (state, { payload }) => state.filter(({ id }) => id !== payload),
    }
});

export const getFilteredContacts = ({ contacts, filter }) => {
    if (!filter) return contacts;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({name}) =>
        name.toLowerCase().includes(normalizedFilter),
    );
}

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
export const getAllContacts = ({contacts}) => contacts;


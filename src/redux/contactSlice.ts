import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export interface IContact {
  name: string;
  number: string;
  id: string;
}

interface CounterState {
  contacts: IContact[];
  filter: string;
}

const initialState = {
  contacts: [],
  filter: "",
} as CounterState;

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<IContact>) {
      const findContact = state.contacts.find((contact) =>
        contact.name
          .toLocaleLowerCase()
          .includes(action.payload.name.toLocaleLowerCase())
      );
      findContact
        ? alert(`${action.payload.name} is already in contacts.`)
        : state.contacts.push(action.payload);
    },
    deleteContact(state, action: PayloadAction<string>) {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
    updateFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, updateFilter } =
  contactsSlice.actions;

// Reducer

const persistConfig = {
  key: "contacts",
  storage,
  whitelist: ["contacts"],
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

// Selectors

interface RootState {
  contacts: CounterState;
  filter: string;
}

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectFilterValue = (state: RootState) => state.contacts.filter;

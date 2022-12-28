import "./App.css";
import { useState, BaseSyntheticEvent } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { Filter } from "./components/Filter/Filter";
import { ContactList } from "./components/ContactList/ContactList";
import { Title, Subtitle, Wrapper } from "./App.styled";

const LS_KEY: string = "contacts";

interface IContact {
  name: string;
  id?: string;
  number?: string;
}

const App: React.FC = (): JSX.Element => {
  const [contacts, setContacts] = useLocalStorage(LS_KEY, []);
  const [filter, setFilter] = useState<string>("");

  const addContact = (obj: IContact): void => {
    const findContact: IContact = contacts.find((contact: IContact): boolean =>
      contact.name.toLocaleLowerCase().includes(obj.name.toLocaleLowerCase())
    );
    findContact
      ? alert(`${obj.name} is already in contacts.`)
      : setContacts((prevContacts: IContact[]) => [...prevContacts, obj]);
  };

  const deleteContact = (id: string): void => {
    setContacts((prevContacts: IContact[]) =>
      prevContacts.filter((contact: IContact) => contact.id !== id)
    );
  };

  const visibleContacts = () => {
    const normalizeFilter = filter.toLocaleLowerCase();
    return contacts.filter((contact: IContact) =>
      contact.name.toLocaleLowerCase().includes(normalizeFilter)
    );
  };

  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />
      <Subtitle>Contacts</Subtitle>
      <Filter
        value={filter}
        onChange={(e: BaseSyntheticEvent) => setFilter(e.target.value)}
      />
      <ContactList contacts={visibleContacts()} onClick={deleteContact} />
    </Wrapper>
  );
};

export default App;

import "./App.css";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { Filter } from "./components/Filter/Filter";
import { ContactList } from "./components/ContactList/ContactList";
import { Title, Subtitle, Wrapper } from "./App.styled";

const App: React.FC = (): JSX.Element => {
  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactForm />
      <Subtitle>Contacts</Subtitle>
      <Filter />
      <ContactList />
    </Wrapper>
  );
};

export default App;

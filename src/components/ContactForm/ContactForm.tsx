import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import { Form, Label, Input, Button } from "./ContactForm.styled";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactSlice";
import { AppDispatch } from "../../redux/store";

interface IContact {
  name: string;
  number: string;
  id: string;
}

export const ContactForm: React.FC = (): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const contactName = useRef<HTMLInputElement>(null);
  const contactNumber = useRef<HTMLInputElement>(null);
  const dispatch: AppDispatch = useDispatch();

  const handlerInput = (): void => {
    setName(contactName.current?.value!);
    setNumber(contactNumber.current?.value!);
  };

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contact: IContact = {
      name,
      id: nanoid(),
      number,
    };
    e.currentTarget.reset();
    dispatch(addContact(contact));
  };

  return (
    <Form autoComplete="off" onSubmit={handlerSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          ref={contactName}
          onChange={handlerInput}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          ref={contactNumber}
          onChange={handlerInput}
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
};

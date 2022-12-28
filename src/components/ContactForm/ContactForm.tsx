import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import { Form, Label, Input, Button } from "./ContactForm.styled";

interface IProps {
  onSubmit: Function;
}

export const ContactForm: React.FC<IProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const contactName = useRef<HTMLInputElement>(null);
  const contactNumber = useRef<HTMLInputElement>(null);

  const handlerInput = (): void => {
    setName(contactName.current?.value!);
    setNumber(contactNumber.current?.value!);
  };

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contact: object = {
      name,
      id: nanoid(),
      number,
    };
    e.currentTarget.reset();
    onSubmit(contact);
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

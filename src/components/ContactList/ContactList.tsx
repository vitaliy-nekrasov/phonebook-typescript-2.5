import { List, Item, Text, Button } from "./ContactList.styled";

interface IContact {
  name: string;
  number: string;
  id: string;
}

interface IProps {
  contacts: IContact[];
  onClick: Function;
}

export const ContactList: React.FC<IProps> = ({ contacts, onClick }) => {
  return (
    <List>
      {contacts.map((contact) => {
        return (
          <Item key={contact.id}>
            <Text>
              {contact.name}: {contact.number}
            </Text>
            <Button type="button" onClick={() => onClick(contact.id)}>
              Delete
            </Button>
          </Item>
        );
      })}
    </List>
  );
};

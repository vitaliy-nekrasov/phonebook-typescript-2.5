import { List, Item, Text, Button } from "./ContactList.styled";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContacts,
  selectFilterValue,
  deleteContact,
} from "../../redux/contactSlice";
import { AppDispatch } from "../../redux/store";
import { IContact } from "../../redux/contactSlice";

export const ContactList: React.FC = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  const filter: string = useSelector(selectFilterValue);
  const contacts: IContact[] = useSelector(selectContacts);

  const visibleContacts = (): IContact[] => {
    const normalizeFilter: string = filter.toLocaleLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(normalizeFilter)
    );
  };

  return (
    <List>
      {visibleContacts().map((contact) => {
        return (
          <Item key={contact.id}>
            <Text>
              {contact.name}: {contact.number}
            </Text>
            <Button
              type="button"
              onClick={() => dispatch(deleteContact(contact.id))}
            >
              Delete
            </Button>
          </Item>
        );
      })}
    </List>
  );
};

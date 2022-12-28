import { Label, Input } from "./Filter.styled";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter, selectFilterValue } from "../../redux/contactSlice";
import { AppDispatch } from "../../redux/store";

export const Filter: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const value: string = useSelector(selectFilterValue);
  return (
    <Label>
      Find contacts by name
      <Input
        type="text"
        name="filter"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(updateFilter(e.target.value))
        }
      />
    </Label>
  );
};

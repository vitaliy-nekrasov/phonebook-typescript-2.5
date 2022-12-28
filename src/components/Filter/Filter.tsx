import { Label, Input } from "./Filter.styled";

interface IProps {
  value: string;
  onChange: any;
}

export const Filter: React.FC<IProps> = ({ value, onChange }) => {
  return (
    <Label>
      Find contacts by name
      <Input type="text" name="filter" value={value} onChange={onChange} />
    </Label>
  );
};

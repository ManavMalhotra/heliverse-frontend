import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export const Filter = ({
  name,
  option,
  selectOption,
  optionList,
}: {
  name: string;
  option: string;
  selectOption: Function;
  optionList: string[];
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    selectOption(event.target.value as string);
  };

  console.log(optionList)
  return (
      <FormControl size="medium" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>{name}</InputLabel>
        <Select value={option} label={name} onChange={handleChange}>
          {optionList.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
};

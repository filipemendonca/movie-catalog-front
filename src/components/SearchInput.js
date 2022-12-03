import React, { useState } from "react";
import { TextField, FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";
import useDebounce from "../hook/useDebounce";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#1976d2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#777",
    },
    "&:hover fieldset": {
      borderColor: "#1976d2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
});

const SearchInput = ({ value, onChange, label }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const debouncedChange = useDebounce(onChange, 500);

  function handleChange(event) {
    setDisplayValue(event.target.value);
    debouncedChange(event.target.value);
  }

  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <CssTextField
        value={displayValue}
        onChange={handleChange}
        label={label}
        id="custom-css-outlined-input"
      />
    </FormControl>
  );
};

export default SearchInput;

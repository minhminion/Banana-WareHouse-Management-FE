import React, { useRef } from "react";
import {
  Select,
  Input,
  Chip,
  makeStyles,
  MenuItem,
  useTheme,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setFilter } from "../constants/actions";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = (ref) => ({
  variant: "menu",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
});

const roles = [
  {
    id: 1,
    name: "Admin",
  },
  {
    id: 2,
    name: "Customer",
  },
  {
    id: 3,
    name: "Sale",
  },
];

const SelectChip = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const anchorEl = useRef(null);
  const { value, onChange } = props;

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <FormControl style={{ width: "100%" }}>
      <InputLabel id="demo-mutiple-name-label">Role</InputLabel>
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        style={{ width: "100%" }}
        multiple
        value={value}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={
                  roles.find((item) => item.id === value)?.name || "Not found"
                }
                className={classes.chip}
              />
            ))}
          </div>
        )}
        MenuProps={MenuProps(anchorEl)}
      >
        {roles.map(({ id, name }) => (
          <MenuItem key={id} value={id} style={getStyles(id, value, theme)}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectChip;

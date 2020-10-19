import React, { useState } from "react";
import {
  Box,
  InputLabel,
  InputBase,
  Paper,
  Button,
  makeStyles,
  IconButton,
  useTheme,
  TextField,
} from "@material-ui/core";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { blueGrey } from "@material-ui/core/colors";
import {
  SwitchTransition,
  CSSTransition,
  TransitionGroup,
} from "react-transition-group";

const useStyles = makeStyles((theme) => ({
  buttonAction: {
    width: "100%",
    boxShadow: "none",
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const ProductDetailsUnit = ({
  classes: classesStyle,
  isEdit,
  values,
  errors,
  onChange,
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const [isAddUnit, setIsAddUnit] = useState(false);
  const [newUnit, setNewUnit] = useState({});

  const handleToggleAddUnit = () => {
    setIsAddUnit((prev) => !prev);
  };

  const handleChangeUnit = (e, unitId) => {
    const { name, value } = e.target;
    const fieldName = name.split("_")[0];
    const index = values.productUnits.findIndex((unit) => unit.id === unitId);

    if (index === -1) return;
    let newValue = value;
    if (fieldName === "ratioFromDefault") {
      newValue = newValue.match(/(\d+)\.?(\d+)?/g);
    }

    let newUnits = values.productUnits;
    newUnits[index] = {
      ...newUnits[index],
      [fieldName]: newValue,
      action: newUnits[index].action !== "created" ? "updated" : "created",
    };
    onChange({
      target: {
        name: "productUnits",
        value: newUnits,
      },
    });
  };

  const handleChangeNewUnit = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "ratioFromDefault") {
      newValue = newValue.match(/(\d+)\.?(\d+)?/g);
      newValue = newValue.length > 0 ? newValue[0] : "";
    }
    setNewUnit((prev) => ({
      ...prev,
      [name]: newValue || "",
    }));
  };

  const handleDeleteUnit = (unitId, action) => {
    if (values.productUnits) {
      let newUnits;
      if (action === "created") {
        newUnits = values.productUnits.filter((unit) => unit.id !== unitId);
      } else {
        const index = values.productUnits.findIndex(
          (unit) => unit.id === unitId
        );
        newUnits = values.productUnits;
        newUnits[index] = {
          ...newUnits[index],
          action: "deleted",
        };
      }
      onChange({
        target: {
          name: "productUnits",
          value: newUnits,
        },
      });
    }
  };

  const handleAddNewUnit = () => {
    if (!newUnit.name || !newUnit.ratioFromDefault) return;
    onChange({
      target: {
        name: "productUnits",
        value: [
          ...values.productUnits,
          {
            id: "_" + Math.random().toString(36).substr(2, 9),
            ...newUnit,
            action: "created",
          },
        ],
      },
    });
    setNewUnit({});
    handleToggleAddUnit();
  };

  const renderEnAdornment = (value) => (
    <p
      style={{
        padding: "0.5rem",
        backgroundColor: blueGrey[500],
        color: "white",
        fontWeight: 500,
        margin: 0,
        display: "flex",
        alignItems: "center",
        alignSelf: "stretch",
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
      }}
    >
      {value}
    </p>
  );

  return (
    <Box>
      <TextField
        disabled={!isEdit}
        style={{
          width: "100%",
          marginBottom: 24,
        }}
        label={"Đơn vị tính mặc định"}
        name="defaultUnit"
        helperText={errors.defaultUnit}
        error={errors?.defaultUnit?.length > 0}
        onChange={onChange}
        value={values.defaultUnit}
        placeholder={"Đơn vị tính mặc định"}
        margin={"normal"}
        InputLabelProps={{
          classes: {
            root: classesStyle.label,
          },
          focused: false,
          shrink: true,
        }}
        InputProps={{
          classes: {
            root: classesStyle.inputRoot,
            input: classesStyle.input,
            disabled: classesStyle.inputDisabled,
          },
          disableUnderline: true,
        }}
      />
      <Box className={classesStyle.productDescription}>
        <InputLabel className={classesStyle.label} style={{ marginBottom: 8 }}>
          Đơn vị tính
        </InputLabel>
        <TransitionGroup className="todo-list">
          {values.productUnits &&
            values.productUnits.map((unit, index) => {
              return (
                unit.action !== "deleted" && (
                  <CSSTransition key={unit.id} timeout={500} classNames="fade">
                    <Box
                      display="flex"
                      alignItems="center"
                      style={{ marginBottom: 8 }}
                    >
                      <InputBase
                        disabled={!isEdit}
                        name={"name_" + unit.id}
                        placeholder="Đơn vị tính"
                        value={unit.name}
                        onChange={(e) => handleChangeUnit(e, unit.id)}
                        classes={{
                          root: classesStyle.inputRoot,
                          input: classesStyle.input,
                          disabled: classesStyle.inputDisabled,
                        }}
                      />
                      <InputLabel
                        className={classesStyle.label}
                        style={{ margin: 8, fontSize: 26 }}
                      >
                        =
                      </InputLabel>
                      <Box display="flex" style={{ minWidth: 150 }}>
                        <InputBase
                          disabled={!isEdit}
                          name={"ratioFromDefault_" + unit.id}
                          placeholder="Tỉ lệ"
                          value={unit.ratioFromDefault}
                          onChange={(e) => handleChangeUnit(e, unit.id)}
                          style={{
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 0,
                          }}
                          classes={{
                            root: classesStyle.inputRoot,
                            input: classesStyle.input,
                            disabled: classesStyle.inputDisabled,
                          }}
                        />
                        {renderEnAdornment(values.defaultUnit)}
                      </Box>
                      {isEdit && (
                        <IconButton
                          color="secondary"
                          onClick={() => handleDeleteUnit(unit.id, unit.action)}
                        >
                          <CloseIcon />
                        </IconButton>
                      )}
                    </Box>
                  </CSSTransition>
                )
              );
            })}
        </TransitionGroup>
        {isEdit && (
          <SwitchTransition mode={"out-in"}>
            <CSSTransition
              key={`add-category-${isAddUnit}`}
              addEndListener={(node, done) =>
                node.addEventListener("transitionend", done, false)
              }
              classNames="fade"
            >
              <div>
                {isAddUnit ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    style={{ marginBottom: 8 }}
                  >
                    <InputBase
                      placeholder="Đơn vị tính"
                      name="name"
                      autoFocus
                      value={newUnit.name}
                      onChange={handleChangeNewUnit}
                      classes={{
                        root: classesStyle.inputRoot,
                        input: classesStyle.input,
                        disabled: classesStyle.inputDisabled,
                      }}
                    />
                    <InputLabel
                      className={classesStyle.label}
                      style={{ margin: 8, fontSize: 26 }}
                    >
                      =
                    </InputLabel>
                    <Box display="flex" style={{ minWidth: 150 }}>
                      <InputBase
                        placeholder="Tỉ lệ"
                        name="ratioFromDefault"
                        value={newUnit.ratioFromDefault}
                        onChange={handleChangeNewUnit}
                        style={{
                          borderBottomRightRadius: 0,
                          borderTopRightRadius: 0,
                        }}
                        classes={{
                          root: classesStyle.inputRoot,
                          input: classesStyle.input,
                          disabled: classesStyle.inputDisabled,
                        }}
                      />
                      {renderEnAdornment(values.defaultUnit)}
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      style={{ marginLeft: 8 }}
                    >
                      <IconButton
                        style={{ color: theme.palette.success.main }}
                        onClick={handleAddNewUnit}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={handleToggleAddUnit}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ) : (
                  <Box mt={1} clone>
                    <Button
                      onClick={handleToggleAddUnit}
                      component={Paper}
                      className={classes.buttonAction}
                    >
                      Thêm đơn vị tính
                    </Button>
                  </Box>
                )}
              </div>
            </CSSTransition>
          </SwitchTransition>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetailsUnit;

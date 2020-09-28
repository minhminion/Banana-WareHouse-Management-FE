import React, { useState, useRef } from "react";
import clsx from "clsx";
import {
  makeStyles,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  lighten,
  Grid,
  TextField,
  InputAdornment,
  Paper,
  Popover,
  Button,
} from "@material-ui/core";
// ICONS
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import SelectChip from "./SelectChip";
import { useSelector, useDispatch } from "react-redux";
import { MODULE_NAME } from "../constants/models";
import { setFilter, resetFilter } from "../constants/actions";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    minHeight: 64,
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(3),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  filterContent: {
    position: "relative",
    padding: theme.spacing(3),
    width: 560,
    // paddingBottom: theme.spacing(4),
  },
  filterCloseButton: {
    position: "absolute",
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
    zIndex: 2,
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const [openSearch, setOpenSearch] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const roleName = useSelector((state) => state[MODULE_NAME].filter.role);

  const handleToggleOpenSearch = () => {
    setOpenSearch((prev) => !prev);
  };

  const handleToggleFilter = () => {
    setOpenFilter((prev) => !prev);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // Functions for filter
  const handleRestFilter = () => {
    dispatch(resetFilter());
  };
  const handleChangeSelectRole = (value) => {
    dispatch(setFilter({ role: value }));
  };

  return (
    <Toolbar className={clsx(classes.root)}>
      {openSearch ? (
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <TextField
              id="input-with-icon-grid"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <IconButton
              aria-label="exit search list"
              onClick={handleToggleOpenSearch}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}
      <Tooltip title="Search">
        <IconButton aria-label="search list" onClick={handleToggleOpenSearch}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <div
        // aria-label="filter list"
        ref={anchorRef}
        color="inherit"
        aria-controls={openFilter ? "filter-grow" : undefined}
        aria-haspopup="true"
      >
        <Tooltip title="Filter list">
          <IconButton onClick={handleToggleFilter}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Popover
        open={openFilter}
        anchorEl={anchorRef.current}
        onClose={handleCloseFilter}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Paper>
          <IconButton
            className={classes.filterCloseButton}
            onClick={handleCloseFilter}
          >
            <CloseIcon />
          </IconButton>
          <div className={classes.filterContent}>
            <div
              style={{
                display: "flex",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              <Typography style={{ marginRight: 8 }} variant="h6">
                Filter
              </Typography>
              <Button color="primary" onClick={handleRestFilter}>
                Reset
              </Button>
            </div>
            <SelectChip value={roleName} onChange={handleChangeSelectRole} />
          </div>
        </Paper>
      </Popover>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;

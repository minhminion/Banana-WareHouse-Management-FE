import {
  Box,
  makeStyles,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  withStyles,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import { Check, Close } from "@material-ui/icons";
import { ENUMS } from "../../../../common/constants";

function getSteps() {
  return ["Mới", "Đang thực hiện", "Hoàn tất"];
}

const Connector = withStyles((theme) => ({
  alternativeLabel: {
    top: 18,
  },
  active: {
    "& $line": {
      borderColor: theme.palette.success.main,
    },
  },
  completed: {
    "& $line": {
      borderColor: theme.palette.success.main,
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 4,
    borderRadius: 1,
  },
}))(StepConnector);

const useStepIconStyles = makeStyles((theme) => ({
  root: {
    color: "#eaeaf0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    width: 40,
    height: 40,
    backgroundColor: "#eaeaf0",
  },
  active: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.success.main,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: theme.palette.common.white,
  },
  completed: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.success.main,
    zIndex: 1,
    fontSize: 24,
  },
  canceled: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.dark,
    zIndex: 1,
    fontSize: 24,
  },
  forceDone: {
    color: theme.palette.common.white,
    backgroundColor: "#b19cd9",
    zIndex: 1,
    fontSize: 24,
  },
}));

function StepIcon(props) {
  const classes = useStepIconStyles();
  const { active, completed, canceled, forceDone } = props;

  return (
    <Box
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
        [classes.canceled]: canceled,
        [classes.forceDone]: forceDone,
      })}
    >
      {canceled ? (
        <Close className={classes.canceled} />
      ) : completed ? (
        <Check
          className={clsx(classes.completed, {
            [classes.forceDone]: forceDone,
          })}
        />
      ) : (
        <div className={classes.circle} />
      )}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    border: "none",
  },
}));

const GOOD_RECEIVING_STATUS = ENUMS.GOOD_RECEIVING_STATUS;

const GoodsReceivingNoteStatusStepper = ({ status }) => {
  const classes = useStyles();
  const steps = getSteps();

  const getCurrentStep = (status) => {
    switch (status) {
      case GOOD_RECEIVING_STATUS.NEW:
        return 0;
      case GOOD_RECEIVING_STATUS.PENDING:
        return 1;
      case GOOD_RECEIVING_STATUS.APPROVED:
        return 2;
      case GOOD_RECEIVING_STATUS.DONE:
      case GOOD_RECEIVING_STATUS.CANCELED:
        return 3;
      default:
        return 0;
    }
  };

  const isStepForceDone = (step) => {
    return step === 2 && status === GOOD_RECEIVING_STATUS.DONE;
  };

  const isStepCancel = (step) => {
    return step === 1 && status === GOOD_RECEIVING_STATUS.CANCELED;
  };

  return (
    <Box mb={2}>
      <Stepper
        alternativeLabel
        activeStep={getCurrentStep(status)}
        className={classes.root}
        connector={<Connector />}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepForceDone(index)) {
            // labelProps.optional = (
            //   <Typography
            //     variant="caption"
            //     align="center"
            //     style={{ display: "block" }}
            //   >
            //     Buộc hoàn tất
            //   </Typography>
            // );
            label = "Buộc hoàn tất"
          } else if (isStepCancel(index)) {
            labelProps.error = true;
            label = "Hủy";
          }
          return (
            <Step key={`${label}-${index}`} {...stepProps}>
              <StepLabel
                {...labelProps}
                StepIconProps={{
                  canceled: isStepCancel(index),
                  forceDone: isStepForceDone(index),
                }}
                StepIconComponent={StepIcon}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default GoodsReceivingNoteStatusStepper;

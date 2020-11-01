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
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
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
    borderTopWidth: 3,
    borderRadius: 1,
  },
}))(StepConnector);

const useStepIconStyles = makeStyles((theme) => ({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: theme.palette.success.main,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: theme.palette.success.main,
    zIndex: 1,
    fontSize: 18,
  },
  canceled: {
    color: theme.palette.error.main,
    zIndex: 1,
    fontSize: 18,
  }
}));

function StepIcon(props) {
  const classes = useStepIconStyles();
  const { active, completed, canceled } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {canceled ? (
        <Close className={classes.canceled} />
      ) : completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    border: "none",
  },
}));

const PROPOSAL_STATUS = ENUMS.PROPOSAL_STATUS;

const ProposalStatusStepper = ({ status }) => {
  const classes = useStyles();
  const steps = getSteps();

  const getCurrentStep = (status) => {
    switch (status) {
      case PROPOSAL_STATUS.NEW:
        return 0;
      case PROPOSAL_STATUS.PROCESSING:
      case PROPOSAL_STATUS.CANCELED:
        return 1;
      case PROPOSAL_STATUS.DONE:
      case PROPOSAL_STATUS.FORCE_DONE:
        return 2;
      default:
        return 0;
    }
  };

  const isStepForceDone = (step) => {
    return step === 2 && status === PROPOSAL_STATUS.FORCE_DONE;
  };

  const isStepCancel = (step) => {
    return step === 1 && status === PROPOSAL_STATUS.CANCELED;
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
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
                Buộc dừng
              </Typography>
            );
          } else if (isStepCancel(index)) {
            labelProps.error = true;
            label = "Hủy";
          }
          // if (isStepSkipped(index)) {
          //   stepProps.completed = false;
          // }
          return (
            <Step key={`${label}-${index}`} {...stepProps}>
              <StepLabel
                {...labelProps}
                StepIconProps={{ canceled: isStepCancel(index) }}
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

export default ProposalStatusStepper;

// React Components
import React from "react";
import { NavLink } from "react-router-dom";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

// Components
import ReviewForm from "user/components/ReviewForm";
import DetailsForm from "user/components/DetailsForm";
import Recorder from "user/components/AudioRecoder";
import AlertDialog from "shared/components/AlertDialog";

// Utils
import Copyright from "shared/components/Copyright";
import TextGrievance from "user/components/TextGrievance";
import { FormProps } from "user/containers/FormContainer";
import { JSONresponse } from "types";
import validateStudentCredentials from "utils/validateStudentCredentials";
import submitGrievanceData from "utils/submitGrievanceData";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "secondary",
    color: "primary",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Your Details", "Record Grievance", "Review"];

export default function GrievanceForm(props: FormProps) {
  const classes = useStyles();
  // States
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [mode, setMode] = React.useState<"Text" | "Audio">("Text"); //Mode in which the Grievance is to Be recorded.
  const [error, setError] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [response, setResponse] = React.useState<string>("");

  // Input Refs for the Details Form
  const firstName = React.useRef<HTMLInputElement>();
  const lastName = React.useRef<HTMLInputElement>();
  const rollNo = React.useRef<HTMLInputElement>();
  const phoneNo = React.useRef<HTMLInputElement>();
  const emailId = React.useRef<HTMLInputElement>();
  const refs = [firstName, lastName, rollNo, phoneNo, emailId];

  // Handlers
  const changeMode = (mode: "Text" | "Audio") => {
    setMode(mode);
    console.log(mode);
  };

  const handleError = (message: string = "An Unknown Error Occured"): void => {
    setError(message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const getStepContent = (step: number): JSX.Element => {
    switch (step) {
      case 0:
        return <DetailsForm refs={refs} mode={mode} setMode={changeMode} />;
      case 1:
        return mode === "Audio" ? (
          <Recorder setAudioBlob={props.setAudio} />
        ) : (
          <TextGrievance setText={props.setText} />
        );
      case 2:
        return <ReviewForm data={props.grievanceData} />;
      default:
        throw new Error("Unknown step");
    }
  };

  // Validation Functions

  const validateCredentials = async (): Promise<JSONresponse> => {
    props.setCredentials(
      refs[0].current?.value as string,
      refs[1].current?.value as string,
      refs[2].current?.value as string,
      refs[3].current?.value as string,
      refs[4].current?.value as string
    );
    const resp = await validateStudentCredentials(
      refs[2].current?.value as string,
      refs[4].current?.value as string
    );
    console.log(resp);
    return resp;
  };

  const submit = async () => {
    const response = await submitGrievanceData(props.grievanceData);
    setResponse(response.message);
    return response;
  };

  const handleNext = async () => {
    setIsLoading(true);
    switch (activeStep) {
      case 0: {
        const isValid = await validateCredentials();
        // if (!isValid.valid)
        setActiveStep(activeStep + 1);
        // else handleError(isValid.message);
        break;
      }
      case 1: {
        setActiveStep(activeStep + 1);
        break;
      }
      case 2: {
        await submit();
        setActiveStep(activeStep + 1);
        break;
      }
      default:
        break;
    }

    setIsLoading(false);
    console.log(props.grievanceData);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap style={{ flex: 1 }}>
            CDAP Grievance Portal
          </Typography>
          <Button color="inherit" component={NavLink} to="/admin/signin">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      {isLoading && <LinearProgress color="secondary" />}
      <AlertDialog open={open} handleClose={handleClose} message={error} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Submit Grievance
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">{response}</Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button
                      onClick={handleBack}
                      className={classes.button}
                      disabled={isLoading}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={isLoading}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}

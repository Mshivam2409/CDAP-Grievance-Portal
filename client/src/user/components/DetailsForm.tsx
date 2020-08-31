import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles((theme) => ({
  select: {
    marginTop: theme.spacing(1),
  },
}));

const DetailsForm = (props: any) => {
  const classes = useStyles();
  const refs: Array<React.MutableRefObject<HTMLInputElement>> = props.refs;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Student Details
      </Typography>
      <ValidatorForm
        onError={(errors) => {
          console.log(errors);
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextValidator
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              value={refs[0]}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.sets[0](event.target.value);
              }}
              // validatorListener={(v) => {
              //   if (v === true) {
              //     const stateCopy = [...props.formvalid, true];
              //     props.setIsFormValid(stateCopy);
              //   }
              //   console.log(props.formvalid);
              // }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              value={refs[1]}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.sets[1](event.target.value);
              }}
              // validatorListener={(v) => {
              //   if (v === true) {
              //     const stateCopy = [...props.formvalid, true];
              //     props.setIsFormValid(stateCopy);
              //   }
              //   console.log(props.formvalid);
              // }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              required
              id="rollno"
              name="rollno"
              label="Roll No."
              fullWidth
              autoComplete="roll-no"
              validators={["required", "isNumber"]}
              errorMessages={[
                "Please enter you Roll No!",
                "Roll Number is not valid!",
              ]}
              value={refs[2]}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.sets[2](event.target.value);
              }}
              // validatorListener={(v) => {
              //   if (v === true) {
              //     const stateCopy = [...props.formvalid, true];
              //     props.setIsFormValid(stateCopy);
              //   }
              //   console.log(props.formvalid);
              // }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              required
              id="mobileno"
              name="mobileno"
              label="Mobile No."
              fullWidth
              autoComplete="tel"
              validators={["required", "minStringLength:10"]}
              errorMessages={[
                "Please enter you Mobile Number!",
                "Mobile Number is not valid!",
              ]}
              value={refs[3]}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.sets[3](event.target.value);
              }}
              // validatorListener={(v) => {
              //   if (v === true) {
              //     const stateCopy = [...props.formvalid, true];
              //     props.setIsFormValid(stateCopy);
              //   }
              //   console.log(props.formvalid);
              // }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              required
              id="email"
              name="email"
              label="IITK Email Id."
              fullWidth
              autoComplete="email"
              validators={["required", "isEmail", "minStringLength:1"]}
              errorMessages={[
                "Please enter you email!",
                "Email is not valid!",
                "Email cannot be empty!",
              ]}
              value={refs[4]}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.sets[4](event.target.value);
              }}
              // validatorListener={(v) => {
              //   if (v === true) {
              //     const stateCopy = [...props.formvalid, true];
              //     props.setIsFormValid(stateCopy);
              //   }
              //   console.log(props.formvalid);
              // }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="grievance-mode-label" className={classes.select}>
              Mode of Grievance
            </InputLabel>
            <Select
              labelId="grievance-mode"
              id="grievance-mode"
              value={props.mode}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                props.setMode(event.target.value as string);
              }}
              fullWidth
            >
              <MenuItem value={"Audio"}>Audio Clip</MenuItem>
              <MenuItem value={"Text"}>Text Message</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="I confirm all the above details are correct."
            />
          </Grid>
        </Grid>
      </ValidatorForm>
    </React.Fragment>
  );
};

export default DetailsForm;

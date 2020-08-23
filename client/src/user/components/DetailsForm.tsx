import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            inputRef={refs[0]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            inputRef={refs[1]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="rollno"
            name="rollno"
            label="Roll No."
            fullWidth
            autoComplete="roll-no"
            inputRef={refs[2]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="mobileno"
            name="mobileno"
            label="Mobile No."
            fullWidth
            autoComplete="tel"
            inputRef={refs[3]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="IITK Email Id."
            fullWidth
            autoComplete="email"
            inputRef={refs[4]}
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
    </React.Fragment>
  );
};

export default DetailsForm;

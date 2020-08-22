import React from "react";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const TextGrievance = (props: any) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter Grievance
      </Typography>

      <TextField
        required
        id="text-grievance"
        name="textGrievance"
        label="Enter your Grievance"
        fullWidth
        multiline
        rows={15}
        onChange={(e) => {
          props.setText(e.currentTarget.value);
        }}
      />
    </React.Fragment>
  );
};

export default TextGrievance;

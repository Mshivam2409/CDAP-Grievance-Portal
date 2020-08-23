import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { grievanceData } from "types";

const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function ReviewForm(props: any) {
  const classes = useStyles();

  console.log(props);

  const data: grievanceData = props.data;

  const products = [
    { name: "Name", price: data.name },
    { name: "Roll No.", price: data.rollno },
    { name: "Phone No.", price: data.phoneno },
    { name: "Email Id", price: data.email },
    { name: "Mode of Grievance", desc: "", price: data.mode },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Grievance summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} />
            <Typography variant="body2" className={classes.total}>
              {product.price}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Date" />
          <Typography variant="subtitle1" className={classes.total}>
            {new Date().toDateString()}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Grievance
          </Typography>

          {data.mode === "Audio" ? (
            <audio
              src={window.URL.createObjectURL(data.Audio)}
              controls
            ></audio>
          ) : (
            <Typography gutterBottom>{data.Text}</Typography>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

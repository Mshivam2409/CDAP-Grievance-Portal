import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { grievance } from "types";

// Generate Order Data
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Recent(props: any) {
  const classes = useStyles();
  const [data, setData] = React.useState<Array<grievance>>([]);
  React.useEffect(() => {
    const getData = async () => {
      try {
        props.setIsLoading(true);
        const token = localStorage.getItem("cdap");
        const response = await fetch("/api/secure/getGrievances", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            required: "top",
          }),
        });
        console.log(response);
        if (!response.ok) {
          throw Error("");
        }
        const responseData: Array<grievance> = await response.json();
        setData(responseData.reverse());
        console.log(responseData);
        props.setIsLoading(false);
      } catch (error) {}
    };
    getData();
  }, []);
  return (
    <React.Fragment>
      <Title>Recent Grievances</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Mode</TableCell>
            <TableCell>Phone No</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell> {new Date(entry.date).toLocaleString()}</TableCell>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.mode}</TableCell>
              <TableCell>{entry.phoneno}</TableCell>
              <TableCell align="right">{entry.resolved}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}></div>
    </React.Fragment>
  );
}

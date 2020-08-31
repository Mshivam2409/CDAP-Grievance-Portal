import React from "react";
import Title from "./Title";
import { grievance } from "types";
import DetailedAccordion from "./Accordion";

export default function InProgress(props: any) {
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
            required: "progress",
          }),
        });
        console.log(response);
        if (!response.ok) {
          throw Error("");
        }
        const responseData: Array<grievance> = await response.json();
        setData(responseData);
        console.log(responseData);
      } catch (error) {}
      props.setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <React.Fragment>
      <Title>Grievances In Progress</Title>
      {data.map((entry) => (
        <DetailedAccordion
          key={entry.id}
          name={entry.name}
          date={new Date(entry.date).toLocaleString()}
          mode={entry.mode}
          email={entry.email}
          phoneno={entry.phoneno}
          rollno={entry.rollno}
          text={entry.text}
          audio={entry.audio}
          button={"Resolved"}
          click={() => {
            props.change("Resolved", entry.id);
          }}
        />
      ))}
    </React.Fragment>
  );
}

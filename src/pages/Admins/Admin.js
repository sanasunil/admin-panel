
import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";


const datatableData = [
  ["1","Ryby Rude", "rubyrude", "work409@gmail.com","Admin","Active"],
  ["2","Gaston Festus", "GastonFestus", "work409@gmail.com","Admin","Active"],
  ["3","Hayden", "Hayden", "work409@gmail.com","Admin","Active"],
  ["4","Gaston Festus", "GastonFestus", "work409@gmail.com","Admin","Active"],
  ["5","Hayden", "Hayden", "work409@gmail.com","Admin","Active"],
];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Admin() {
  const classes = useStyles();
  return (
    <>
     
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Admin List"
            data={datatableData}
            columns={["Id","User","Username", "EmailAddress", "Role", "Status","Action"]}
                      
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
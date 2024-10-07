import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FORM = {
    "calculadora": "calculadora"
  } 

  
function createData(
  id: string,
  name: string,
  data: string
) {
  return { id, name, data };
}

const rows: {
    id: string;
    name: string;
    data: string;
}[] = [
  createData("", "", "")
];


export default function TaskList() {
    const [schema, setSchema] = useState([]);

    // Fetch the schema from Camunda and set it as state
    // Fetch the schema from Camunda and set it as state
    useEffect(() => {
      setSchema([])
      fetch(`http://localhost:8080/engine-rest/task?name=${FORM.calculadora}`)
        .then((response) => response.json())
        .then((data) => setSchema(data));
    }, []);
  
    useEffect(()=>{
        schema.forEach((element: any) => {  
          rows.push(createData(element.id, element.name, element.created))
        }); 
    }, [schema])
    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID transação</TableCell>
            <TableCell>Nome do fluxo</TableCell>
            <TableCell align="right">Data</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Link to={`/form/${row.id}`}>{row.id}</Link>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}
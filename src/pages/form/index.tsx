import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

// Buscar e listar as instance started GET engine-rest/task ou com query string GET engine-rest/task?name=calculadora
// Iniciar nova instance POST /engine-rest/process-definition/key/{key}/start = key=calculadora
// ao clicar na instance abrir o form dinamicamente atraves das envs GET /engine-rest/task/{Task_id}/form-variables

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [schema, setSchema] = useState({});
  const { formId } = useParams();

  // Fetch the schema from Camunda and set it as state
  useEffect(() => {
    fetch(`http://localhost:8080/engine-rest/task/${formId}/form-variables`)
      .then((response) => response.json())
      .then((data) => setSchema(data));
  }, [formId]);

  const submitService = (formdata: any) => {
    const data = {}
    console.log(formdata);
    Object.entries(formdata).forEach((key: any, value: any) => {
        Object.assign(data, { [key[0]]: { value: key[1]} })
    });

    fetch(`http://localhost:8080/engine-rest/task/${formId}/submit-form`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({"variables": data})
    })
    .then((response) => response.json())
    .then((data) => alert(data));
  };
  const onSubmit: SubmitHandler<any> = (data: any) => submitService(data);

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Calculadora
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {Object.entries(schema).map(([fieldName, fieldConfig]: any, i) => {
            if (fieldConfig.type === "Object") {
              return (
                <>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {fieldName}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      {...register(fieldName)}
                      label={fieldName}
                    >
                      {fieldConfig.value.map((option: any) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              );
            }

            if (fieldConfig.type === "Long") {
              return (
                <>
                  <TextField
                    key={i}
                    {...register(fieldName)}
                    fullWidth
                    label={fieldName}
                    name={fieldName}
                    type="text"
                    value={fieldConfig.value}
                    margin="normal"
                    required
                  />
                </>
              );
            }
          })}
          {errors.exampleRequired && <span>This field is required</span>}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Enviar
          </Button>
          <Link to={"/"}>Voltar a lista</Link>
        </form>
      </Container>
    </>
  );
}
export default Form;

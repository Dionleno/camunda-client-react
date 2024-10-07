import React, { useState, useEffect, ReactNode } from "react";
import { useForm } from "react-hook-form"; 

const FORM = {
  calculadora: "calculadora",
};

// Buscar e listar as instance started GET engine-rest/task ou com query string GET engine-rest/task?name=calculadora
// Iniciar nova instance POST /engine-rest/process-definition/key/{key}/start = key=calculadora
// ao clicar na instance abrir o form dinamicamente atraves das envs GET /engine-rest/task/{Task_id}/form-variables

function TaskList() {
  const { register } = useForm();
  const [schema, setSchema] = useState({});

  // Fetch the schema from Camunda and set it as state
  useEffect(() => {
    fetch(`http://localhost:8080/engine-rest/task?name=${FORM.calculadora}`)
      .then((response) => response.json())
      .then((data) => setSchema(data));
  }, []);

  return (
    <> 
      {Object.entries(schema).map(([fieldName, fieldConfig]: any, i) => {
        console.log(fieldConfig.type);
        if (fieldConfig.type === "Object") {
          console.log(fieldConfig.value);

          return (
            <>
              <label htmlFor="fieldName">{fieldName}</label>
              <select {...register(fieldName)}>
                {fieldConfig.value.map((option: any) => (
                  <option>{option}</option>
                ))}
              </select>
            </>
          );
        }

        if (fieldConfig.type === "Long") {
          return (
            <>
              <label htmlFor="fieldName">{fieldName}</label>
              <input key={i} {...register(fieldName)} />
            </>
          );
        }
      })}
    </>
  );
}
export default TaskList;

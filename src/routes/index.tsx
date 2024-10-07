import React from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "../ListTask";

import Form from "../pages/form";

export default function Routers() {
  return (
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<TaskList />} /> 
              <Route path="/form/:formId" element={<Form />} />  
          </Routes>
        </BrowserRouter>
      
  );
}

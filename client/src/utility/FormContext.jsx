// FormContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a new context
const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    code: "print('Hello, World!')",
    input: "",
    language: "python",
    output: "",
  });

  // Define the handleChange function
  const handleChange = (newValue, inputName) => {
    setFormData(prevState => ({ ...prevState, [inputName]: newValue }));
  };

  return (
    <FormContext.Provider value={{ formData, handleChange,setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

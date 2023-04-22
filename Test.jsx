import React, { useEffect } from "react";

import { data } from "./Data";

import { useState } from "react";

import { useFormik, Formik, Field } from "formik";
import * as Yup from "yup";

const Test = ({ currentItem }) => {
  const attributeData = data.map(({ attributes }) => {
    return attributes;
  });
  const columnData = attributeData?.[currentItem];
  function validation(value) {
    let error;
    if (!value) {
      error = "Required";
    }
    return error;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.Field.value);
  };
  return (
    <div className="container">
      <div>
        <Formik initialValues={[]} onSubmit>
          {({ errors, touched, validateField, validateForm }) => (
            <form onSubmit={(e) => onSubmit(e)}>
              {columnData.map((item, i) => {
                const attributes = columnData[i].columns;

                return (
                  <div>
                    {attributes.map((item) => {
                      return (
                        <div className="form-row" key={item.id}>
                          <label htmlFor={item.name} className="form-label">
                            {item.label}
                          </label>

                          <Field
                            name={item.name}
                            validate={validation}
                            className="form-input"
                          />
                          {errors[item.name] && touched[item.name] && (
                            <p>{errors[item.name]}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <button type="submit" className="btn">
                submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Test;

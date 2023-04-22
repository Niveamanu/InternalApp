import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { data } from "./data1";
import { column } from "./column";
import structure from "./Structure.json";

const Sample = ({ currentItem }) => {
  const [initialValues, setInitialValues] = useState();
  const [rawMap, setRawMap] = useState({});

  const validationSchema = () => {
    return () => {
      let temp = {};
      const regMatch =
        /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

      Object.keys(rawMap).map((v, i) => {
        if (rawMap[v].type == "text")
          temp[v] = Yup.string().required("Required");
        if (rawMap[v].type == "url") {
          temp[v] = Yup.string()
            .matches(regMatch, "Website should be a valid URL")
            .required("Required");
        } else temp[v] = Yup.string().required("Required Field");
      });

      return Yup.object(temp);
    };
  };
  const test = data?.[currentItem].attributes;
  const test1 = column?.[currentItem].columndata;

  useEffect(() => {
    let obj = {};
    let init = {};

    test1.map((element) => {
      obj[element.name] = element;
      init[element.name] = test[element.name];
    });
    setRawMap(obj);
    setInitialValues(init);
  }, [currentItem]);

  return (
    initialValues && (
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          let resultJSON = {};
          for (let i in values) {
            if (values[i] != "") {
              resultJSON[i] = values[i];
              //init[element.name] = test[element.name];
            }
            for (let i in resultJSON) {
              for (const team in structure) {
                const teamObj = structure[team];
                for (const department in teamObj) {
                  const jobTitleObj = teamObj[department];
                  for (const jobTitle in jobTitleObj) {
                    if (jobTitle == i) {
                      jobTitleObj[jobTitle] = resultJSON[i];
                    }
                  }
                }
              }
            }
          }

          alert(JSON.stringify(structure, null, 2));
        }}
        validationSchema={validationSchema()}
      >
        <Form>
          {Object.keys(rawMap).map((v, i) => {
            return (
              <div className="form-row" key={i}>
                <label htmlFor={v} className="form-label">
                  {rawMap[v].label}
                </label>
                <br />
                <Field
                  id={v}
                  name={v}
                  placeholder={rawMap[v].placeholder}
                  type={rawMap[v].type}
                  className="form-input"
                />

                <ErrorMessage
                  name={v}
                  render={(msg) => <div className="error">{msg}</div>}
                />
                <br />
                <br />
              </div>
            );
          })}
          <button type="submit" className="btn">
            Submit
          </button>
        </Form>
      </Formik>
    )
  );
};

export default Sample;

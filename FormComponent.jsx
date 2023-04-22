import React, { useEffect } from "react";

import { data } from "./Data";

import { useState } from "react";

import { useFormik } from "formik";

// import Control from './Control'

//import { IoIosArrowDropdownCircle } from 'react-icons/fa'

const FormComponent = ({ currentItem }) => {
  const [selected, setSelected] = useState(null);

  const formik = useFormik({
    initialValues: {},

    onSubmit: (values) => {
      let credentials = { credentials: {} };

      credentials.credentials = values;

      console.log(values);
    },
  });

  useEffect(() => {
    setSelected(0);
  }, []);

  const toggle = (i) => {
    if (selected === i) return setSelected(null);

    setSelected(i);
  };

  const attributeData = data.map(({ attributes }) => {
    return attributes;
  });

  const columnData = attributeData?.[currentItem];

  return (
    <div className="container">
      <div>
        {columnData.map((item, i) => {
          const attributes = columnData[i].columns;

          return (
            <section className="question" key={i}>
              <div className="title" onClick={() => toggle(i)}>
                <h4 className="hd-btn">{item.header}</h4>
                <span>{selected === i ? "-" : "+"}</span>
              </div>

              <div className={selected === i ? "content show" : "content"}>
                <form className="form">
                  {attributes.map((item) => {
                    return (
                      <div className="form-row" key={item.id}>
                        <label htmlFor={item.name} className="form-label">
                          {item.label}
                        </label>

                        <input
                          type={item.type}
                          name={item.name}
                          id={item.id}
                          className="form-input"
                          onChange={formik.handleChange}
                        />
                      </div>
                    );
                  })}
                </form>
              </div>
            </section>
          );
        })}

        {/* <h4>{streamContent[currentItem]?.attributes?.[0]?.header}</h4> */}
      </div>

      <button type="submit" className="btn" onClick={formik.handleSubmit}>
        submit
      </button>
    </div>
  );
};

export default FormComponent;

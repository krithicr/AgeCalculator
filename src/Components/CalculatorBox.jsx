import React, { useRef, useState } from "react";
import "../App.css";
import IconArrow from "../assets/icon-arrow.svg";
import Values from "./Values";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  Date: yup
    .number()
    .typeError("Must be a valid Date")
    .integer("Must be a valid Date")
    .min(1, "Must be a valid Date")
    .max(31, "Must be a valid Date"),
  Month: yup
    .number()
    .typeError("Must be a valid Month")
    .integer("Must be a valid Month")
    .min(1, "Must be a valid Month")
    .max(12, "Must be a valid Month")
    .test("valid-month", "Invalid month for selected date", function (value) {
      const date = this.parent.Date;
      const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
      const monthsWith30Days = [4, 6, 9, 11];
      const monthWith29Days = 2;

      if (date === 31) {
        return monthsWith31Days.includes(value);
      } else if (date === 30) {
        return monthsWith30Days.includes(value);
      } else if (date === 29) {
        return monthWith29Days.includes(value);
      } else {
        return true; // Allow any month for other dates
      }
    }),
  Year: yup
    .number()
    .typeError("Must be a valid Year")
    .integer("Must be a valid Year")
    .min(1, "Must be a valid Year")
    .max(2023, "Year must be in the past"),
});

function CalculatorBox() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [data, setData] = useState();

  const submitValues = (data) => {
    setData(data);
  };

  return (
    <div className="calculatorBox">
      <div className="upper_values">
        <form onSubmit={handleSubmit(submitValues)}>
          <div className="date">
            <label className="label">Date</label>
            <input
              className="input_box"
              type="number"
              {...register("Date")}
              placeholder="dd"
            />
            {<p className="alert">{errors?.Date?.message}</p>}
          </div>

          <div className="month">
            <label className="label">Month</label>
            <input
              className="input_box"
              type="number"
              {...register("Month")}
              placeholder="mm"
            />
            {<p className="alert">{errors?.Month?.message}</p>}
          </div>

          <div className="year">
            <label className="label">Year</label>
            <input
              className="input_box"
              type="number"
              {...register("Year")}
              placeholder="yyyy"
            />
            {<p className="alert">{errors?.Year?.message}</p>}
          </div>
          <button className="button" type="submit">
            <img className="img" src={IconArrow} alt="Submit" />
          </button>
        </form>
      </div>
      <div className="lower_values">
        <Values data={data} />
      </div>
    </div>
  );
}

export default CalculatorBox;

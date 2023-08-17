import React from "react";
import "../App.css";

function Values({ data }) {
  const years = data ? data.Year : null;
  const months = data ? data.Month : null;
  const days = data ? data.Date : null;

  const d = new Date();
  let currentYear = d.getFullYear();
  let currentMonth = d.getMonth() + 1;
  let currentDay = d.getDate();

  let yearsOld = "--";
  let monthsOld = "--";
  let daysOld = "--";

  if (years !== null && months !== null && days !== null) {
    yearsOld = currentYear - years;

    if (
      currentMonth < months ||
      (currentMonth === months && currentDay < days)
    ) {
      yearsOld--;
    }

    monthsOld = currentMonth - months;
    if (monthsOld < 0) {
      monthsOld += 12;
    }
    if (currentDay < days) {
      monthsOld--;
    }

    daysOld = currentDay - days;
    if (currentDay < days) {
      daysOld += 31;
    }
  }

  return (
    <div className="Values">
      <h1>{yearsOld} years</h1>
      <h1>{monthsOld} months</h1>
      <h1>{daysOld} days</h1>
    </div>
  );
}

export default Values;

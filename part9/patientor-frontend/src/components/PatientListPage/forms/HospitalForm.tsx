import React, { useState } from "react";
import { EntryWithoutId } from "../../../types";
import CommonForm from "./CommonForm";

interface HealthCheckFormProps {
  onSubmit: (values: EntryWithoutId) => void;
}

const HospitalForm: React.FC<HealthCheckFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [discharge, setDischarge] = useState<{ date: string; criteria: string }>({
    date: "",
    criteria: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const values: EntryWithoutId = {
      type: "Hospital",
      description,
      date,
      specialist,
      discharge
    };
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CommonForm description={description} setDescription={setDescription} date={date} setDate={setDate} specialist={specialist} setSpecialist={setSpecialist} />
      <label>
        Discharge
        <br />
        Date: <input type="date" value={discharge?.date || ""} onChange={(e) => setDischarge({ ...discharge, date: e.target.value })} />
        Criteria: <input type="text" value={discharge?.criteria || ""} onChange={(e) => setDischarge({ ...discharge, criteria: e.target.value })} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default HospitalForm;

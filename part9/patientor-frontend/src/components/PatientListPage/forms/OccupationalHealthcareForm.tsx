import React, { useState } from "react";
import { EntryWithoutId } from "../../../types";

interface HealthCheckFormProps {
  onSubmit: (values: EntryWithoutId) => void;
}

const OccupationalHealthcareForm: React.FC<HealthCheckFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const values: EntryWithoutId = {
      type: "OccupationalHealthcare",
      description,
      date,
      specialist,
      employerName,
      sickLeave: sickLeave.startDate && sickLeave.endDate ? sickLeave : undefined,
    };
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <br />
      <label>
        Specialist:
        <input type="text" value={specialist} onChange={(e) => setSpecialist(e.target.value)} />
      </label>
      <br />
      <label>
        Employer Name:
        <input type="text" value={employerName} onChange={(e) => setEmployerName(e.target.value)} />
      </label>
      <br />
      <label>
        Sick Leave (optional):
        Start Date: <input type="date" value={sickLeave?.startDate || ""} onChange={(e) => setSickLeave({ ...sickLeave, startDate: e.target.value })} />
        End Date: <input type="date" value={sickLeave?.endDate || ""} onChange={(e) => setSickLeave({ ...sickLeave, endDate: e.target.value })} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default OccupationalHealthcareForm;

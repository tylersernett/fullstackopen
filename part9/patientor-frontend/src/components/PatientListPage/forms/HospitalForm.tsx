import React, { Dispatch, SetStateAction } from "react";

interface HealthCheckFormProps {
  discharge: { date: string; criteria: string };
  setDischarge: Dispatch<SetStateAction<{ date: string; criteria: string }>>;
}

const HospitalForm: React.FC<HealthCheckFormProps> = ({ discharge, setDischarge }) => {

  return (
    <label>
      Discharge
      <br />
      Date: <input type="date" value={discharge?.date || ""} onChange={(e) => setDischarge({ ...discharge, date: e.target.value })} />
      Criteria: <input type="text" value={discharge?.criteria || ""} onChange={(e) => setDischarge({ ...discharge, criteria: e.target.value })} />
    </label>
  );
};

export default HospitalForm;

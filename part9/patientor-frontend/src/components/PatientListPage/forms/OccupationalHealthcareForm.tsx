import React, { Dispatch, SetStateAction } from "react";

interface OccupationalHealthcareFormProps {
  employerName: string;
  setEmployerName: Dispatch<SetStateAction<string>>;
  sickLeave: { startDate: string, endDate: string };
  setSickLeave: Dispatch<SetStateAction<{ startDate: string, endDate: string }>>;
}

const OccupationalHealthcareForm: React.FC<OccupationalHealthcareFormProps> = ({ employerName, setEmployerName, sickLeave, setSickLeave }) => {

  const inputStyle = {margin:'5px'}

  return (
    <>
      <label>
        Employer Name:
        <input type="text" value={employerName} style={inputStyle} onChange={(e) => setEmployerName(e.target.value)} />
      </label>
      <br />
      <label  >
        <b>Sick Leave</b> <i>(optional)</i>:
        Start Date: <input type="date" style={inputStyle} value={sickLeave?.startDate || ""} onChange={(e) => setSickLeave({ ...sickLeave, startDate: e.target.value })} />
        End Date: <input type="date" value={sickLeave?.endDate || ""} onChange={(e) => setSickLeave({ ...sickLeave, endDate: e.target.value })} />
      </label>
    </>

  );
};

export default OccupationalHealthcareForm;

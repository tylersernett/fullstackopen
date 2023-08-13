import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import { Diagnosis } from "../../../types";

interface CommonFormProps {
  diagnosisCodeList: string[];
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  specialist: string;
  setSpecialist: Dispatch<SetStateAction<string>>;
  diagnosisCodes: Array<Diagnosis['code']> | undefined;
  setDiagnosisCodes: Dispatch<SetStateAction<Array<Diagnosis['code']> | undefined>>;
}

const CommonForm: React.FC<CommonFormProps> = ({ diagnosisCodeList, description, setDescription, date, setDate, specialist, setSpecialist, diagnosisCodes, setDiagnosisCodes }) => {

  const handleDiagnosisCodesChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setDiagnosisCodes(selectedOptions);
  };

  return (
    <>
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
        Diagnosis Codes:
        <select multiple value={diagnosisCodes} onChange={handleDiagnosisCodesChange}>
          {diagnosisCodeList.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </label>
      <br />
    </>
  )
}

export default CommonForm;

import React, { Dispatch, SetStateAction } from "react";

interface CommonFormProps {
  diagnosisCodeList: string[];
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  specialist: string;
  setSpecialist: Dispatch<SetStateAction<string>>;
}

const CommonForm: React.FC<CommonFormProps> = ({ diagnosisCodeList, description, setDescription, date, setDate, specialist, setSpecialist }) => {
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
        <select multiple>
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

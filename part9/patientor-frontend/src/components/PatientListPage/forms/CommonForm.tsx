import React, { Dispatch, SetStateAction } from "react";

interface CommonFormProps {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  specialist: string;
  setSpecialist: Dispatch<SetStateAction<string>>;
}

const CommonForm: React.FC<CommonFormProps> = ({ description, setDescription, date, setDate, specialist, setSpecialist }) => {
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
    </>
  )
}

export default CommonForm;

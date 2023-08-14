import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"; // Import Material-UI components
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
      <FormControl sx={{width:'200px', marginY:'10px'}}>
        <InputLabel>Diagnosis Codes</InputLabel>
        <Select
          multiple
          value={diagnosisCodes}
          onChange={(event) => handleDiagnosisCodesChange(event)}
        >
          {diagnosisCodeList.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <br />
    </>
  )
}

export default CommonForm;

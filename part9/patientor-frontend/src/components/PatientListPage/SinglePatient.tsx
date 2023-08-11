import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses"
import { Patient } from "../../types";

const SinglePatient = () => {
  const [patient, setPatient] = useState<Patient | null>(null); // Initialize with null or an initial Patient object
  const [diagnosisNames, setDiagnosisNames] = useState<{ [code: string]: string }>({});
  const id = useParams<{ id?: string }>().id ?? ''; // Provide a default empty string value
  useEffect(() => {
    const getData = async () => {
      try {
        if (id) { // Check if id is not empty
          const patientData = await patientService.getOneById(id);
          setPatient(patientData);
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    }
    getData();
  }, [id]);

  useEffect(() => {
    const fetchDiagnosisNames = async () => {
      try {
        const diagnoses = await diagnosesService.getAll();
        const diagnosisNameMap: { [code: string]: string } = {};

        diagnoses.forEach(diagnosis => {
          diagnosisNameMap[diagnosis.code] = diagnosis.name;
        });

        setDiagnosisNames(diagnosisNameMap);
      } catch (error) {
        console.error('Error fetching diagnosis names:', error);
      }
    };

    fetchDiagnosisNames();
  }, []);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      gender: {patient.gender}
      <br />
      ssn: {patient.ssn}
      <br />
      occupation: {patient.occupation}
      <br />
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          {entry.date}: <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li key={code}>
                {code} - {diagnosisNames[code]}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default SinglePatient;

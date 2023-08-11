import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Patient } from "../../types";

const SinglePatient = () => {
  const [patient, setPatient] = useState<Patient | null>(null); // Initialize with null or an initial Patient object
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

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      gender: {patient.gender}
      <br/>
      ssn: {patient.ssn}
      <br/>
      occupation: {patient.occupation}
      {/* Render other patient info */}
    </div>
  );
}

export default SinglePatient;

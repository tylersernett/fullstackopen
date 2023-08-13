import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses"
import { Patient, Entry, EntryWithoutId, HealthCheckRating, Diagnosis } from "../../types";
import CommonForm from "./forms/CommonForm";
import EntryDetails from "./EntryDetails";
import HealthCheckForm from "./forms/HealthCheckForm";
import HospitalForm from "./forms/HospitalForm";
import OccupationalHealthcareForm from "./forms/OccupationalHealthcareForm";

const SinglePatient = () => {
  const [patient, setPatient] = useState<Patient | null>(null); // Initialize with null or an initial Patient object
  const [selectedEntryType, setSelectedEntryType] = useState<Entry["type"] | null>("HealthCheck");
  const [showForm, setShowForm] = useState(false);
  const [diagnosisNames, setDiagnosisNames] = useState<{ [code: string]: string }>({});
  const [diagnosisCodeList, setDiagnosisCodeList] = useState<string[]>([]);

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");

  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });
  const [discharge, setDischarge] = useState<{ date: string; criteria: string }>({
    date: "",
    criteria: "",
  });

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
        setDiagnosisCodeList(Object.keys(diagnosisNameMap));
      } catch (error) {
        console.error('Error fetching diagnosis names:', error);
      }
    };

    fetchDiagnosisNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEntryFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Submitted entry values:", values);
    let values: EntryWithoutId | undefined; // Define values variable
    switch (selectedEntryType) {
      case "HealthCheck":
        values = {
          type: "HealthCheck",
          description,
          date,
          specialist,
          healthCheckRating,
        };
        break;
      case "OccupationalHealthcare":
        values = {
          type: "OccupationalHealthcare",
          description,
          date,
          specialist,
          employerName,
          sickLeave: sickLeave.startDate && sickLeave.endDate ? sickLeave : undefined,
        };
        break;
      case "Hospital":
        values = {
          type: "Hospital",
          description,
          date,
          specialist,
          discharge
        };
        break;
      default:
        console.error("Invalid entry type");
        return;
    }

    const updatedEntry = await patientService.createEntry(id, values)

    // Update the patient's entries with the new entry
    if (patient) {
      const updatedPatient: Patient = {
        ...patient,
        entries: [...patient.entries, updatedEntry],
      };
      setPatient(updatedPatient);
    }
  };


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
        <EntryDetails key={entry.id} entry={entry} diagnosisNames={diagnosisNames} />
      ))}

      <div style={{ border: '1px dotted black', padding: '5px' }}>
        <button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "Add Entry"}</button>

        {showForm &&
          <div>
            <label>
              Entry Type:
              <select
                value={selectedEntryType || ""}
                onChange={(e) => setSelectedEntryType(e.target.value as "Hospital" | "OccupationalHealthcare" | "HealthCheck" | null)}
              >
                <option value="" disabled>Select Entry Type</option>
                <option value="HealthCheck">Health Check</option>
                <option value="OccupationalHealthcare">Occupational Healthcare</option>
                <option value="Hospital">Hospital</option>
              </select>
            </label>
            <form onSubmit={(e) => handleEntryFormSubmit(e)} >

              <CommonForm diagnosisCodeList={diagnosisCodeList}
                description={description} setDescription={setDescription}
                date={date} setDate={setDate}
                specialist={specialist} setSpecialist={setSpecialist}
              />

              {selectedEntryType === "HealthCheck" && <HealthCheckForm healthCheckRating={healthCheckRating} setHealthCheckRating={setHealthCheckRating} />}
              {selectedEntryType === "OccupationalHealthcare" && <OccupationalHealthcareForm employerName={employerName} setEmployerName={setEmployerName} sickLeave={sickLeave} setSickLeave={setSickLeave} />}
              {selectedEntryType === "Hospital" && <HospitalForm discharge={discharge} setDischarge={setDischarge} />}
              <br />
              <button type="submit">Submit</button>

            </form>
          </div>
        }
      </div>

    </div>
  );
}

export default SinglePatient;

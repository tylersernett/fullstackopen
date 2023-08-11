import { Entry, HealthCheckRating } from "../../types";

interface EntryDetailsProps {
  entry: Entry;
  diagnosisNames: { [code: string]: string };
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry, diagnosisNames }) => {
  let content;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const commonContent = (
    <>
      {entry.date} 
      <br/>
      <i>{entry.description}</i>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} - {diagnosisNames[code]}
          </li>
        ))}
      </ul>
    </>
  );

  switch (entry.type) {
    case "HealthCheck":
      content = (
        <>
          <p>Health Check Rating: {HealthCheckRating[entry.healthCheckRating]}</p>
        </>
      );
      break;
    case "OccupationalHealthcare":
      content = (
        <>
          <p>Employer Name: {entry.employerName}</p>
          {entry.sickLeave && (
            <p>Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
          )}
        </>
      );
      break;
    case "Hospital":
      content = (
        <>
          <p>Discharge Date: {entry.discharge.date}</p>
          <p>Discharge Criteria: {entry.discharge.criteria}</p>
        </>
      );
      break;
    default:
      return assertNever(entry);
  }

  return (
    <div style={{border:'1px solid black', padding: '5px', marginBottom:'5px'}}>
      {commonContent}
      {content}
      diagnosis by {entry.specialist}
    </div>
  );
};

export default EntryDetails;
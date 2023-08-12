import React, { useState } from "react";
import { HealthCheckRating, EntryWithoutId } from "../../../types";

interface HealthCheckFormProps {
  onSubmit: (values: EntryWithoutId) => void;
}

const HealthCheckForm: React.FC<HealthCheckFormProps> = ({ onSubmit }) => {
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (healthCheckRating === undefined) {
      console.error("Health Check Rating is required");
      return; // Don't proceed with the submission
    }

    const values: EntryWithoutId = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
    };

    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        Health Check Rating:
        <select
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(parseInt(e.target.value) as HealthCheckRating)}
        >
          <option value="" disabled>Select Health Check Rating</option>
          {Object.keys(HealthCheckRating).map((key) => {
            const value = HealthCheckRating[key as keyof typeof HealthCheckRating];
            console.log('val: ', value, '| key: ', key)
            if (typeof value === 'number') {
              return (
                <option key={key} value={value}>
                  {key}
                </option>
              );
            }
            return null; // Skip string values in the enum
          })}


        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default HealthCheckForm;

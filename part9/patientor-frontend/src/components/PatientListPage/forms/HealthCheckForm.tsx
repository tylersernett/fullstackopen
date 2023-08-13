import React, { Dispatch, SetStateAction } from "react";
import { HealthCheckRating } from "../../../types";

interface HealthCheckFormProps {
  healthCheckRating: HealthCheckRating | undefined;
  setHealthCheckRating: Dispatch<SetStateAction<HealthCheckRating>>;
}

const HealthCheckForm: React.FC<HealthCheckFormProps> = ({healthCheckRating, setHealthCheckRating} ) => {

  return (
    <>
      <label>
        Health Check Rating:
        <select
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(parseInt(e.target.value) as HealthCheckRating)}
        >
          <option value={undefined} disabled>Select Health Check Rating</option>
          {Object.keys(HealthCheckRating).map((key) => {
            const value = HealthCheckRating[key as keyof typeof HealthCheckRating];
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
    </>
  );
};

export default HealthCheckForm;

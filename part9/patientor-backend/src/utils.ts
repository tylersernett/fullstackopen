import { Diagnosis, NewPatient, Gender, EntryWithoutId, HealthCheckRating, OccupationalHealthcareEntry, HealthCheckEntry, HospitalEntry } from "./types";

const isNonEmptyString = (text: unknown): text is string => {
  return (typeof text === 'string' || text instanceof String) && text.trim().length > 0;
};
//the typeof operator will return 'string' for primitive string literals but will return 'object' for string objects created using the String constructor (new String('hello')). This is why a second check is necessary.
//"text is string" predicate: if function returns true, 'text' will be recognized as string in future

const parseName = (name: unknown): string => {
  if (!isNonEmptyString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};
const parseOccupation = (occupation: unknown): string => {
  if (!isNonEmptyString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};
const parseSsn = (ssn: unknown): string => {
  if (!isNonEmptyString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isNonEmptyString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};
const parseGender = (gender: unknown): Gender => {
  if (!isNonEmptyString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'occupation' in object && 'gender' in object && 'ssn' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
      entries: [],
    };

    return newPatient;
  };
  throw new Error('Incorrect data: some fields are missing');
}

//////////////////////////////////////////////////////////////////////////////////////////

function parseDate(date: unknown): string {
  if (!date || typeof date !== 'string') {
    throw new Error('Invalid date format');
  }
  return date;
}

function parseDescription(description: unknown): string {
  if (!description || typeof description !== 'string') {
    throw new Error('Invalid description');
  }
  return description;
}

function parseSpecialist(specialist: unknown): string {
  if (!specialist || typeof specialist !== 'string') {
    throw new Error('Invalid specialist');
  }
  return specialist;
}

function parseDischarge(discharge: unknown): HospitalEntry['discharge'] {
  if (!discharge || typeof discharge !== 'object' || Array.isArray(discharge)) {
    throw new Error('Invalid discharge format');
  }
  const { date, criteria } = discharge as { date: unknown; criteria: unknown };
  if (!date || typeof date !== 'string' || !criteria || typeof criteria !== 'string') {
    throw new Error('Invalid discharge properties');
  }
  return { date, criteria };
}

function parseEmployerName(employerName: unknown): OccupationalHealthcareEntry['employerName'] {
  if (!employerName || typeof employerName !== 'string') {
    throw new Error('Invalid employer name');
  }
  return employerName;
}

function parseSickLeave(sickLeave: unknown): OccupationalHealthcareEntry['sickLeave'] {
  if (!sickLeave || typeof sickLeave !== 'object' || Array.isArray(sickLeave)) {
    throw new Error('Invalid sick leave format');
  }
  const { startDate, endDate } = sickLeave as { startDate: unknown; endDate: unknown };
  if (!startDate || typeof startDate !== 'string' || !endDate || typeof endDate !== 'string') {
    throw new Error('Invalid sick leave properties');
  }
  return { startDate, endDate };
}

function parseHealthCheckRating(healthCheckRating: unknown): HealthCheckEntry['healthCheckRating'] {
  if (healthCheckRating === undefined || typeof healthCheckRating !== 'number') {
    throw new Error('Invalid health check rating');
  }
  if (healthCheckRating >= 0 && healthCheckRating <= 3) {
    return healthCheckRating as HealthCheckRating;
  } else {
    throw new Error('Invalid health check rating value');
  }
}

const parseDiagnosisCodes = (arr: unknown): Array<Diagnosis['code']> => {
  if (!Array.isArray(arr) || !arr.every(isNonEmptyString))
    throw new Error('Incorrect diagnosis codes');

  return arr;
};

export const toNewEntry = (obj: unknown): EntryWithoutId => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing entry data');
  }

  if (!('type' in obj && 'description' in obj && 'date' in obj && 'specialist' in obj)) {
    throw new Error('Missing entry data fields');
  }

  const commonEntry = {
    description: parseDescription(obj.description),
    date: parseDate(obj.date),
    specialist: parseSpecialist(obj.specialist),
    diagnosisCodes: 'diagnosisCodes' in obj ? parseDiagnosisCodes(obj.diagnosisCodes) : undefined
  };

  switch (obj.type) {
    case 'HealthCheck':
      if (!('healthCheckRating' in obj)) throw new Error('Missing health check rating field');

      return {
        ...commonEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
      };
    case 'Hospital':
      if (!('discharge' in obj)) throw new Error('Missing discharge field');

      return {
        ...commonEntry,
        type: 'Hospital',
        discharge: parseDischarge(obj.discharge)
      };
    case 'OccupationalHealthcare':
      if (!('employerName' in obj)) throw new Error('Missing employer name field');

      return {
        ...commonEntry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(obj.employerName),
        sickLeave: 'sickLeave' in obj ? parseSickLeave(obj.sickLeave) : undefined
      };
    default:
      throw new Error('Invalid entry type');
  }
};

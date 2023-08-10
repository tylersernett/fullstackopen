import { NewPatient, Gender } from "./types";

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

const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'occupation' in object && 'gender' in object && 'ssn' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
    };

    return newPatient;
  };
  throw new Error('Incorrect data: some fields are missing');
}

export default toNewPatient
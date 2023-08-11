import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid'

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientInfo = (id: string): Patient | Error => {
  const foundPatient = patients.find(patient => patient.id === id)
  if (foundPatient !== undefined) {
    return foundPatient
  } else {
    throw new Error("Error finding patient id");
  }
}

const addPatient = (patient: NewPatient): Patient => {

  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatients,
  getPatientInfo
};
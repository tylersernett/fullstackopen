import patients from '../../data/patients';
import { Patient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient
};
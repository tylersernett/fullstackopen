import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(patientService.getPatientInfo(id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body); //perform validation here
    const addedPatient = patientService.addPatient(newPatient);

    //code before using validation:
    // const { name, dateOfBirth, gender, occupation, ssn } = req.body;
    // const addedPatient = patientService.addPatient({
    //   name,
    //   dateOfBirth,
    //   gender,
    //   occupation,
    //   ssn
    // });
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
})

router.post('/:id/entries', (req, res) => {
  try {
    const { id } = req.params;
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).send(errorMessage);
  }
});


export default router;
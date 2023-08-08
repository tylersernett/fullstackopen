//hours: 11pm-

import express from 'express';
import { getBmi } from './bmiCalculator';
import { calculateExercises, ExHours } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height as string;
  const weight = req.query.weight as string;

  const bmiResult = getBmi(Number(height), Number(weight));

  if ('error' in bmiResult) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else {
    res.json(bmiResult);
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) 
  || daily_exercises.some(val => typeof val !== 'number')
  || typeof target !== 'number' ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const exerciseResult = calculateExercises(daily_exercises as ExHours, Number(target));

  return res.send(exerciseResult);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
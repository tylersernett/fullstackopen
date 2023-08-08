import express from 'express';
import { getBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height as string;
  const weight = req.query.weight as string;

  const bmiResult = getBmi(height, weight);

  if ('error' in bmiResult) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else {
    res.json(bmiResult);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
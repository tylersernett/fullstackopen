interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: number[], target: number): ExerciseResult => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(hours => hours > 0).length;
  const totalHours = exerciseHours.reduce((acc, hours) => acc + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = 'bad';
  if (average >= target) {
    rating = 3;
    ratingDescription = 'good';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const exerciseHours: number[] = [3, 0, 2, 4.5, 0, 3, 1];
const target: number = 2;
const result = calculateExercises(exerciseHours, target);
console.log(result);

export default calculateExercises;

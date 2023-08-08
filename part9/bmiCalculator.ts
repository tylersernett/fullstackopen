interface BMIResponse {
  weight: number;
  height: number;
  bmi: string;
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height/100 * height/100);
  console.log(height, weight, bmi);

  if (bmi < 16) return 'Underweight';
  else if (bmi >= 16 && bmi < 25) return 'Normal (healthy weight)';
  else if (bmi >= 25 && bmi < 30) return 'Overweight';
  else return 'Obese';
};

// if (process.argv.length !== 4) {
//   console.log("Please provide exactly two arguments: height and weight.");
//   process.exit(1);
// }

export const getBmi = (height: number, weight: number): BMIResponse | { error: string } => {

  if (isNaN(height) || isNaN(weight)) {
    return { error: 'malformatted parameters' };
  }

  const bmiResult = calculateBmi(height, weight);

  return {
    weight: weight,
    height: height,
    bmi: bmiResult,
  };
};
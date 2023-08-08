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

export const getBmi = (height: string, weight: string): BMIResponse | { error: string } => {
  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);

  if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
    return { error: 'malformatted parameters' };
  }

  const bmiResult = calculateBmi(parsedHeight, parsedWeight);

  return {
    weight: parsedWeight,
    height: parsedHeight,
    bmi: bmiResult,
  };
};
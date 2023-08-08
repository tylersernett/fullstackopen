const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height * height)
  console.log(height, weight, bmi)

  if (bmi < 16) return 'Underweight'
  else if (bmi >= 16 && bmi < 25) return 'Normal (healthy weight)'
  else if (bmi >= 25 && bmi < 30) 'Overweight'
  else return 'Obese'
}

if (process.argv.length !== 4) {
  console.log("Please provide exactly two arguments: height and weight.");
  process.exit(1);
}

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

const bmi = calculateBmi(height, weight);
console.log(bmi);
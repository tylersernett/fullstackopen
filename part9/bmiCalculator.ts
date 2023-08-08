const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height * height)

  if (bmi < 16) return 'Underweight'
  else if (bmi >= 16 && bmi < 25) return 'Normal (healthy weight)'
  else if (bmi >= 25 && bmi < 30) 'Overweight'
  else return 'Obese'
}

console.log(calculateBmi(180, 74))
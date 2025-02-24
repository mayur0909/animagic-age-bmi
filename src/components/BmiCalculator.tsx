
import React, { useState, useEffect } from 'react';
import { Slider } from './ui/slider';
import { Card } from './ui/card';
import { Label } from './ui/label';

const BmiCalculator = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(parseFloat(bmiValue.toFixed(1)));

    if (bmiValue < 18.5) setCategory('Underweight');
    else if (bmiValue < 25) setCategory('Normal weight');
    else if (bmiValue < 30) setCategory('Overweight');
    else setCategory('Obese');
  };

  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

  const getBmiColor = () => {
    if (bmi < 18.5) return 'text-blue-500';
    if (bmi < 25) return 'text-green-500';
    if (bmi < 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base">Height (cm)</Label>
          <Slider
            value={[height]}
            onValueChange={(value) => setHeight(value[0])}
            min={140}
            max={220}
            step={1}
            className="mt-2"
          />
          <div className="text-right text-sm text-gray-600">{height} cm</div>
        </div>

        <div className="space-y-4">
          <Label className="text-base">Weight (kg)</Label>
          <Slider
            value={[weight]}
            onValueChange={(value) => setWeight(value[0])}
            min={40}
            max={150}
            step={1}
            className="mt-2"
          />
          <div className="text-right text-sm text-gray-600">{weight} kg</div>
        </div>
      </div>

      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="text-4xl font-bold">
            <span className={getBmiColor()}>{bmi}</span>
          </div>
          <div className="text-gray-600">
            Your BMI indicates:
            <span className={`font-semibold ${getBmiColor()} ml-2`}>
              {category}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BmiCalculator;

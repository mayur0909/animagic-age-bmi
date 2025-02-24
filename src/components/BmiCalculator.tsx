
import React, { useState, useEffect } from 'react';
import { Slider } from './ui/slider';
import { Card } from './ui/card';
import { Label } from './ui/label';

const BmiCalculator = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setIsAnimating(true);
    setTimeout(() => {
      setBmi(parseFloat(bmiValue.toFixed(1)));
      setIsAnimating(false);
    }, 300);

    if (bmiValue < 18.5) setCategory('Underweight');
    else if (bmiValue < 25) setCategory('Normal weight');
    else if (bmiValue < 30) setCategory('Overweight');
    else setCategory('Obese');
  };

  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

  const getBmiColor = () => {
    if (bmi < 18.5) return 'from-blue-500 to-blue-600';
    if (bmi < 25) return 'from-green-500 to-green-600';
    if (bmi < 30) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getBmiTextColor = () => {
    if (bmi < 18.5) return 'text-blue-500';
    if (bmi < 25) return 'text-green-500';
    if (bmi < 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-4">
          <Label className="text-base font-medium text-gray-700">Height (cm)</Label>
          <div className="relative pt-6">
            <Slider
              value={[height]}
              onValueChange={(value) => setHeight(value[0])}
              min={140}
              max={220}
              step={1}
              className="mt-2"
            />
            <div className="absolute top-0 right-0 text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 text-white px-3 py-1 rounded-full transform -translate-y-2">
              {height} cm
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium text-gray-700">Weight (kg)</Label>
          <div className="relative pt-6">
            <Slider
              value={[weight]}
              onValueChange={(value) => setWeight(value[0])}
              min={40}
              max={150}
              step={1}
              className="mt-2"
            />
            <div className="absolute top-0 right-0 text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 text-white px-3 py-1 rounded-full transform -translate-y-2">
              {weight} kg
            </div>
          </div>
        </div>
      </div>

      <Card className="p-8 bg-white/90 backdrop-blur-sm border border-gray-100 transform hover:scale-[1.02] transition-all duration-300">
        <div className="text-center space-y-6 animate-fade-in">
          <div className={`text-6xl font-bold transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            <span className={`bg-gradient-to-r ${getBmiColor()} bg-clip-text text-transparent`}>
              {bmi}
            </span>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600 text-lg">
              Your BMI indicates:
            </p>
            <p className={`text-xl font-semibold ${getBmiTextColor()} transition-all duration-300`}>
              {category}
            </p>
          </div>
        </div>
      </Card>

      <div className="pt-4">
        <div className="h-2 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full opacity-75" />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>Underweight</span>
          <span>Normal</span>
          <span>Overweight</span>
          <span>Obese</span>
        </div>
      </div>
    </div>
  );
};

export default BmiCalculator;

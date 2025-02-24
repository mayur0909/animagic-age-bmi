
import React, { useState, useEffect } from 'react';
import { Slider } from './ui/slider';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const BmiCalculator = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [gender, setGender] = useState('male');

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

  const handleHeightInput = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 140 && numValue <= 220) {
      setHeight(numValue);
    }
  };

  const handleWeightInput = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 40 && numValue <= 150) {
      setWeight(numValue);
    }
  };

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
          <Label className="text-base font-medium text-gray-700">Gender</Label>
          <RadioGroup
            defaultValue="male"
            value={gender}
            onValueChange={setGender}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="cursor-pointer">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="cursor-pointer">Female</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium text-gray-700">Height (cm)</Label>
          <div className="relative pt-6">
            <div className="flex items-center space-x-4 mb-4">
              <Input
                type="number"
                value={height}
                onChange={(e) => handleHeightInput(e.target.value)}
                min={140}
                max={220}
                className="w-24"
              />
              <span className="text-sm text-gray-500">cm</span>
            </div>
            <Slider
              value={[height]}
              onValueChange={(value) => setHeight(value[0])}
              min={140}
              max={220}
              step={1}
              className="mt-2"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium text-gray-700">Weight (kg)</Label>
          <div className="relative pt-6">
            <div className="flex items-center space-x-4 mb-4">
              <Input
                type="number"
                value={weight}
                onChange={(e) => handleWeightInput(e.target.value)}
                min={40}
                max={150}
                className="w-24"
              />
              <span className="text-sm text-gray-500">kg</span>
            </div>
            <Slider
              value={[weight]}
              onValueChange={(value) => setWeight(value[0])}
              min={40}
              max={150}
              step={1}
              className="mt-2"
            />
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
          <div className="text-sm text-gray-500">
            Gender: {gender.charAt(0).toUpperCase() + gender.slice(1)}
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

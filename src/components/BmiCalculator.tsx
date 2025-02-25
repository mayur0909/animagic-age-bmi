
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
    let bmiValue = weight / (heightInMeters * heightInMeters);

    // Apply gender-specific adjustments
    if (gender === 'female') {
      // Women naturally have more body fat, so BMI is adjusted slightly
      bmiValue = bmiValue * 0.95;
    }

    setIsAnimating(true);
    setTimeout(() => {
      setBmi(parseFloat(bmiValue.toFixed(1)));
      setIsAnimating(false);
    }, 300);

    // Gender-specific BMI categories
    if (gender === 'female') {
      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue < 24) setCategory('Normal weight');
      else if (bmiValue < 29) setCategory('Overweight');
      else setCategory('Obese');
    } else {
      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue < 25) setCategory('Normal weight');
      else if (bmiValue < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  useEffect(() => {
    calculateBMI();
  }, [height, weight, gender]); // Added gender as dependency

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
    if (gender === 'female' ? bmi < 24 : bmi < 25) return 'from-green-500 to-green-600';
    if (gender === 'female' ? bmi < 29 : bmi < 30) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getBmiTextColor = () => {
    if (bmi < 18.5) return 'text-blue-500';
    if (gender === 'female' ? bmi < 24 : bmi < 25) return 'text-green-500';
    if (gender === 'female' ? bmi < 29 : bmi < 30) return 'text-yellow-500';
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
            className="flex gap-6"
          >
            <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md cursor-pointer group">
              <RadioGroupItem value="male" id="male" />
              <Label 
                htmlFor="male" 
                className="cursor-pointer text-gray-700 font-medium group-hover:text-purple-600 transition-colors"
              >
                Male
              </Label>
            </div>
            <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md cursor-pointer group">
              <RadioGroupItem value="female" id="female" />
              <Label 
                htmlFor="female" 
                className="cursor-pointer text-gray-700 font-medium group-hover:text-purple-600 transition-colors"
              >
                Female
              </Label>
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
                className="w-24 hover:border-purple-400 focus:border-purple-500 transition-colors"
              />
              <span className="text-sm text-gray-500">cm</span>
            </div>
            <div className="relative">
              <Slider
                value={[height]}
                onValueChange={(value) => setHeight(value[0])}
                min={140}
                max={220}
                step={1}
                className="mt-2"
              />
              <div className="absolute -top-6 left-0 right-0 flex justify-between text-xs text-gray-500">
                <span>140</span>
                <span>180</span>
                <span>220</span>
              </div>
            </div>
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
                className="w-24 hover:border-purple-400 focus:border-purple-500 transition-colors"
              />
              <span className="text-sm text-gray-500">kg</span>
            </div>
            <div className="relative">
              <Slider
                value={[weight]}
                onValueChange={(value) => setWeight(value[0])}
                min={40}
                max={150}
                step={1}
                className="mt-2"
              />
              <div className="absolute -top-6 left-0 right-0 flex justify-between text-xs text-gray-500">
                <span>40</span>
                <span>95</span>
                <span>150</span>
              </div>
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

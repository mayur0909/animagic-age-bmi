
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import AgeCalculator from './AgeCalculator';
import BmiCalculator from './BmiCalculator';

const Calculator = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center text-4xl font-semibold mb-8 animate-fade-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
            Age & BMI Calculator
          </span>
        </h1>
        
        <Card className="overflow-hidden backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <Tabs defaultValue="age" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="age" className="text-lg">Age Calculator</TabsTrigger>
              <TabsTrigger value="bmi" className="text-lg">BMI Calculator</TabsTrigger>
            </TabsList>
            <TabsContent value="age" className="mt-6">
              <AgeCalculator />
            </TabsContent>
            <TabsContent value="bmi" className="mt-6">
              <BmiCalculator />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Calculator;

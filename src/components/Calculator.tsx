
import React from 'react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import AgeCalculator from './AgeCalculator';
import BmiCalculator from './BmiCalculator';

const Calculator = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center text-4xl font-semibold mb-8 animate-fade-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Age & BMI Calculator
          </span>
        </h1>
        
        <Card className="overflow-hidden backdrop-blur-sm bg-white/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
          <Tabs defaultValue="age" className="w-full">
            <TabsList className="w-full grid grid-cols-2 p-1 gap-1 bg-gray-100/50">
              <TabsTrigger 
                value="age" 
                className="text-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                Age Calculator
              </TabsTrigger>
              <TabsTrigger 
                value="bmi" 
                className="text-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                BMI Calculator
              </TabsTrigger>
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

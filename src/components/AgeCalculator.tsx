
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState<Date>();
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateAge = () => {
    if (!birthDate) return;
    setIsCalculating(true);

    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += 30;
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setTimeout(() => {
      setAge({ years, months, days });
      setIsCalculating(false);
    }, 500);
  };

  const AgeDisplay = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center p-4 bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
      <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 animate-number-count">
        {value}
      </span>
      <span className="text-sm text-gray-600 mt-2 font-medium">{label}</span>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-6">
        <div className="animate-fade-in">
          <Label className="text-base font-medium text-gray-700">Select your birth date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full mt-2 justify-start text-left font-normal hover:border-purple-400 transition-colors group"
              >
                <Calendar className="mr-2 h-4 w-4 group-hover:text-purple-500 transition-colors" />
                {birthDate ? (
                  <span className="text-gray-700">{format(birthDate, 'PPP')}</span>
                ) : (
                  <span className="text-gray-400">Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={birthDate}
                onSelect={setBirthDate}
                initialFocus
                className="rounded-lg border-0 shadow-lg"
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button 
          className={`w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02] ${isCalculating ? 'animate-pulse' : ''}`}
          onClick={calculateAge}
          disabled={!birthDate || isCalculating}
        >
          Calculate Age
        </Button>

        {age && (
          <Card className="mt-6 p-6 bg-white/90 backdrop-blur-sm animate-fade-in border border-gray-100">
            <div className="grid grid-cols-3 gap-4">
              <AgeDisplay value={age.years} label="Years" />
              <AgeDisplay value={age.months} label="Months" />
              <AgeDisplay value={age.days} label="Days" />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;

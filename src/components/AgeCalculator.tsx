
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

  const calculateAge = () => {
    if (!birthDate) return;

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

    setAge({ years, months, days });
  };

  const AgeDisplay = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg animate-fade-in">
      <span className="text-3xl font-bold text-gray-800 animate-number-count">
        {value}
      </span>
      <span className="text-sm text-gray-600 mt-1">{label}</span>
    </div>
  );

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <Label className="text-base">Select your birth date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full mt-2 justify-start text-left font-normal"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {birthDate ? format(birthDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={birthDate}
                onSelect={setBirthDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button 
          className="w-full"
          onClick={calculateAge}
          disabled={!birthDate}
        >
          Calculate Age
        </Button>

        {age && (
          <Card className="mt-6 p-6 bg-white/50 backdrop-blur-sm animate-fade-in">
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

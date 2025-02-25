
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';

const BmiCalculator = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('male');

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    let bmiValue = weight / (heightInMeters * heightInMeters);

    if (gender === 'female') {
      bmiValue = bmiValue * 0.95;
    }

    setBmi(parseFloat(bmiValue.toFixed(1)));

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
  }, [height, weight, gender]);

  const getBmiColor = () => {
    if (bmi < 18.5) return '#3B82F6';
    if (gender === 'female' ? bmi < 24 : bmi < 25) return '#22C55E';
    if (gender === 'female' ? bmi < 29 : bmi < 30) return '#EAB308';
    return '#EF4444';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.genderContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderButtons}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === 'male' && styles.genderButtonSelected
              ]}
              onPress={() => setGender('male')}
            >
              <Text style={[
                styles.genderButtonText,
                gender === 'male' && styles.genderButtonTextSelected
              ]}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === 'female' && styles.genderButtonSelected
              ]}
              onPress={() => setGender('female')}
            >
              <Text style={[
                styles.genderButtonText,
                gender === 'female' && styles.genderButtonTextSelected
              ]}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Height (cm)</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={height.toString()}
              onChangeText={(text) => {
                const value = parseInt(text);
                if (!isNaN(value) && value >= 140 && value <= 220) {
                  setHeight(value);
                }
              }}
              keyboardType="numeric"
            />
            <Text style={styles.unit}>cm</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={140}
            maximumValue={220}
            value={height}
            onValueChange={setHeight}
            minimumTrackTintColor="#8B5CF6"
            maximumTrackTintColor="#E5E7EB"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>140</Text>
            <Text style={styles.sliderLabel}>180</Text>
            <Text style={styles.sliderLabel}>220</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight (kg)</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={weight.toString()}
              onChangeText={(text) => {
                const value = parseInt(text);
                if (!isNaN(value) && value >= 40 && value <= 150) {
                  setWeight(value);
                }
              }}
              keyboardType="numeric"
            />
            <Text style={styles.unit}>kg</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={40}
            maximumValue={150}
            value={weight}
            onValueChange={setWeight}
            minimumTrackTintColor="#8B5CF6"
            maximumTrackTintColor="#E5E7EB"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>40</Text>
            <Text style={styles.sliderLabel}>95</Text>
            <Text style={styles.sliderLabel}>150</Text>
          </View>
        </View>

        <View style={styles.resultCard}>
          <Text style={[styles.bmiValue, { color: getBmiColor() }]}>{bmi}</Text>
          <Text style={styles.categoryLabel}>Your BMI indicates:</Text>
          <Text style={[styles.categoryText, { color: getBmiColor() }]}>
            {category}
          </Text>
          <Text style={styles.genderInfo}>
            Gender: {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </Text>
        </View>

        <View style={styles.scaleContainer}>
          <View style={styles.scaleBar}>
            <View style={[styles.scaleSegment, { backgroundColor: '#3B82F6' }]} />
            <View style={[styles.scaleSegment, { backgroundColor: '#22C55E' }]} />
            <View style={[styles.scaleSegment, { backgroundColor: '#EAB308' }]} />
            <View style={[styles.scaleSegment, { backgroundColor: '#EF4444' }]} />
          </View>
          <View style={styles.scaleLabels}>
            <Text style={styles.scaleLabel}>Underweight</Text>
            <Text style={styles.scaleLabel}>Normal</Text>
            <Text style={styles.scaleLabel}>Overweight</Text>
            <Text style={styles.scaleLabel}>Obese</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 20,
  },
  genderContainer: {
    marginBottom: 24,
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  genderButtonSelected: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  genderButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  genderButtonTextSelected: {
    color: 'white',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'white',
    marginRight: 8,
    textAlign: 'center',
  },
  unit: {
    fontSize: 14,
    color: '#6B7280',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginVertical: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  genderInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  scaleContainer: {
    marginTop: 16,
  },
  scaleBar: {
    height: 8,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
  },
  scaleSegment: {
    flex: 1,
    height: '100%',
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  scaleLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default BmiCalculator;

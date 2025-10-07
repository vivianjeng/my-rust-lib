import { Text, View, StyleSheet } from 'react-native';
import {
  Calculator,
  type BinaryOperator,
  SafeAddition,
  ComputationResult,
  greet,
} from 'my-rust-lib';
import { useEffect, useState } from 'react';

// A Rust object
const calculator = new Calculator();
// A Rust object implementing the Rust trait BinaryOperator
const addOp = new SafeAddition();

// A Typescript class, implementing BinaryOperator
class SafeMultiply implements BinaryOperator {
  perform(lhs: bigint, rhs: bigint): bigint {
    return lhs * rhs;
  }
}
const multOp = new SafeMultiply();

// bigints
const three = 3n;
const seven = 7n;

// Perform the calculation, and to get an object
// representing the computation result.
const computation: ComputationResult = calculator
  .calculate(addOp, three, three)
  .calculateMore(multOp, seven)
  .lastResult()!;

// Unpack the bigint value into a string.
const result = computation.value.toString();

export default function App() {
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    setGreeting(greet('Vivian'));
  }, []);
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Text>Greeting: {greeting}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

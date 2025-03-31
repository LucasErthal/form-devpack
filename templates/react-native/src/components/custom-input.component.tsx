import { Text, TextInput, TextInputProps, View, StyleSheet } from 'react-native';

export type CustomInputProps = TextInputProps & {
  label: string;
  error?: string;
  onChangeText?: (text: string) => void;
};

export function CustomInput({ label, error, onChangeText, ...rest }: CustomInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} onChangeText={onChangeText} {...rest} />
      {error && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#000000',
  },
  label: {
    fontSize: 16,
    color: '#000000',
  },
});

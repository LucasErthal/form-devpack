import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

export type CustomInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string;
  error?: string;
  onChangeText?: (text: string) => void;
};

export function CustomInput({ label, error, onChangeText, ...rest }: CustomInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeText) {
      onChangeText(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        onChange={handleChange}
        {...rest}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

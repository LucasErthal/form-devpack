import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { CustomInput, CustomInputProps } from '../custom-input.component';
import styles from './styles.module.css';

type ControlledInputProps<T extends FieldValues> = CustomInputProps & {
  control: Control<T>;
  name: Path<T>;
  label: string;
  errors?: any;
};

export function ControlledInput<T extends FieldValues>({
  control,
  name,
  errors,
  ...rest
}: ControlledInputProps<T>) {

  return (
    <div className={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, ref, ...field } }) => (
          <CustomInput
            onChangeText={onChange}
            error={errors?.[name]?.message}
            {...field}
            {...rest}
          />
        )}
      />
    </div>
  );
}
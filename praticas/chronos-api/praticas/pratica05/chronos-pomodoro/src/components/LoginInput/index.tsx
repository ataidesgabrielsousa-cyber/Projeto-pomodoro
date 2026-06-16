import { forwardRef } from 'react';
import styles from './styles.module.css';

type LoginInputProps = {
  id: string;
  labelText: string;
} & React.ComponentProps<'input'>;

export const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(
  ({ id, labelText, ...rest }, ref) => {
    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={id}>
          {labelText}
        </label>
        <input className={styles.input} id={id} ref={ref} {...rest} />
      </div>
    );
  },
);

LoginInput.displayName = 'LoginInput';

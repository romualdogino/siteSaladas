import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(function Input(
  {
    label,
    placeholder,
    className,
    htmlType,
    autoComplete,
    size,
    ariaLabel,
    valueA,
    required,
    min,
    max,
    step,
  },
  ref
) {
  return (
    <div className={clsx(styles.root, className)}>
      <label>
        {label && <div className={styles.label}>{label}</div>}
        <input
          type={htmlType}
          autoComplete={autoComplete}
          placeholder={placeholder}
          ref={ref}
          className={clsx(styles.input, size && styles[size])}
          aria-label={ariaLabel}
          required={required}
          min={min}
          max={max}
          value={valueA}
          step={step}
        />
      </label>
    </div>
  );
});

export default Input;

import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './Input.module.css';

const Select = forwardRef(function Select(
    {
        label,
        placeholder,
        className,
        htmlType,
        autoComplete,
        ariaLabel,
        required,
        data,
        firstOption
    },
    ref,
) {
    return (
        <div className={clsx(styles.root, className)}>
            <label>
                {label && <div className={styles.label}>{label}</div>}
                <select
                    type={htmlType}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    ref={ref}
                    className={clsx(styles.textarea)}
                    aria-label={ariaLabel}
                    required={required}
                >
                    <option value="0" defaultValue>{ firstOption }</option>
                    {data.map((e) => {
                        return (<option key={e._id} value={e._id}>{e.nome}</option>)
                    })}
                    {/* {console.log(data[0]._id)} */}

                </select>
            </label>
        </div>
    );
});

export default Select;

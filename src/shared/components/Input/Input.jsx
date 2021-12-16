import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './Input.module.css';

const id = nanoid();

const Input = props => {
  const { labelName, value, onChange, type, name, pattern, title, placeholderValue } = props;

  return (
    <div className={name === 'filter' ? styles.filterComponent : styles.formComponent}>
      <label htmlFor={id} className={styles.formLabel}>
        {labelName}:
      </label>
      <input
        className={styles.formInput}
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        pattern={pattern}
        title={title}
        placeholder={placeholderValue}
      />
    </div>
  );
};
export default Input;

Input.defaultProps = {
  type: 'text',
  placeholder: undefined,
};

Input.propTypes = {
  labelName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
};

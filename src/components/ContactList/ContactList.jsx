import PropTypes from 'prop-types';
import toonavatar from 'cartoon-avatar';
import styles from './ContactList.module.css';

import Button from '../../shared/components/Button';

const ContactList = ({ contacts, onDeleteItem }) => {
  return (
    <ul className={styles.contactList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={styles.contactItem}>
          <img
            src={toonavatar.generate_avatar()}
            alt="img"
            width="60"
            className={styles.contactImg}
          />
          <div>
            <p>{name}:</p>
            <p>{number}</p>
          </div>

          <Button type="button" text="&#128473;" onClick={() => onDeleteItem(id)} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteItem: PropTypes.func.isRequired,
};

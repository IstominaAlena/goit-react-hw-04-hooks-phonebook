import PropTypes from 'prop-types';
import styles from './Section.module.css';

const Section = ({ title, children, classEl }) => {
  return (
    <section className={styles[classEl]}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.forChildrens}>{children}</div>
      </div>
    </section>
  );
};

export default Section;

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

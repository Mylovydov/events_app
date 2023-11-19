import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './spinner.module.css';

const Spinner = () => (
	<span className={styles.spinner}>
		<FontAwesomeIcon icon="spinner" spinPulse />
	</span>
);

export default Spinner;

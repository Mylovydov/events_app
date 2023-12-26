import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './spinner.module.css';

const Spinner = () => (
	<div className={styles.spinnerWrapper}>
		<span className={styles.spinner}>
			<FontAwesomeIcon icon="spinner" spinPulse />
		</span>
	</div>
);

export default Spinner;

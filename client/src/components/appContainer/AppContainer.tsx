import { FC, PropsWithChildren } from 'react';
import styles from './appContainer.module.css';

const AppContainer: FC<PropsWithChildren> = ({ children }) => (
	<div className={styles.appContainer}>{children}</div>
);

export default AppContainer;

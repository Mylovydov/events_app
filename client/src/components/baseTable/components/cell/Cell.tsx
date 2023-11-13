import styles from './cell.module.css';
import { FC, PropsWithChildren } from 'react';

const Cell: FC<PropsWithChildren> = ({ children }) => {
	return <th className={styles.cell}>{children}</th>;
};

export default Cell;

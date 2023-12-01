import styles from './card.module.css';
import { FC, PropsWithChildren } from 'react';

const Card: FC<PropsWithChildren> = ({ children }) => (
	<div className={styles.card}>{children}</div>
);

export default Card;

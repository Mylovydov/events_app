import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styles from './error.page.module.css';
import Error404Img from '@/assets/img/404.svg?react';
import ErrorImg from '@/assets/img/error.svg?react';
import { Typography } from '@/components';

const ErrorPage = () => {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		const imgMarkup = error.status === 404 ? <Error404Img /> : <ErrorImg />;

		return (
			<section className={styles.errorPage}>
				<div className={styles.errorImg}>{imgMarkup}</div>
				<div className={styles.errorBody}>
					<Typography
						text={error.statusText}
						variant="h2"
						weight="bold"
						textAlign="center"
					/>
				</div>
			</section>
		);
	}

	return (
		<section className={styles.errorPage}>
			<div className={styles.errorImg}>
				<ErrorImg />
			</div>
			<div className={styles.errorBody}>
				<Typography
					text="Oops!"
					variant="h2"
					weight="bold"
					textAlign="center"
				/>
				<Typography
					textAlign="center"
					text="Something went wrong"
					variant="h4"
				/>
			</div>
		</section>
	);
};

export default ErrorPage;

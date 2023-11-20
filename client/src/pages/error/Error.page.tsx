import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const error = useRouteError();
	return <section>{JSON.stringify(error)}</section>;
};

export default ErrorPage;

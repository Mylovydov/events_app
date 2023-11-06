import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const error = useRouteError();
	return <div>{JSON.stringify(error)}</div>;
};

export default ErrorPage;

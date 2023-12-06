const isAuthEndpoint = (endpoint: string) =>
	endpoint === 'login' || endpoint === 'register' || endpoint === 'refresh';

export default isAuthEndpoint;

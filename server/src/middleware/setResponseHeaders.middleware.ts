import { NextFunction, Request, Response } from 'express';

export type TResponseHeaders = { [key: string]: string };

const setResponseHeaders = (headers: TResponseHeaders = {}) => {
	const baseHeaders = {
		'Access-Control-Request-Method': '*',
		'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, DELETE',
		'Access-Control-Allow-Headers': '*'
	};

	return (_: Request, res: Response, next: NextFunction) => {
		Object.entries({ ...baseHeaders, ...headers }).forEach(([key, value]) =>
			res.set(key, value)
		);
		next();
	};
};

export default setResponseHeaders;

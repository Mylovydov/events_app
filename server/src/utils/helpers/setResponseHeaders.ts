import express, { NextFunction } from 'express';

export type TResponseHeaders = { [key: string]: string };

const setResponseHeaders = (headers: TResponseHeaders) => {
	return (_: express.Request, res: express.Response, next: NextFunction) => {
		Object.entries(headers).forEach(([key, value]) => res.set(key, value));
		next();
	};
};

export default setResponseHeaders;

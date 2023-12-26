import * as jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
	export type UserIDJwtPayload = {
		userId: string;
	} & jwt.JwtPayload;
}

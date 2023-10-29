import * as jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
	export interface UserIDJwtPayload extends jwt.JwtPayload {
		userId: string;
	}
}

// declare module 'convert-csv-to-json' {
// 	export interface ConvertCsvToJson extends convert.ConvertCsvToJson {}
// }

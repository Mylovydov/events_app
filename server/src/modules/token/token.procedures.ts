import { publicProcedure } from '../../trpc/index.js';
import {
	generateTokenPairInput,
	generateTokenPairOutput
} from './token.dto.js';
import { authResponseExample } from '../../utils/index.js';

const tokenProcedures = {
	generateTokenPair: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/token/generate',
				tags: ['token'],
				summary: 'Generate token pair for user',
				example: {
					request: {
						userId: '60f1b2b0-0b7a-4e1a-9b0a-0b9e2b7b3b1b'
					},
					response: authResponseExample
				}
			}
		})
		.input(generateTokenPairInput)
		.output(generateTokenPairOutput)
};

export default tokenProcedures;

import { publicProcedure } from '../../trpc/index.js';
import {
	generateTokenPairInput,
	generateTokenPairOutput
} from './token.dto.js';

const tokenProcedures = {
	generateTokenPair: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/token/generate',
				tags: ['token'],
				summary: 'Generate token pair for user'
			}
		})
		.input(generateTokenPairInput)
		.output(generateTokenPairOutput)
};

export default tokenProcedures;

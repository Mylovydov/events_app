import { publicProcedure } from '../../trpc/index.js';
import { default as tokenService } from './token.service.js';

import {
	generateTokenPairInput,
	generateTokenPairOutput
} from './token.dto.js';

const tokenController = {
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
		.mutation(async ({ input }) => {
			return await tokenService.generateTokens(input);
		})
};

export default tokenController;

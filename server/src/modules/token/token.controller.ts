import { default as tokenService } from './token.service.js';
import tokenProcedures from './token.procedures.js';

const tokenController = {
	generateTokenPair: tokenProcedures.generateTokenPair.mutation(
		async ({ input }) => {
			return await tokenService.generateTokens(input);
		}
	)
};

export default tokenController;

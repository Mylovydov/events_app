import { default as tokenService } from './token.service';
import tokenProcedures from './token.procedures';

const tokenController = {
	generateTokenPair: tokenProcedures.generateTokenPair.mutation(
		async ({ input }) => {
			return await tokenService.generateTokens(input);
		}
	)
};

export default tokenController;

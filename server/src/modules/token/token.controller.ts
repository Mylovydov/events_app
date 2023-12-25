import { default as tokenService } from './token.service';
import tokenProcedures from './token.procedures';
import { generateTokenPairInput, generateTokenPairOutput } from './token.dto';

const tokenController = {
	generateTokenPair: tokenProcedures.generateTokenPair
		.input(generateTokenPairInput)
		.output(generateTokenPairOutput)
		.mutation(async ({ input }) => {
			return await tokenService.generateTokens(input);
		})
};

export default tokenController;

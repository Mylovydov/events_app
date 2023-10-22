import { router } from '../trpc/index.js';
import { tokenController } from '../modules/token/index.js';

export const tokenRouter = router({
	generateTokenPair: tokenController.generateTokenPair
});

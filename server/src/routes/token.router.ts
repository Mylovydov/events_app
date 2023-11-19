import { router } from '../trpc/index.js';
import { tokenController } from '../modules/index.js';

const tokenRouter = router({
	generateTokenPair: tokenController.generateTokenPair
});

export default tokenRouter;

import { router } from '../trpc';
import { tokenController } from '../modules';

const tokenRouter = router({
	generateTokenPair: tokenController.generateTokenPair
});

export default tokenRouter;

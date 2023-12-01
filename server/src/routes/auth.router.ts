import { router } from '../trpc/index.js';
import { authController } from '../modules/index.js';

const authRouter = router({
	register: authController.register,
	login: authController.login,
	logout: authController.logout,
	refresh: authController.refresh
});

export default authRouter;

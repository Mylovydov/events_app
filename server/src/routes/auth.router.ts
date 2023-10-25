import { router } from '../trpc/index.js';
import authController from '../modules/auth/auth.controller.js';

const authRouter = router({
	register: authController.register,
	login: authController.login,
	logout: authController.logout,
	check: authController.refresh
});

export default authRouter;

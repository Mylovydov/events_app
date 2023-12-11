import { router } from '../trpc';
import { authController } from '../modules';

const authRouter = router({
	register: authController.register,
	login: authController.login,
	logout: authController.logout,
	refresh: authController.refresh
});

export default authRouter;

import { router } from '../trpc/index.js';
import userController from '../modules/user/user.controller.js';

export const userRouter = router({
	create: userController.create,
	get: userController.get,
	update: userController.update,
	delete: userController.delete
});

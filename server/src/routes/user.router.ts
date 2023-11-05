import { router } from '../trpc/index.js';
import userController from '../modules/user/user.controller.js';

const userRouter = router({
	create: userController.create,
	getUser: userController.getUser,
	getUsers: userController.getUsers,
	update: userController.update,
	delete: userController.delete,
	addSmtpSettings: userController.addSmtpSettings,
	addAppSettings: userController.addAppSettings
});

export default userRouter;

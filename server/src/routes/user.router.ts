import { router } from '../trpc/index.js';
import { userController } from '../modules/index.js';

const userRouter = router({
	create: userController.create,
	getUser: userController.getUser,
	getUsers: userController.getUsers,
	update: userController.update,
	delete: userController.delete
});

export default userRouter;

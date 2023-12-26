import { router } from '../trpc';
import { userController } from '../modules';

const userRouter = router({
	create: userController.create,
	getUser: userController.getUser,
	getUsers: userController.getUsers,
	update: userController.update,
	delete: userController.delete
});

export default userRouter;

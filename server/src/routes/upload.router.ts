import { router } from '../trpc/index.js';
import uploadController from '../modules/upload/upload.controller.js';

const uploadRouter = router({
	create: uploadController.upload
});

export default uploadRouter;

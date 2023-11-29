import { router } from '../trpc/index.js';
import { emailController } from '../modules/index.js';

const emailRouter = router({
	sendEmail: emailController.sendEmail
});

export default emailRouter;

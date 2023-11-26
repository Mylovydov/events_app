import { router } from '../trpc/index.js';
import { emailController } from '../modules/email/index.js';

const emailRouter = router({
	addEmailSettings: emailController.addEmailSettings
});

export default emailRouter;

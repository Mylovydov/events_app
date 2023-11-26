import { router } from '../trpc/index.js';
import { emailTemplatesController } from '../modules/index.js';

const emailTemplateRouter = router({
	addEmailTemplate: emailTemplatesController.addEmailTemplate
});

export default emailTemplateRouter;

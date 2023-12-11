import { router } from '../trpc';
import { emailTemplatesController } from '../modules';

const emailTemplateRouter = router({
	addEmailTemplate: emailTemplatesController.addEmailTemplate,
	getEmailTemplate: emailTemplatesController.getEmailTemplate
});

export default emailTemplateRouter;

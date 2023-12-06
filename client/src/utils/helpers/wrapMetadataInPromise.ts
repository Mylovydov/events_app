import { TBaseQueryPromiseArgs } from '@/services';

const wrapMetadataInPromise = (meta: TBaseQueryPromiseArgs) =>
	Promise.resolve(meta);

export default wrapMetadataInPromise;

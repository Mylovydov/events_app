import { TBaseQueryArgs } from '@/services';

const wrapMetadataInPromise = (meta: TBaseQueryArgs) => Promise.resolve(meta);

export default wrapMetadataInPromise;

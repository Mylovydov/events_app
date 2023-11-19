import { TDropZoneProps } from '@/components/ui/dropZone/dropZone.types.ts';

export type TUploadPageProps = {
	title: string;
	subtitle?: string;
} & TDropZoneProps;

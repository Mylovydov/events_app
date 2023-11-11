export type TDropZoneProps = {
	onDropAccepted?: (files: File[]) => void;
	dragRejectText?: string;
	dragAcceptText?: string;
	dragPlaceholder?: string;
};

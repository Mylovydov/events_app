export type TDropZoneProps = {
	onDropAccepted?: (file: File) => void;
	dragRejectText?: string;
	dragAcceptText?: string;
	dragPlaceholder?: string;
	fileValidator?: (file: File) => Promise<boolean>;
};

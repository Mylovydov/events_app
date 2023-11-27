import { JSX } from 'react/jsx-runtime';
import IntrinsicElements = JSX.IntrinsicElements;

export type TInputLabelProps = IntrinsicElements['label'] & {
	required?: boolean;
	label: string;
	disabled?: boolean;
};

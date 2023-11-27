import { JSX } from 'react/jsx-runtime';
import IntrinsicElements = JSX.IntrinsicElements;

export type TInputProps = IntrinsicElements['input'] & {
	hasError?: boolean;
	fullWidth?: boolean;
};

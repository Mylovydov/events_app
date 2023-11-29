import { JSX } from 'react/jsx-runtime';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import IntrinsicElements = JSX.IntrinsicElements;

export type TInputProps = IntrinsicElements['input'] & {
	hasError?: boolean;
	fullWidth?: boolean;
	icon?: IconProp;
	onIconClick?: () => void;
};

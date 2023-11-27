import {
	TErrorMessageProps,
	TInputLabelProps,
	TInputProps
} from '@/components';

export type TTextFieldProps = TInputProps & {
	labelProps?: TInputLabelProps;
	errorMessageProps?: TErrorMessageProps;
};

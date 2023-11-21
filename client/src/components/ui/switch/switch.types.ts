import IntrinsicElements = React.JSX.IntrinsicElements;

export type TSwitchProps = Omit<IntrinsicElements['input'], 'onChange'> & {
	onChange?: (isChecked: boolean) => void;
};

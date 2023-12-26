import React from 'react';

export type TButtonProps = {
	label: string;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	fullWidth?: boolean;
	variant?: 'filled' | 'outlined';
	size?: 'medium' | 'large';
} & React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

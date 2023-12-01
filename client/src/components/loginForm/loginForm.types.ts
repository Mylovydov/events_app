export type TLoginFormValues = {
	email: string;
	password: string;
};

export type TLoginFormProps = {
	defaultValues: TLoginFormValues;
	onSubmit?: (data: TLoginFormValues) => void;
	isLoading?: boolean;
};

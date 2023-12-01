import { TLoginFormValues } from '@/components/loginForm/LoginForm.tsx';

export type TLoginFormProps = {
	defaultValues: TLoginFormValues;
	onSubmit?: (data: TLoginFormValues) => void;
};

import {
	createContext,
	FC,
	PropsWithChildren,
	useCallback,
	useMemo
} from 'react';
import {
	SnackbarProvider,
	SnackbarProviderProps,
	useSnackbar
} from 'notistack';
import { IOpenNotifyParams, TNotifyContext } from '@/providers';

export const NotifyContext = createContext<TNotifyContext>({
	open: () => {},
	close: () => {}
});

const BaseNotifyProvider: FC<PropsWithChildren> = ({ children }) => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const open = useCallback(
		({ message, ...options }: IOpenNotifyParams) => {
			enqueueSnackbar(message, { ...options });
		},
		[enqueueSnackbar]
	);

	const close = useCallback(
		(key: string) => closeSnackbar(key),
		[closeSnackbar]
	);

	const value = useMemo(() => ({ open, close }), [open, close]);

	return (
		<NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>
	);
};

const NotifyProvider: FC<PropsWithChildren & SnackbarProviderProps> = ({
	children,
	...props
}) => (
	<SnackbarProvider {...props}>
		<BaseNotifyProvider>{children}</BaseNotifyProvider>
	</SnackbarProvider>
);

export default NotifyProvider;

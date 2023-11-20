import { createContext, FC, PropsWithChildren } from 'react';

const UserContext = createContext({});

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
	return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export default UserProvider;

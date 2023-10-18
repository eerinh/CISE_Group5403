import { createContext, useState, ReactNode } from 'react';


interface UserDataContextProps {
    children: ReactNode;
}

export interface UserData {
    id: string;
}

const UserDataContext = createContext<UserData>({
    id: new Date().getTime().toString(),
});

export const UserDataProvider: React.FC<UserDataContextProps> = ({ children }) => {
    const [userData, setUserData] = useState<UserData>({
        id: new Date().getTime().toString(),
    });

    return (
        <UserDataContext.Provider value={userData}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserDataContext;

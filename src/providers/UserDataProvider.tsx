import { createContext, useState, ReactNode } from 'react';


interface UserDataContextProps {
    children: ReactNode;
}

export interface UserData {
    id: number;
}

const UserDataContext = createContext<UserData>({});

export const UserDataProvider: React.FC<UserDataContextProps> = ({ children }) => {
    const [userData, setUserData] = useState<UserData>({
        id: new Date().getTime(),
    });

    return (
        <UserDataContext.Provider value={userData}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserDataContext;

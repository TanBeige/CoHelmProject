import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PriorAuth } from "@/interfaces/PriorAuth";
import { ReactNode, createContext } from "react";

const PRIOR_AUTHS_KEY = "prior_auths"

interface AppContextInterface {
    priorAuths: PriorAuth[] | null;
    setPriorAuths: (param: any) => void
}

const defaultState = {
    priorAuths: [],
    setPriorAuths: ()=>{}
}

export const AppContext = createContext<AppContextInterface>(defaultState);

interface Props {
    children: ReactNode | undefined;
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {
    // use local storage to save data
    const [priorAuths, setPriorAuths] = useLocalStorage<PriorAuth[] | null>(
        `PRIOR_AUTHS_KEY`,
        []
    );

    return (
        <AppContext.Provider
            value={{
                ...defaultState,
                priorAuths,
                setPriorAuths
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
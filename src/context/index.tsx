import React, {
    PropsWithChildren,
    createContext,
    useEffect,
    useState,
} from 'react';
import { Font } from '../components/SelectFont';
import { GOOGLE_FONT_API } from '../utils/constants';

type SharedContext = {
    fonts: Font[];
    selectedFont: Font | null;
    setSelectedFont: React.Dispatch<React.SetStateAction<Font | null>>;
};

export const AppContext = createContext({} as SharedContext);

const AppContextProvider = ({ children }: PropsWithChildren) => {
    const [fonts, setFonts] = useState<Font[]>([]);
    const [selectedFont, setSelectedFont] = useState<Font | null>(null);

    useEffect(() => {
        const fetchFonts = async () => {
            const fontsFetchUrl = new URL(
                'https://www.googleapis.com/webfonts/v1/webfonts',
                window.location.origin,
            );
            fontsFetchUrl.searchParams.set('key', GOOGLE_FONT_API);
            const response = await fetch(fontsFetchUrl);
            const data = await response.json();
            setFonts(data.items);
        };

        fetchFonts();
    }, []);

    return (
        <AppContext.Provider value={{ fonts, selectedFont, setSelectedFont }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;

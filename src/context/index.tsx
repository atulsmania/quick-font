import React, {
    PropsWithChildren,
    createContext,
    useEffect,
    useState,
} from 'react';
import { Font } from '../components/SelectFont';
import { GOOGLE_FONT_API, getDefaultVariant } from '../utils/constants';

type SharedContext = {
    fonts: Font[];
    selectedFont: Font | null;
    setSelectedFont: React.Dispatch<React.SetStateAction<Font | null>>;
    selectedVariant: string | null;
    setSelectedVariant: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AppContext = createContext({} as SharedContext);

const AppContextProvider = ({ children }: PropsWithChildren) => {
    const [fonts, setFonts] = useState<Font[]>([]);
    const [selectedFont, setSelectedFont] = useState<Font | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

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

    useEffect(() => {
        if (!selectedFont) return;
        setSelectedVariant(getDefaultVariant(selectedFont));
    }, [selectedFont]);

    return (
        <AppContext.Provider
            value={{
                fonts,
                selectedFont,
                setSelectedFont,
                selectedVariant,
                setSelectedVariant,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;

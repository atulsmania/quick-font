import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { createRoot, Root } from 'react-dom/client';
import { getFontStyle, loadFont } from '../utils/constants';
import { useAppContext } from '../context/useAppContext';

interface ShadowHostProps {
    children: React.ReactNode;
    styles: string;
}

const ShadowHost: React.FC<ShadowHostProps> = ({ children, styles }) => {
    const { selectedFont, selectedVariant } = useAppContext();
    const rootRef = useRef<HTMLDivElement>(null);
    const reactRootRef = useRef<Root | null>(null);
    const [loadedFont, setLoadedFont] = useState<FontFace | null>(null);

    const updateSelectedFont = useCallback(async () => {
        const loaded = await loadFont(selectedFont, selectedVariant!);
        if (!loaded) return;
        setLoadedFont(loaded);
    }, [selectedVariant, selectedFont]);

    useEffect(() => {
        updateSelectedFont();
    }, [updateSelectedFont, selectedVariant]);

    useEffect(() => {
        updateSelectedFont();
    }, [updateSelectedFont]);

    useLayoutEffect(() => {
        const host = rootRef.current;
        if (!host) return;

        if (!host.shadowRoot) {
            host.attachShadow({ mode: 'open' });
        }

        const shadowRoot = host.shadowRoot;
        if (!shadowRoot) return;

        if (!reactRootRef.current) {
            reactRootRef.current = createRoot(shadowRoot);
        }

        let styleElement = shadowRoot.querySelector('style');
        if (!styleElement) {
            styleElement = document.createElement('style');
        }

        const newStyleChanges = `${getFontStyle(loadedFont)}${styles}`;
        styleElement.textContent = newStyleChanges;

        shadowRoot.appendChild(styleElement);

        reactRootRef.current.render(children);
    }, [children, styles, loadedFont]);

    return <section className="min-h-full" ref={rootRef} />;
};

export default ShadowHost;

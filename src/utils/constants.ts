import { Font } from '../components/SelectFont';

export const GOOGLE_FONT_API = import.meta.env.VITE_GOOGLE_FONT_API;

export const defaultHTMLInput = `
<section>
    <h1 id="title">
        A Powerful Font Exploration and Testing Tool
    </h1>
    <p id="description">
        PickAFont is a user-friendly tool designed to streamline your font selection process.
        Whether you're a seasoned designer or just starting out, PickAFont empowers you to explore a vast collection of fonts and visualize their impact on your text with ease.
    </p>
</section>
`;

export const defaultCSSInput = `section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 800px;
    margin: 0 auto;
}
#title {
    font-size: 2em;
}
#description {
    font-size: 1.2em;
    text-align: center;
}
`;

export const getFontStyle = (fontFace: FontFace | null) => {
    if (!fontFace) return '';
    return `:host {
        font-family: '${fontFace.family}';
    }`;
};

export const loadFont = async (font: Font | null) => {
    if (!font) return;
    const fontFace = new FontFace(font.family, `url(${font.files['regular']})`);
    const loadedFont = await fontFace.load();
    document.fonts.add(loadedFont);
    return loadedFont;
};

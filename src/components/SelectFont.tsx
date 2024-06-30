import Search from './Search';

export type Font = {
    family: string;
    variants: [string];
    subsets: string[];
    version: string;
    lastModified: string;
    files: Record<string, string>;
    category: string;
    kind: string;
    menu: string;
};

const SelectFont = () => {
    return <Search />;
};

export default SelectFont;

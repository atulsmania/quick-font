import { useAppContext } from '../context/useAppContext';

const SelectVariant = () => {
    const { selectedFont, selectedVariant, setSelectedVariant } =
        useAppContext();

    if (!selectedFont) return null;

    return (
        <select
            onChange={(e) => setSelectedVariant(e.target.value)}
            value={selectedVariant!}
            className="px-2 py-1 bg-gray-200 rounded focus:outline-none"
        >
            {selectedFont?.variants.map((variant) => (
                <option key={variant} value={variant} className="capitalize">
                    {variant}
                </option>
            ))}
        </select>
    );
};

export default SelectVariant;

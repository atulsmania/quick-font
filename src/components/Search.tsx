import { ComponentProps, useMemo, useRef, useState } from 'react';

import Fuse from 'fuse.js';
import { useAppContext } from '../context/useAppContext';
import { Font } from './SelectFont';
import clsx from 'clsx';

const Search = () => {
    const { fonts, setSelectedFont, selectedFont } = useAppContext();
    const [searchInput, setSearchInput] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const fuse = useMemo(
        () =>
            new Fuse(fonts, {
                keys: ['family'],
                includeMatches: true,
                includeScore: true,
                threshold: 0.3,
                minMatchCharLength: 3,
                findAllMatches: false,
            }),
        [fonts],
    );

    const list = useMemo(() => fuse.search(searchInput), [fuse, searchInput]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const selectFont = (font: Font) => {
        setSelectedFont(font);
        setSearchInput('');
        if (!inputRef.current) return;
        inputRef.current.value = '';
    };

    const clearFontSelection = () => {
        setSelectedFont(null);
        setSearchInput('');
        if (!inputRef.current) return;
        inputRef.current.value = '';
    };

    const isListOpen = list.length > 0;
    return (
        <div className="min-w-[300px]">
            <div className="relative w-full">
                <input
                    ref={inputRef}
                    className={clsx(
                        'w-full px-2 py-1 text-gray-700 bg-gray-200 focus:outline-none rounded',
                        {
                            'placeholder:text-gray-400': !selectedFont,
                            'placeholder:text-gray-900 focus:placeholder:text-gray-400':
                                selectedFont,
                            'rounded-b-none': isListOpen,
                        },
                    )}
                    id="search"
                    type="text"
                    onChange={handleSearchChange}
                    placeholder={
                        selectedFont?.family || 'Search google fonts...'
                    }
                />
                <div
                    onClick={clearFontSelection}
                    className={clsx(
                        'absolute -translate-y-1/2 cursor-pointer right-2 top-1/2',
                        'text-gray-500 hover:text-gray-800',
                        {
                            hidden: !selectedFont,
                        },
                    )}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </div>

                {!!isListOpen && (
                    <div className="absolute z-30 w-full py-3 overflow-scroll text-sm bg-white shadow max-h-64">
                        {list.map(({ item }) => (
                            <SearchItem
                                key={item.family}
                                onClick={() => selectFont(item)}
                            >
                                {item.family}
                            </SearchItem>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const SearchItem = ({ children, ...restProps }: ComponentProps<'div'>) => {
    return (
        <div
            className="flex justify-start p-2 text-gray-700 cursor-pointer hover:text-blue-400 hover:bg-blue-100"
            {...restProps}
        >
            <div className="flex-grow px-2 font-medium">{children}</div>
        </div>
    );
};

export default Search;

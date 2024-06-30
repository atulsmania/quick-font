/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import parse from 'html-react-parser';
import SelectFont from './SelectFont';
import ShadowHost from './ShadowHost';

interface ShadowPreviewProps {
    html: string;
    css: string;
}

const ShadowPreview: React.FC<ShadowPreviewProps> = ({ html, css }) => {
    return (
        <div className="flex flex-col flex-1 w-full min-h-screen">
            <div className="sticky top-0 flex items-center justify-between p-2 bg-gray-600">
                <label className="text-lg text-white">Preview</label>
                <SelectFont />
            </div>
            <ShadowHost styles={`${css}`}>{parse(html)}</ShadowHost>
        </div>
    );
};

export default ShadowPreview;

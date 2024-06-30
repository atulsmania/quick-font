import React, { ComponentProps } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';

export type EditorType = 'html' | 'css';

type EditorProps = {
    label: string;
    value: string;
    type: 'html' | 'css';
    onChange: (type: EditorType, value: string) => void;
};

const Editor: React.FC<EditorProps> = ({ value, type, onChange, label }) => {
    const options: ComponentProps<typeof ControlledEditor>['options'] = {
        lineNumbers: true,
        theme: 'material',
        mode: type === 'html' ? 'htmlmixed' : 'css',
        showCursorWhenSelecting: true,
        extraKeys: {
            'Ctrl-Space': 'autocomplete',
            'Cmd-Space': 'autocomplete',
        },
        indentWithTabs: true,
        tabSize: 2,
        firstLineNumber: 1,
        lineWrapping: true,
        lineNumberFormatter: (lineNumber) => String(lineNumber),
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    };

    return (
        <div className="w-full bg-gray-600">
            <label htmlFor={`${type}-editor`} className="p-2 text-white">
                {label}
            </label>
            <ControlledEditor
                value={value}
                options={options}
                onBeforeChange={(__, _, value) => onChange(type, value)}
            />
        </div>
    );
};

export default Editor;

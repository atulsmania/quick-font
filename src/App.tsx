import { useState } from 'react';
import Editor, { EditorType } from './components/Editor';
import ShadowPreview from './components/ShadowPreview';
import Header from './components/Header';
import { defaultCSSInput, defaultHTMLInput } from './utils/constants';
import AppContextProvider from './context';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';

function App() {
    const [html, setHtml] = useState(defaultHTMLInput);
    const [css, setCss] = useState(defaultCSSInput);

    const handleEditorChange = (editorType: EditorType, value: string) => {
        if (editorType === 'html') {
            setHtml(value);
        } else {
            setCss(value);
        }
    };

    return (
        <AppContextProvider>
            <div className="flex flex-col w-full min-h-screen mx-auto">
                <Header />
                <div className="flex gap-2 bg-gray-600">
                    <Editor
                        label="HTML"
                        type="html"
                        value={html}
                        onChange={handleEditorChange}
                    />
                    <Editor
                        label="CSS"
                        type="css"
                        value={css}
                        onChange={handleEditorChange}
                    />
                </div>
                <ShadowPreview html={html} css={css} />
            </div>
        </AppContextProvider>
    );
}

export default App;

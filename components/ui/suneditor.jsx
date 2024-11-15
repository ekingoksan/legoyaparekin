"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

export const SunEditorComponent = ({ value, setValue, placeholder }) => {
    return (
        <SunEditor
            setOptions={{
                buttonList: [
                    ['undo', 'redo'],
                    ['font', 'fontSize', 'formatBlock'],
                    ['paragraphStyle', 'blockquote'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                    ['fontColor', 'hiliteColor', 'textStyle'],
                    ['removeFormat'],
                    ['outdent', 'indent'],
                    ['align', 'horizontalRule', 'list', 'lineHeight'],
                    ['table', 'link', 'image', 'video'],
                    ['fullScreen', 'showBlocks', 'codeView'],
                    ['preview', 'print']
                ],
                height: 200,
            }}
            onChange={setValue}
            defaultValue={value}
            placeholder={placeholder}
            className="w-full editor"
        />
    )
}
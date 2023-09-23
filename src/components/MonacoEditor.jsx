import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';


const MonacoEditor = () => {
    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    function handleEditorValidation(markers) {
        // model markers
        markers.forEach((marker) => console.log('onValidate:', marker.message));
    }
    return (
        <>
            <div className="w-3/4 mx-auto bg-[#3A424D] h-fit mt-4 p-10 rounded-lg">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <div className="flex justify-center flex-col">
                    <Editor
                        height="70vh"
                        defaultLanguage="javascript"
                        defaultValue="// Enter code"
                        theme='vs-dark'
                        onValidate={handleEditorValidation}
                        options={
                            {
                                "wordWrap": true
                            }
                        }
                    />
                </div>
                <button onClick={handleSubmit} className='p-2 bg-orange-600 rounded-lg text-sm mt-4 text-white font-semibold'>Submit</button>
            </div>
            {/* output */}
            <div className='bg-[#3A424D] mt-4 h-fit p-4'>
                <p className='text-orange-500 text-3xl font-bold'>Output</p>
                {/* <p className='text-gray-300 mt-4'>{output}</p> */}
            </div>
        </>
    )
}

export default MonacoEditor
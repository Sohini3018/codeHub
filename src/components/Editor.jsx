import React, { useState } from 'react'
import CodeMirror from "@uiw/react-codemirror"
import { languages } from './language'
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import { loadLanguage, langNames } from '@uiw/codemirror-extensions-langs';
import toast, { Toaster } from 'react-hot-toast';

const Editor = () => {
    const [language, SetLanguage] = useState("javascript")
    const [value, setValue] = useState("")
    const [output, setOutput] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        let element = languages.find((el) => el.alias === language)
        let stringiFiedData = JSON.stringify({
            'code': value,
            'language': element.altVal
        })
        try {
            const response = await fetch("https://api.codex.jaagrav.in", {
                mode: "cors",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: stringiFiedData
            })
            const data = await response.json()
            console.log(data);
            if (data.output) {
                toast.success("Code compiled successfully")
                console.log(data.output);
                setOutput(data.output)
            } else {
                toast.error("Error in code")
                setOutput(data.error)
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            {/* seleect */}
            <div className="w-1/2 mx-auto bg-[#3A424D] h-fit mt-4 p-10 rounded-lg">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <div className="flex justify-center flex-col">
                    <label htmlFor="elementSelect" className='text-white text-lg font-semibold' >Select Language</label>
                    <select name="elementSelect" className='mb-4 px-2 text-md focus:outline-transparent' onChange={(e) => SetLanguage(e.target.value)}>
                        {
                            languages.map(({ name, alias }, i) => (
                                <option key={i} value={alias}>{name}</option>
                            ))
                        }
                    </select>
                    <div>
                        <CodeMirror
                            id="code-mirror"
                            value={value}
                            placeholder={`Write your ${language.toUpperCase()} code...`}
                            maxHeight="500px"
                            minHeight='500px'
                            theme={vscodeDark}
                            extensions={[loadLanguage(language)]}
                            basicSetup={{
                                indentOnInput: true,
                            }}
                            onChange={(val) => { setValue(val) }}
                        />
                    </div>
                </div>
                <button onClick={handleSubmit} className='p-2 bg-orange-600 rounded-lg text-sm mt-4 text-white font-semibold'>Submit</button>
            </div>
            {/* output */}
            <div className='bg-[#3A424D] mt-4 h-fit p-4'>
                <p className='text-orange-500 text-3xl font-bold'>Output</p>
                <pre className='text-gray-300 mt-4'>{output}</pre>
            </div>
        </>
    )
}

export default Editor
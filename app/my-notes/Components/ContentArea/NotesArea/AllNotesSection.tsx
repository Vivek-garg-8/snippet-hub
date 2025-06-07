"use client";
import { useGlobalContext } from "@/ContextApi";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark , materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { SiJavascript } from "react-icons/si";

function AllNotesSection(){
    return (
        <div className="mt-5 flex flex-wrap gap-4">
            <SingleNote />
            <SingleNote />
            <SingleNote />
            <SingleNote />
        </div>  
    );
}

export default AllNotesSection;

function SingleNote() {
    const {
        darkModeObject: {darkMode},
        openContentNoteObject : {openContentNote},
    } = useGlobalContext();
    return (
        <div
            className={`${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"} ${openContentNote ? "w-full" : "w-[380px]"}  max-sm:w-full rounded-md py-4 `}
        >
            <NotesHeader />
            <NoteDate />
            <NoteTags />
            <NoteDescription />
            <CodeBlock language="javascript" />
            <NoteFooter />
        </div>
    );
}

function NotesHeader() {
    return (
        <div className="flex justify-between mx-4  ">
            <span className="font-bold text-lg w-[87%] ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quia.
            </span>
            <FavoriteBorderOutlinedIcon className="text-slate-400 cursor-pointer" />
        </div>
    );
}

function NoteTags(){
    return (
        <div className="text-slate-400 text-[11px] mx-4 flex-wrap flex gap-1 mt-4 ">
            <span className="bg-purple-100 text-purple-600 p-1 rounded-md px-2  ">
                functions
            </span>
            <span className="bg-purple-100 text-purple-600 p-1 rounded-md px-2">
                functions
            </span>
            <span className="bg-purple-100 text-purple-600 p-1 rounded-md px-2">
                functions
            </span>
        </div>
    );
}

function NoteDate() {
    return (
        <div className="text-slate-500 text-[11px] flex gap-1 font-light mx-4 mt-1 ">
            <span className="">
                23th June 2024
            </span>
        </div>
    );
}

function NoteDescription() {
    const {
        darkModeObject : {darkMode},
    }= useGlobalContext();

    return(
        <div className={`${darkMode[1].isSelected ? "text-slate-300" : ""} text-slate-600 text-[13px] mt-4 mx-4 `}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum delectus veniam sapiente quam error autem tempore doloremque vitae? Ex a sequi numquam distinctio repellat dolorum?
        </div>
    );
}

interface CodeBlockProps {
    language: string;
}

const CodeBlock : React.FC<CodeBlockProps> = ({language}) => {
    const {
        darkModeObject: {darkMode},
    } = useGlobalContext();

    const codeString = `
        import React from 'react';

        function HelloWorld() {
            return <h1> Hello, world! </h1>
        }

        export default HelloWorld;

    `;

    return (
        <div className=" rounded-md overflow-hidden text-sm ">
            <SyntaxHighlighter 
                language={language}
                style={darkMode[1].isSelected ? oneDark : materialLight}
            >
                {codeString}
            </SyntaxHighlighter>
        </div>
    );
}

function NoteFooter() {

    return (
        <div className="flex justify-between text-[13px] text-slate-400 mx-4 mt-3 ">
            <div className="flex gap-1 items-center">
                <SiJavascript size={15} className="mb-[2px]" />
                Javascript
            </div>
            <DeleteRoundedIcon sx={{ fontSize: 17}} className="cursor-pointer" />
        </div>  
    );
}
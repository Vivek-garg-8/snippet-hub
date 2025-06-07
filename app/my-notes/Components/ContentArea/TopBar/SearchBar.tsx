"use client";
import { useGlobalContext } from '@/ContextApi';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

function SearchBar(){
    const {
        darkModeObject : {darkMode},
        openContentNoteObject : {openContentNote , setOpenContentNote},
    } = useGlobalContext();
    return (
        <div className={`relative pl-3 w-[60%] h-[38px] ${darkMode[1].isSelected ? "bg-slate-700" : "bg-slate-100"} rounded-3xl flex items-center gap-2 `}>
            <SearchIcon className="text-purple-500" sx={{ fontsize: 13}} />
            <input 
                placeholder="Search a snippet..."
                className={`w-[70%] outline-none text-sm ${darkMode[1].isSelected ? "bg-slate-700 ": "bg-slate-100"} text-slate-500 `}
            />
            <AddSnippetButton />
        </div>  
    );

    function AddSnippetButton(){
        return (
            <div
                className="absolute flex gap-1 px-2 rounded-3xl bg-purple-600 p-1 
                text-[13px] text-white top-[6px] right-[6px] items-center cursor-pointer select-none "
                onClick={() => setOpenContentNote(true)}
            >
                <AddOutlinedIcon sx={{ fontSize:18 }} />
                <div className="max-md:hidden " >Snippet</div>
            </div>
        );
    }
}

export default SearchBar;

import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

function SearchBar(){
    return (
        <div className="relative pl-3 w-[60%] h-[38px] bg-slate-100 rounded-3xl flex items-center gap-2 ">
            <SearchIcon className="text-purple-500" sx={{ fontsize: 13}} />
            <input 
                placeholder="Search a snippet..."
                className="w-[70%] outline-none text-sm bg-slate-100 text-slate-500 "
            />
            <AddSnippetButton />
        </div>  
    );

    function AddSnippetButton(){
        return (
            <div
                className="absolute flex gap-2 px-3 rounded-3xl bg-purple-600 p-1 
                text-[13px] text-white top-[5px] right-[6px] items-center cursor-pointer select-none "
            >
                <div className=' font-bold '>+</div>
                <div>Snippet</div>
            </div>
        );
    }
}

export default SearchBar;

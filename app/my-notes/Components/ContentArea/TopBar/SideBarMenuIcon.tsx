"use client";
import { useGlobalContext } from '@/ContextApi';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function SideBarMenuIcon(){
    const {
        openSideBarObject : { openSideBar , setOpenSideBar },
    }=useGlobalContext();

    return (
        <div className="block md:hidden">
            {!openSideBar ? (
                <MenuOutlinedIcon 
                    onClick={() => setOpenSideBar(!openSideBar)}
                    className="text-slate-500 cursor-pointer"
                />
            ):(
                <CloseOutlinedIcon 
                    onClick={() => setOpenSideBar(!openSideBar)}
                    className="text-slate-500 cursor-pointer"
                />
            )}
        </div>
    );  
}

export default SideBarMenuIcon;
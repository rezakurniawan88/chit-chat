import React, { useState } from 'react';
import Dropdown from './dropdown';
import { LucideChevronsUpDown } from 'lucide-react';

const Multiselect = ({ items, selectedItems, setSelectedItems }: any) => {
    const [dropdown, setDropdown] = useState(false);

    const toogleDropdown = () => {
        setDropdown(!dropdown)
    };

    const addTagName = (item: any) => {
        setSelectedItems(selectedItems.concat(item));
        setDropdown(false);
    };

    const removeTagName = (item: any) => {
        const filtered = selectedItems.filter((e: any) => e !== item);
        setSelectedItems(filtered);
    }

    return (
        <div className="w-full">
            <div className="autcomplete">
                <div className="w-full flex flex-col items-center mx-auto">
                    <div className="w-full">
                        <div className="flex flex-col items-center relative">
                            <div className="w-full ">
                                <div className="my-2 p-1 flex border border-gray-200 bg-white rounded ">
                                    <div className="flex flex-auto flex-wrap cursor-pointer" onClick={toogleDropdown}>
                                        {
                                            selectedItems.map((tag: any, index: number) => {
                                                return (
                                                    <div key={index} className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-blue-700 bg-blue-100 border border-blue-300 ">
                                                        <div className="text-xs font-normal leading-none max-w-full flex-initial">{tag.username}</div>
                                                        <div className="flex flex-auto flex-row-reverse">
                                                            <div onClick={() => removeTagName(tag)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                                    className="feather feather-x cursor-pointer hover:text-blue-400 rounded-full w-4 h-4 ml-2">
                                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>)
                                            })
                                        }
                                    </div>
                                    <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200" onClick={toogleDropdown}>
                                        <button type="button" className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                            <LucideChevronsUpDown size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {dropdown ? <Dropdown list={items} addItem={addTagName}></Dropdown> : null}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Multiselect;
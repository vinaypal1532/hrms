import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export const DropDown = ({ width, list, search, setSearch }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${width} text-black`}>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-gray-200 px-4 py-2 rounded-xl text-left flex justify-between items-center"
      >
        {search || list[0]} <IoIosArrowDown className="inline-block ml-2" />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-10 w-full p-1 bg-white border-gray-200 border-2 rounded-xl shadow mt-1 max-h-60 overflow-y-auto">
          {list.map((item: any, index: any) => (
            <li
              key={index}
              onClick={() => {
                setSearch(item);
                setOpen(false);
              }}
              className="px-2 py-1 hover:bg-gray-300 rounded-xl cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

import React from "react";

export const DropDown = ({ width, search, setSearch, list }: any) => {
  return (
    <>
      <div className={`${width} bg-gray-200 rounded-2xl px-2`}>
        <select
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded hover:cursor-pointer hover:border-none"
        >
          {list.map((item: any, index: any) => (
            <option
              key={index}
              value={item}
              className="hover:bg-gray-300 border-gray-700"
            >
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

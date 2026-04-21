import React from "react";

export const DropDown = ({ title, search, setSearch, list }: any) => {
  return (
    <>
      <div className="w-32">
        <select
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border w-full p-2 rounded"
        >
          <option value="">{title}</option>
          {list.map((item: any, index: any) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

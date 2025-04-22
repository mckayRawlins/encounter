"use client";

import { useEffect, useRef, useState } from "react";

export default function ApiSelector({ title, list, add, remove, apiResource }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const fetchOptions = async () => {
    if (!apiResource) return;
    const response = await fetch(`https://www.dnd5eapi.co/api/${apiResource}`);
    if (!response.ok) {
      throw new Error("Failed to fetch options");
    }
    const data = await response.json();
    setOptions(data.results);
  };

  useEffect(() => {
    fetchOptions();
  }, [apiResource]);

  const handleAdd = () => {
    if (!selectedOption) return;

    const option = options.find((option) => option.index === selectedOption);

    add(option);
    setSelectedOption("");
  };

  return (
    <div className="p-5">
      <h1 className="bg-gray-600 rounded-t-2xl text-white text-center p-3">
        {title}:{" "}
      </h1>
      <select
        value={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
        className="border bg-white"
        disabled={options.length === 0}
      >
        <option value="">--Select {title}--</option>
        {options.map((option) => (
          <option key={option.index} value={option.index}>
            {option.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleAdd}
        disabled={!selectedOption}
        className="bg-gray-600 text-white px-4 py-2 ml-3 rounded hover:cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Add
      </button>
      <ul>
        {list.map((item) => (
          <li
            key={item.id}
            className="flex justify-between bg-gray-200 p-2 m-2 rounded-md w-1/5"
          >
            {item.name}
            <span onClick={() => remove(item.id)} className="cursor-pointer">
              &times;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

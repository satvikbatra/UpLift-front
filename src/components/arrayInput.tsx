import { useState } from "react";

export const ArrayInput = ({
  value,
  onChange,
}: {
  name: string;
  value: string[];
  onChange: (val: string[]) => void;
}) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      onChange([...value, input.trim()]);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter an item and press add"
          className="p-2 border rounded-md w-full"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer"
        >
          Add
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {value.map((item, index) => (
          <span
            key={index}
            className="flex items-center gap-1 bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs"
          >
            {item}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-red-500 text-[10px] leading-none cursor-pointer"
            >
              ❌
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from "react";

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (value: string) => {
    if (value === "=") {
      handleCalculate();
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      const result = eval(input);
      setInput(result.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    if (key === "Enter") {
      handleCalculate();
    } else if (key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (!isNaN(Number(key)) || ["+", "-", "*", "/", "."].includes(key)) {
      // Let the onChange handle the input update
    } else {
      event.preventDefault();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const lastChar = value.slice(-1);
    if (
      !isNaN(Number(lastChar)) ||
      ["+", "-", "*", "/", ".", ""].includes(lastChar)
    ) {
      setInput(value);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="calculator bg-gray-100 p-4 rounded-lg shadow-lg md:w-1/3">
      <input
        type="text"
        value={input}
        ref={inputRef}
        onKeyDown={handleKeyPress}
        onChange={handleChange}
        className="w-full bg-white p-2 mb-4 rounded text-right text-xl md:text-3xl"
      />
      <div className="buttons grid grid-cols-4 gap-2">
        {[
          "7",
          "8",
          "9",
          "/",
          "4",
          "5",
          "6",
          "*",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          "=",
          "+",
        ].map((value) => (
          <button
            key={value}
            className="bg-cyan-600 text-white p-4 rounded md:text-2xl"
            onClick={() => handleButtonClick(value)}
          >
            {value}
          </button>
        ))}
        <button
          className="bg-rose-600 text-white p-4 rounded col-span-4"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Calculator;

import { useState, useRef } from 'react';

export const AutocompleteInputField = ({ label, name, options, register, setValue, required, errors, inputValue, setInputValue }) => {
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const inputValue = event.target.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    setInputValue(inputValue);

    if (inputValue.length >= 3) {
      setAutocompleteOptions(
        options.filter(option =>
          option.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputValue.toLowerCase())
        )
      );
    } else {
      setAutocompleteOptions([]);
    }
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setAutocompleteOptions([]);
    setValue(name, option);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  return (
    <label className="text-left w-full">
      {label}
      <div className="relative">
        <input
          name={name}
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={() => setValue(name, inputValue, { shouldValidate: true })}
          className="w-full p-2 border rounded shadow-sm"
          placeholder={label}
        />
        {autocompleteOptions.length > 0 && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
            {autocompleteOptions.map(option => (
              <div
                key={option}
                onClick={() => handleOptionClick(option)}
                className="cursor-pointer hover:bg-gray-200 p-2"
              >
                {option}
              </div>
            ))}
          </div>
        )}
        {errors[name] && <span className="text-red-500">This field is required</span>}
      </div>
    </label>
  );
};
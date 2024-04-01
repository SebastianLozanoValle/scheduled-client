import { useEffect, useState } from "react";

export const InputFormField = ({ register, label, id, placeholder, type = "text", errors, validation, defaultValue = "" }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleBlur = (e) => {
        setIsFocused(false);
        setIsFilled(e.target.value !== "");
    };

    useEffect(() => {
        if (defaultValue != "") {
            setIsFilled(true);
        }
    }, [defaultValue])

    return (
        <div className="w-full sm:w-2/5 relative m-2">
            <label
                htmlFor={id}
                className={`absolute transition-all bg-white rounded ml-2 ${(isFocused || isFilled) ? '-top-2.5 text-sm' : 'top-2 text-base pr-1'}`}
            >
                {label}
            </label>
            <input
                {...register(id, validation)}
                id={id}
                placeholder={placeholder}
                type={type}
                className="p-2 border rounded w-full"
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
                defaultValue={defaultValue}
            />
            {errors[id] && <p className="text-red-500">{errors[id].message}</p>}
        </div>
    );
};
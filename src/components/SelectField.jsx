export const SelectField = ({ label, name, register, required, options }) => (
    <label className="text-left w-full">
        {label}*
        <select name={name} {...register(name, { required })} className="w-full p-2 border rounded shadow-sm">
            <option value="">Select</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
        {errors[name] && <span className="text-red-500">This field is required</span>}
    </label>
);
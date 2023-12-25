export const InputField = ({ label, name, register, required, placeholder, type = "text", errors }) => (
    <label className="text-left w-full">
        {label}*
        <input name={name} type={type} placeholder={placeholder} {...register(name, { required })} className="w-full p-2 border rounded shadow-sm" />
        {errors[name] && <span className="text-red-500">This field is required</span>}
    </label>
);
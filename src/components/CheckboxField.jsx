export const CheckboxField = ({ label, name, register }) => (
    <label>
        <input type="checkbox" {...register(name)} className="mr-2" />
        {label}
    </label>
);
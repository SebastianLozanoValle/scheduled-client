import { AutocompleteInputField } from "../../../components/AutocompleteInputField"
import { InputFormField } from "../../../components/InputFormField"

export const StepOne = ({ register, errors, cities, setValue }) => {
    return (
        <div className="xs:w-full sm:w-full py-10 flex flex-col gap-4">
            <InputFormField register={register} label="Usuario" id="username" placeholder="Usuario" required={true} errors={errors} />
            <div className='flex flex-wrap justify-between'>
                <InputFormField register={register} label="Contraseña" id="password" placeholder="Contraseña" type="password" required={true} errors={errors} />
                <InputFormField register={register} label="ConfirmeContraseña" id="confirmpassword" placeholder="ConfirmeContraseña" type="password" required={true} errors={errors} validation={{ required: true, validate: value => value === contraseña || "The passwords do not match" }} />
            </div>
            <div className='flex flex-wrap justify-between'>
                <InputFormField register={register} label="Correo" id="email" placeholder="Correo" type='email' required={true} errors={errors} />
                <InputFormField register={register} label="Celular" id="phone" placeholder="Celular" type='number' errors={errors} />
            </div>
            <div className='flex flex-wrap justify-between'>
                <InputFormField register={register} label="Edad" id="age" placeholder="Edad" type="number" errors={errors} />
                <InputFormField register={register} label="Direccion" id="street" placeholder="Direccion" errors={errors} />
            </div>
            <AutocompleteInputField
                label='Distrito'
                name="city"
                register={register}
                setValue={setValue}
                required={true}
                errors={errors}
                options={cities}
                className="p-2 border rounded"
            />

            <label htmlFor='gender'>Genero</label>
            <select {...register("gender")} className="p-2 border rounded">
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <input {...register("role")} type="hidden" />
        </div>
    )
}
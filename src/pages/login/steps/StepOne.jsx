import { AutocompleteInputField } from "../../../components/AutocompleteInputField"
import { InputFormField } from "../../../components/InputFormField"

export const StepOne = ({ register, errors, cities, setValue, cityValue, setCityValue, watch }) => {

    const values = watch()
    console.log(values)

    return (
        <div className="xs:w-full sm:w-full py-10 flex flex-col gap-4">
            <div className="w-full">
                <InputFormField mitad={false} defaultValue={values.username} register={register} label="Usuario" id="username" placeholder="Usuario" required={true} errors={errors} />
                <InputFormField mitad={false} defaultValue={values.password} register={register} label="Contraseña" id="password" placeholder="Contraseña" type="password" required={true} errors={errors} />
                <InputFormField mitad={false} defaultValue={values.confirmpassword} register={register} label="ConfirmeContraseña" id="confirmpassword" placeholder="ConfirmeContraseña" type="password" required={true} errors={errors} validation={{ required: true, validate: value => value === contraseña || "The passwords do not match" }} />
            </div>
            <div className='flex flex-wrap justify-between'>
                <InputFormField defaultValue={values.email} register={register} label="Correo" id="email" placeholder="Correo" type='email' required={true} errors={errors} />
                <InputFormField defaultValue={values.phone} register={register} label="Celular" id="phone" placeholder="Celular" type='number' errors={errors} />
            </div>
            <div className='flex flex-wrap justify-between'>
                <InputFormField defaultValue={values.age} register={register} label="Edad" id="age" placeholder="Edad" type="date" errors={errors} />
                <InputFormField defaultValue={values.street} register={register} label="Direccion" id="street" placeholder="Direccion" errors={errors} />
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
                inputValue={cityValue}
                setInputValue={setCityValue}
            />

            <label htmlFor='gender'>Genero</label>
            <select {...register("gender", {validate: value => value !== "" || "Debe seleccionar una respuesta valida en este campo"})} className="p-2 border rounded">
                <option value="">Seleccione...</option>
                <option value="male">Mujer</option>
                <option value="female">Hombre</option>
                <option value="other">Otro</option>
            </select>
            {errors["gender"] && <p className="text-red-500">{errors["gender"].message}</p>}

            <input {...register("role")} type="hidden" />
        </div>
    )
}
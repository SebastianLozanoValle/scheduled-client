import { AutocompleteInputField } from "../../../components/AutocompleteInputField"
import { InputFormField } from "../../../components/InputFormField"

export const StepOne = ({ register, errors, cities, setValue }) => {
    return (
        <div className="xs:w-full sm:w-full py-10 flex flex-col gap-4">
            <InputFormField register={register} label="Username" id="username" placeholder="Username" required={true} errors={errors} />
            <div className='flex flex-wrap justify-between'>
                <InputFormField register={register} label="Password" id="password" placeholder="Password" type="password" required={true} errors={errors} />
                <InputFormField register={register} label="ConfirmPassword" id="confirmpassword" placeholder="ConfirmPassword" type="password" required={true} errors={errors} validation={{ required: true, validate: value => value === password || "The passwords do not match" }} />
            </div>
            <div className='flex flex-wrap justify-between'>
                <InputFormField register={register} label="Email" id="email" placeholder="Email" type='email' required={true} errors={errors} />
                <InputFormField register={register} label="Phone" id="phone" placeholder="Phone" type='number' errors={errors} />
            </div>
            <div className='flex flex-wrap justify-between'>
                <InputFormField register={register} label="Age" id="age" placeholder="Age" type="number" errors={errors} />
                <InputFormField register={register} label="Street" id="street" placeholder="Street" errors={errors} />
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
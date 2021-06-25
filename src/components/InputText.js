export const InputText = ({ name, placeholder, type, register, errors }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {name}
      </label>
      <div className="mt-1">
        <input
          type={type}
          className="shadow-sm focus:ring-ai focus:border-ai block w-full sm:text-sm border border-gray-200 rounded-md py-3 px-3"
          placeholder={placeholder}
          {...register(name, {
            required: "This is required",
            minLength: { value: 4, message: "Required" },
            maxLength: { value: 10, message: "Max length exceeded" },
          })}
        />
        {errors[`${name}`] && <p className="pl-3 text-ai font-semibold">{errors[`${name}`].message}</p>}
      </div>
    </div>
  );
};

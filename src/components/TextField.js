export const TextField = ({ name, placeholder, type, register, errors, label }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          className="shadow-sm focus:ring-ai focus:border-ai block w-full sm:text-sm border border-gray-200 rounded-md py-3 px-3"
          placeholder={placeholder}
          {...register(name, {
            required: "This is required",
            minLength: { value: 4, message: "This need to be at least 4 characters" },
            maxLength: { value: 100, message: "Max length exceeded" },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        {errors[`${name}`] && <p className="pl-3 text-ai font-semibold">{errors[`${name}`].message}</p>}
      </div>
    </div>
  );
};

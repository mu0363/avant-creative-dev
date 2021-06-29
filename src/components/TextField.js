export const TextField = (props) => {
  const { label, name, placeholder, type, registers, errorMessage } = props;
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          className="shadow-sm focus:ring-ai focus:border-ai block w-full text-base border border-gray-200 rounded-md py-3 px-3"
          placeholder={placeholder}
          {...registers}
        />
        {errorMessage && <p className="text-ai font-semibold mt-1 ml-1">{errorMessage}</p>}
      </div>
    </div>
  );
};

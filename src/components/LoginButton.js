export const LoginButton = ({ children, authMethod, src }) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 py-3 px-6 rounded-md hover:bg-gray-200">
      <img src={src} alt={src} className="h-5 mr-2" />
      <button onClick={authMethod} className="font-semibold">
        {children}
      </button>
    </div>
  );
};

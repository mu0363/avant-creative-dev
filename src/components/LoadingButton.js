import { ButtonSpinner } from "src/components/ButtonSpinner";

export const LoadingButton = (props) => {
  const { children, authMethod, src, isLoading, bgColor, spinColor, textColor, hoverColor } = props;
  return (
    <button
      className={`${bgColor} py-3 px-6 rounded-md hover:${hoverColor} items-center justify-center flex w-full disabled:opacity-50`}
      disabled={isLoading}
      onClick={authMethod}
    >
      <img src={src} alt={src} className="mr-2 h-5" />
      <div className="flex items-center">
        {isLoading ? (
          <div className="flex items-center">
            <ButtonSpinner spinColor={spinColor} />
            <span className={`${textColor}`}>Processing</span>
          </div>
        ) : (
          <p className={`font-semibold ${textColor}`}>{children}</p>
        )}
      </div>
    </button>
  );
};

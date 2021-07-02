export const Button = ({ children, bgColor, textColor, clicked }) => {
  return (
    <div>
      <button className={`${bgColor} ${textColor} px-4 py-2 rounded-md w-full py-3 px-6`} onClick={clicked}>
        {children}
      </button>
    </div>
  );
};

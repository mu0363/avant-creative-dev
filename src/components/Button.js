export const Button = ({ text, bgColor, textColor }) => {
  return (
    <div>
      <button className={`${bgColor} ${textColor} px-4 py-2 rounded-md`}>
        {text}
      </button>
    </div>
  );
};

export const Button = ({ text, bgColor, textColor, clicked }) => {
  return (
    <div>
      <button className={`${bgColor} ${textColor} px-4 py-2 rounded-md`} onClick={clicked}>
        {text}
      </button>
    </div>
  );
};

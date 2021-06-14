import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from 'src/redux/counter';

export default function playground() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-lg font-bold">{`The count is ${count} `}</h1>
      <div className="flex space-x-2 mt-5">
        <button
          onClick={() => dispatch(decrement())}
          className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-1 rounded-md"
        >
          decrement
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-1 rounded-md"
        >
          increment
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(4))}
          className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-1 rounded-md"
        >
          increment by Amount
        </button>
      </div>
    </div>
  );
}

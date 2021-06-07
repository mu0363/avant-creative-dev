import { Stepper } from 'src/components/Stepper';

export const Wizard = (props) => {
  const { children, forwardSwipe, backwardSwipe, currentIndex, previewSteps } = props;

  return (
    <>
      {previewSteps.length > 1 && (
        <div>
          <Stepper steps={previewSteps} currentStepNumber={currentIndex + 1} />
        </div>
      )}

      {children}
      <div className="flex justify-center my-8 space-x-4">
        <button
          onClick={backwardSwipe}
          className={`w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center bg-white hover:bg-gray-100 font-medium border ${
            currentIndex === 0 && 'text-gray-300'
          }`}
        >
          Previous
        </button>

        <button
          onClick={forwardSwipe}
          className={`w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center bg-white hover:bg-gray-100 font-medium border ${
            currentIndex === previewSteps.length - 1 && 'text-white bg-ai hover:bg-ai-dark'
          }`}
          // className='w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-ai hover:bg-ai-dark font-medium'
        >
          {currentIndex === previewSteps.length - 1 ? 'Render' : 'Next'}
        </button>
      </div>
    </>
  );
};

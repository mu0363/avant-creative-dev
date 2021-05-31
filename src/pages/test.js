import SwipeableViews from 'react-swipeable-views';

export default function Test() {
  return (
    <div>
      <SwipeableViews enableMouseEvents>
        <div className='bg-red-500 h-48'>slide n°1</div>
        <div className='bg-blue-500 h-48'>slide n°2</div>
        <div className='bg-green-500 h-48'>slide n°3</div>
      </SwipeableViews>
    </div>
  );
}

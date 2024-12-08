import React from 'react'
import SomethingLost from '../assets/images/something-lost.png'
const PagesNotFound = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen w-screen p-5">
      <div>
        <img src={SomethingLost} alt="something-lost" className='w-96' />
      </div>
      <h4 className="text-4xl">Oops, looks like the page is lost.</h4>
      <p className='text-lg'>This is not a fault, just an accident that was not intentional.</p>
    </div>
  );
}

export default PagesNotFound
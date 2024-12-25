import React from 'react'

const NewCourseAddForm = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
       <form action="" className='bg-white shadow-lg px-10 py-4'>
        <div className='flex flex-col gap-2'>
            <label htmlFor="courseImage" className='font-semibold'>Course Image</label>
            <input type="file" className='file:bg-blue-100 file:cursor-pointer text-gray-700 file:rounded-sm file:border-sm file:mr-3 file:text-blue-700 file:px-2' id='courseImage' accept='image/*' />
        </div>
       </form>
    </div>
  )
}

export default NewCourseAddForm
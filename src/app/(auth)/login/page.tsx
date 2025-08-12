'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Login() {
  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  }
  return (
    <main className=' flex flex-col items-start mx-auto md:mx-0   w-full p-4 md:w-full  ps-6  md:p-6 lg:p-28   mt-28'>
      <h1 className='text-gray-800 font-inter text-2xl font-bold'>Login</h1>
      <form
        action='#'
        className='mt-6'
        onSubmit={handleFormSubmit}
      >
        <label
          className=' font-geistMono block text-gray-800'
          htmlFor='email'
        >
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='user@example'
          className='border p-[7px]  text-sm ps-3 w-full mb-3'
          required
        />
        <label
          className='
        font-geistMono     text-gray-800'
          htmlFor='password'
        >
          Password
        </label>
        <input
          type='password'
          id='password'
          name='password'
          className='border p-[7px] text-sm ps-3 w-full mb-3'
          placeholder='********'
          required
        />
        <Link
          className='text-right text-xs tracking-wide block w-full text-blue-500'
          href={'/'}
        >
          Forgot your password?
        </Link>
        <Button
          type='submit'
          className='w-full px-2   rounded-none font-geistMono mt-6 bg-blue-600 text-white hover:bg-blue-700'
        >
          <span className='text-xs'>Login</span>
        </Button>
        <div className=' flex justify-center items-center gap-4 text-gray-500  mt-4'>
          Don't have an account?
          <Link
            className='text-blue-500'
            href={'/register'}
          >
            Create yours
          </Link>
        </div>
      </form>
    </main>
  );
}

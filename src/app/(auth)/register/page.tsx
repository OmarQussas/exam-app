'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export default function Login() {
  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  }
  return (
    <main className=' flex flex-col items-start mx-auto md:mx-0   w-full p-4 md:w-full  ps-6  md:p-6 lg:pt-24   '>
      <h1 className='text-gray-800 font-inter text-2xl font-bold'>
        Create Account
      </h1>
      <form
        action='#'
        className='mt-3'
        onSubmit={handleFormSubmit}
      >
        {/* first and last name section */}
        <section className='flex items-center  gap-4'>
          <div className='w-full'>
            <label
              className=' font-geistMono block text-gray-800'
              htmlFor='firstName'
            >
              First name
            </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              placeholder='Ahmed'
              className='border p-[7px]  text-sm ps-3 w-full mb-2'
              required
            />
          </div>
          <div className=' w-full'>
            <label
              className=' font-geistMono block text-gray-800'
              htmlFor='lastName'
            >
              Last name
            </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Abdullah'
              className='border p-[7px]  text-sm ps-3 w-full mb-2'
              required
            />
          </div>
        </section>

        <label
          className=' font-geistMono block text-gray-800'
          htmlFor='userName'
        >
          Username
        </label>
        <input
          type='text'
          id='userName'
          name='userName'
          placeholder='user123'
          className='border p-[7px]  text-sm ps-3 w-full mb-2'
          required
        />

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
          className='border p-[7px]  text-sm ps-3 w-full mb-2'
          required
        />
        <label
          className=' font-geistMono block text-gray-800'
          htmlFor='phone'
        >
          Phone
        </label>
        <PhoneInput
          defaultCountry='eg'
          forceDialCode
          inputProps={{
            name: 'phone',
            required: true,
            className:
              'p-[7px] rounded-none text-sm ps-3 w-full mb-2 border focus:ring-0 focus:border-none ',
          }}
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
          className='border p-[7px] text-sm ps-3 w-full mb-2'
          placeholder='********'
          required
        />
        <label
          className='
        font-geistMono     text-gray-800'
          htmlFor='rePassword'
        >
          Confirm Password
        </label>
        <input
          type='password'
          id='rePassword'
          name='rePassword'
          className='border p-[7px] text-sm ps-3 w-full mb-2'
          placeholder='********'
          required
        />

        <Button
          type='submit'
          className='w-full px-2   rounded-none font-geistMono mt-4 bg-blue-600 text-white hover:bg-blue-700'
        >
          <span className='text-xs'>Login</span>
        </Button>
        <div className=' flex justify-center items-center gap-4 text-gray-500  mt-4'>
          Already have an account?
          <Link
            className='text-blue-500'
            href={'/login'}
          >
            Login
          </Link>
        </div>
      </form>
    </main>
  );
}

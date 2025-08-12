import React from 'react';

type authProps = { icon: React.ReactNode; title: string; description: string };
const AuthItem = (props: authProps) => {
  return (
    <main className='mt-5'>
      <div className='flex items-start gap-3'>
        <span className='text-blue-600 border-blue-600 border p-1'>
          {props.icon}
        </span>
        <h1 className='text-[#155DFC] font-geistMono font-semibold tracking-wide'>
          {props.title}
        </h1>
      </div>
      <p className='text-[#374151] mt-1 ms-10 w-full hidden lg:block lg:w-2/3 text-sm  font-geistMono'>
        {props.description}
      </p>
    </main>
  );
};

export default AuthItem;

import React from 'react';
import RegisterPage from '../ui/pages/forms/RegisterPage';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


const page = async (context:GetServerSidePropsContext) => {
  const session = await getSession(context);

  if (session) {
    // User is already signed in, redirect to the homepage or desired location
    return redirect('/');
  }

  return (
    <div className="w-full h-full bg-slate-50 flex justify-center place-items-center">
      <RegisterPage />
    </div>
  );
};

export default page;

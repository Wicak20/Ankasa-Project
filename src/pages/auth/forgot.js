import { useState } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import Head from 'next/head';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to track loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post('https://easy-lime-seal-toga.cyclic.app/auth/forgot_password', {
        email,
      });

      if (response.status === 200) {
        setResponseMessage(response.data.message);
      } else {
        setResponseMessage('Failed to send password reset email.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setResponseMessage('An error occurred while sending the email.');
    } finally {
      setIsLoading(false); // Set loading state to false when request is complete
    }
  };

  return (
    <main className={`md:flex min-h-screen md:flex-row ${poppins.className}`}>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <div className="md:flex hidden md:h-screen md:w-1/2 w-screen bg-ankasa-blue items-center justify-center align-middle">
        <Image src={'/illustration.svg'} width={360} height={420} priority alt="logo" />
      </div>
      <div
        className="md:flex-col flex-row md:h-screen h-screen md:w-1/2 bg-white justify-center items-center p-8 md:p-16"
        style={{ color: 'black' }}
      >
        <div className="flex mx-6">
          <Image src={'/plane.svg'} width={50} height={34} alt="logo" />
          <p className="text-3xl font-extrabold mx-6">Ankasa</p>
        </div>
        <form className="w-80 my-16 md:flex-col md:mx-auto" onSubmit={handleSubmit}>
          <p className="text-4xl font-extrabold">Forgot Password</p>
          <div className="my-8">
            <label>Email </label>
            <input
              autoComplete="off"
              id="email"
              name="email"
              type="email"
              className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 mb-4"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading} // Disable input when loading
            />
          </div>
          <button type="submit" className="bg-ankasa-blue w-full h-16 rounded-md drop-shadow-md" disabled={isLoading}>
            {isLoading ? 'Sending...' : <p className="text-white text-bold">Send</p>}
          </button>
          {responseMessage && (
            <Alert severity="info" className="mt-4">
              {responseMessage}
            </Alert>
          )}
        </form>
      </div>
    </main>
  );
}

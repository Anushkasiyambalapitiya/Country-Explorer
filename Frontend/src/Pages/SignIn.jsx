import React, { useContext, useState } from 'react';
import { UserContext } from '../Context/userContext';
import Swal from 'sweetalert2';
const SignIn = () => {
  const [isRememberChecked, setIsRememberChecked] = useState(false);
  const { SignIn, loading } = useContext(UserContext);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  
  })


  const handleCheckboxChange = (e) => {
    setIsRememberChecked(e.target.checked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await SignIn(formData);
      Swal.fire({
        icon: 'success',
        title: 'Logged in successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: 'Please check your credentials and try again.',
      });
    }
  };
  return (
    <div className="min-h-screen flex">

      {/* Left Side: Sign In Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-5">
            <h4 className="mb-4 text-4xl font-bold tracking-tight leading-none text-blue-900 md:text-5xl lg:text-6xl dark:text-white">
              Sign In
            </h4>
            <label htmlFor="email" className="block mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50
                focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600
                dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                checked={isRememberChecked}
                onChange={handleCheckboxChange}
              />
            </div>
            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Remember me
            </label>
          </div>
          <button
  type="submit"
  disabled={!isRememberChecked || loading}
  className={`flex justify-center items-center gap-2 text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
    ${isRememberChecked && !loading
      ? "bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      : "bg-gray-400 cursor-not-allowed"
    }`}
>
  {loading && (
    <svg
      className="animate-spin h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      ></path>
    </svg>
  )}
  {loading ? 'Signing In...' : 'Submit'}
</button>

        </form>
      </div>

      {/* Right Side: Hero Section */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 relative overflow-hidden">
        <section className="bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')] h-full flex items-center justify-center p-8">
          <div className="text-center z-10 relative">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Explore The World 
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-200">
              Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
            </p>
          </div>
          <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-900 w-full h-full absolute top-0 left-0 z-0"></div>
        </section>
      </div>
    </div>
  );
};

export default SignIn;

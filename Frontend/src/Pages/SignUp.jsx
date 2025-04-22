import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
  });
  const [error,setError] =useState({})

  const { signUp, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors ={}
if(formData.password !== formData.confirmPassword){
  newErrors.confirmPassword="Passwords did not match"
  
}
if (!/^\d+$/.test(formData.mobileNumber) || formData.mobileNumber.length !== 10) {
  newErrors.mobileNumber = "Mobile Number should contain exactly 10 digits";
  
}


if(Object.keys(newErrors).length > 0){
  setError(newErrors);
  return
}

if (Object.keys(newErrors).length === 0) {
  try {
    await signUp(formData);
    
    // SweetAlert2 success popup
    Swal.fire({
      title: "Success!",
      text: "You have successfully signed up.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/"); // Navigate after user clicks OK
    });

  } catch (err) {
    console.error(err);
    // You can show an error Swal if you want
    Swal.fire({
      title: "Error!",
      text: "Something went wrong during signup.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }

}



 
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Sign In Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <h4 className="mb-8  font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Sign Up
          </h4>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="firstName"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                onChange={handleInputChange}
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                First name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="lastName"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                onChange={handleInputChange}
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Last name
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              onChange={handleInputChange}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              onChange={handleInputChange}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="confirmPassword"
              id="floating_repeat_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              onChange={handleInputChange}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Confirm password
            </label>
            {error.confirmPassword && <p style={{ color: "red" }}>{error.confirmPassword}</p>}


          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
         
              name="mobileNumber"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              onChange={handleInputChange}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Phone number{" "}
            </label>
            {error.mobileNumber && <p style={{ color: "red" }}>{error.mobileNumber}</p>}

          </div>

          <button
            type="submit"
            disabled={loading}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Sign Up
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
              Discover countries across the globe with real-time information on
              population, geography, languages, currencies, and more. Our API
              lets you explore every nation's unique identity — empowering you
              to build apps that bring global insights to your fingertips
            </p>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-200">
              Create an account to get better experience
            </p>
            <p className=" text-sm font-normal text-gray-500 lg:text-xl dark:text-gray-200">
              Already have an account{" "}
              <Link
                to={"/signIn"}
                className="text-blue-500 hover:underline  inline-block"
              >
                Sign in
              </Link>
            </p>
          </div>
          <div className="bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-900 w-full h-full absolute top-0 left-0 z-0"></div>
        </section>
      </div>
    </div>
  );
};

export default SignUp;

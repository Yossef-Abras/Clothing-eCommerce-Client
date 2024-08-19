export default function VerifyEmail() {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <div className="text-center">
        <h1 className="font-bold text-gray-800 font-sans text-3xl sm:text-4xl mt-8">
          Verify Email
        </h1>
        <p className="text-lg text-gray-600 font-sans mt-4">
          Enter the six-digit code here, please
        </p>
      </div>

      <div className="mt-8">
        <form className="flex justify-center space-x-2 sm:space-x-4">
          <input
            type="text"
            maxLength="1"
            className="w-10 h-10 sm:w-12 sm:h-12 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
          />
          <input
            type="text"
            maxLength="1"
            className="w-10 h-10 sm:w-12 sm:h-12 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
          />
          <input
            type="text"
            maxLength="1"
            className="w-10 h-10 sm:w-12 sm:h-12 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
          />
          <input
            type="text"
            maxLength="1"
            className="w-10 h-10 sm:w-12 sm:h-12 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
          />
          <input
            type="text"
            maxLength="1"
            className="w-10 h-10 sm:w-12 sm:h-12 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
          />
          <input
            type="text"
            maxLength="1"
            className="w-10 h-10 sm:w-12 sm:h-12 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
          />
        </form>

        <button
          type="submit"
          className="w-full mt-8 bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg transition duration-300 sm:mt-6"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

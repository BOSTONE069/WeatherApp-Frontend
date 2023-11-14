import React from "react";

const TokenExpirationPage = () => {
  return (
    <div class="flex items-center justify-center min-h-screen p-5 min-w-screen">
      <div class="max-w-xl p-8 text-center text-purple-800 bg-gray-100 shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
        <h3 class="text-2xl">Your session token has expired </h3>

        <div class="flex justify-center">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
          >
            <path
              fill="#FFCA28"
              d="M60 36.667H47.776L40 60h10l-6.667 20 19.999-26.667h-10z"
            />
            <path
              fill="#29B6F6"
              d="M33.333 40c0-11.045 8.955-20 20-20 7.702 0 13.991 5.854 14.832 13.333h5.168c5.515 0 10 4.485 10 10s-4.485 10-10 10H70V60h3.332C82.539 60 90 52.539 90 43.333s-7.461-16.667-16.668-16.667c-3.262-7.829-10.985-13.333-20-13.333-12.419 0-22.827 8.506-25.791 20h-4.208C15.971 33.333 10 39.302 10 46.667 10 54.029 15.971 60 23.333 60h10v-6.667h-10a6.675 6.675 0 0 1-6.667-6.667 6.675 6.675 0 0 1 6.667-6.667l10 .001zM14.445 66.667 10 80h7.026l4.446-13.333zM76.308 66.667 71.861 80h7.025l4.446-13.333zM26.305 73.333l-4.446 13.334h7.029l4.445-13.334zM59.643 73.333l-4.448 13.334h7.03l4.441-13.334z"
            />
          </svg>
        </div>

        <p>You will be re-directed to login page on refresh</p>
        <br />
      </div>
    </div>
  );
};

export default TokenExpirationPage;

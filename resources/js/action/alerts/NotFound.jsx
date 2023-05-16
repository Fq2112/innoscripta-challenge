import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { titleScroller } from "../../utils/Utils";
import { ERROR_404_IMG } from "../../vars/assets";

function NotFound() {
  useEffect(() => titleScroller("404 Error"), []);

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="max-w-2xl m-auto">
          <div className="text-center px-4">
            <div className="inline-flex mb-8">
              <img
                src={ERROR_404_IMG()}
                width="176"
                height="176"
                alt="404 illustration"
              />
            </div>
            <div className="mb-6 dark:text-navy-100">
              Hmm...this page doesn't exist. Try searching for something else!
            </div>
            <Link
              to="/"
              className="btn bg-primary-100 hover:bg-primary-200 text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFound;

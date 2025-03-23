import React from "react";

function Contact() {
  const emailAddress = "khaliff.williamss@gmail.com";

  const asciiArt = `
 ██████╗ ██████╗ ███╗   ██╗████████╗ █████╗  ██████╗████████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝╚══██╔══╝
██║     ██║   ██║██╔██╗ ██║   ██║   ███████║██║        ██║   
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║        ██║   
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╗   ██║   
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═╝`;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <pre className="flex justify-center text-[0.60rem] md:text-[0.7rem] overflow-x-auto text-blue">
        {asciiArt}
      </pre>

      <div className="my-8 flex flex-col">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-700">
            Have a question or want to get in touch? Send me an email directly:
          </p>

          <div className="mt-6 inline-block">
            <a
              href={`mailto:${emailAddress}`}
              className="bg-black text-white font-medium py-3 px-8 transition duration-200 inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {emailAddress}
            </a>
          </div>

          <p className="mt-6 text-sm text-dark-grey">
            I'll get back to you as soon as possible.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;

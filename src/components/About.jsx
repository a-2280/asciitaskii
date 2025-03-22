import React from "react";

function About() {
  // ASCII art for the About page
  const aboutLogo = `
 █████╗ ██████╗  ██████╗ ██╗   ██╗████████╗
██╔══██╗██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝
███████║██████╔╝██║   ██║██║   ██║   ██║   
██╔══██║██╔══██╗██║   ██║██║   ██║   ██║   
██║  ██║██████╔╝╚██████╔╝╚██████╔╝   ██║   
╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚═════╝    ╚═╝   
  `;

  return (
    <div className="flex flex-col items-center">
      <pre className="text-[0.80rem] md:text-[1.15rem] my-8 text-blue">
        {aboutLogo}
      </pre>

      <div className="max-w-2xl mx-auto">
        <div className="border-[1.5px] p-6 mb-8 mx-6">
          <h2 className="font-black text-[1.5rem] mb-4">About This Project</h2>
          <p className="mb-4">
            A collection of minimalist web apps with ASCII art aesthetics. Built
            by Calvin, a developer with a passion for clean design and
            functional applications.
          </p>
        </div>

        <div className="border-[1.5px] p-6 mb-8 mx-6">
          <h2 className="font-black text-[1.5rem] mb-4">Apps</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <p className="font-semibold mb-2 text-dark-grey">Weather App</p>
              <p>
                Real-time weather data with ASCII art visuals for any city
                worldwide.
              </p>
            </div>
            <div className="flex-1">
              <p className="font-semibold mb-2 text-dark-grey">Todo List</p>
              <p>
                Simple task management with multiple lists and persistent
                storage.
              </p>
            </div>
          </div>
        </div>

        <div className="border-[1.5px] p-6 mb-8 mx-6">
          <h2 className="font-black text-[1.5rem] mb-4">Tech Stack</h2>
          <p>React • Tailwind CSS • OpenWeatherMap API • Local Storage</p>
        </div>
      </div>
    </div>
  );
}

export default About;

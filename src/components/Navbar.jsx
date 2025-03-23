import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="flex px-4 py-2 m-2 border-[1.5px]">
      <div>
        <Link to="/" className="text-dark-grey md:hidden">
          [ii]
        </Link>
        <Link to="/" className="text-dark-grey hidden md:flex">
          [ascii taskii]
        </Link>
      </div>
      <div className="grow flex justify-between md:justify-end gap-3 md:gap-8">
        <div className="md:flex md:gap-4">
          <Link to="/todo" className="hidden md:flex">
            To-Do
          </Link>
          <Link to="/weather" className="hidden md:flex">
            Weather
          </Link>
        </div>
        <div className="flex gap-4">
          <a href="#" onClick={() => toggleOpen()} className="md:hidden">
            Menu
          </a>
          <Link to="/" className="hidden md:flex">
            About
          </Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 w-screen h-screen m-0 flex justify-center items-center z-50"
          onClick={handleBackgroundClick}
        >
          <div className="bg-white border-[1.5px] w-fit h-fit px-8 py-4">
            <p>[Ascii Taskii]</p>
            <div className="flex flex-col my-8 gap-1">
              <Link to="/" onClick={() => toggleOpen()}>
                About
              </Link>
              <Link to="/todo" onClick={() => toggleOpen()}>
                To-Do
              </Link>
              <Link to="/weather" onClick={() => toggleOpen()}>
                Weather
              </Link>
            </div>
            <button onClick={() => toggleOpen()}>[Exit]</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;

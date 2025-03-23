function Contact() {
  const asciiArt = `
   ██████╗ ██████╗ ███╗   ██╗████████╗ █████╗  ██████╗████████╗
  ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝╚══██╔══╝
  ██║     ██║   ██║██╔██╗ ██║   ██║   ███████║██║        ██║   
  ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║        ██║   
  ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╗   ██║   
   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═╝`;

  const formSubmitEmail = "khaliff.williamss@gmail.com";

  return (
    <div>
      <pre className="flex justify-center text-[0.55rem] text-blue">
        {asciiArt}
      </pre>
      <div className="m-8 flex flex-col">
        <p className="mb-6">
          Have a question or want to get in touch? Fill out the form below and
          I'll get back to you as soon as possible.
        </p>

        <form action={`https://formsubmit.co/${formSubmitEmail}`} method="POST">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-[1.5px] p-2 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border-[1.5px] p-2 focus:outline-none"
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Message"
            rows="5"
            className="border-[1.5px] w-full p-2 mb-4 focus:outline-none"
            required
          ></textarea>

          <button type="submit" className="bg-black text-white py-2 px-3">
            [Send]
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

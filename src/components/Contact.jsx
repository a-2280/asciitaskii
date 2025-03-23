import { useState } from "react";

function Contact() {
  const asciiArt = `
   ██████╗ ██████╗ ███╗   ██╗████████╗ █████╗  ██████╗████████╗
  ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝╚══██╔══╝
  ██║     ██║   ██║██╔██╗ ██║   ██║   ███████║██║        ██║   
  ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║        ██║   
  ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╗   ██║   
   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═╝`;

  const formSubmitEmail = "khaliff.williamss@gmail.com";

  // State for form values
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    // Name validation
    if (!formValues.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Email validation
    if (!formValues.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Message validation
    if (!formValues.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError(false);

      try {
        const form = e.target;
        const formData = new FormData(form);

        // Submit the form data
        const response = await fetch(
          `https://formsubmit.co/${formSubmitEmail}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          // Success
          setSubmitSuccess(true);
          setFormValues({ name: "", email: "", message: "" });

          // Hide success message after 5 seconds
          setTimeout(() => {
            setSubmitSuccess(false);
          }, 5000);
        } else {
          // Error
          setSubmitError(true);
        }
      } catch (error) {
        setSubmitError(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

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

        {submitSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-4 rounded">
            Thanks for your message! I'll get back to you soon.
          </div>
        )}

        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded">
            Something went wrong. Please try again or contact me directly at{" "}
            {formSubmitEmail}.
          </div>
        )}

        <form
          action={`https://formsubmit.co/${formSubmitEmail}`}
          method="POST"
          onSubmit={handleSubmit}
        >
          {/* FormSubmit.co configuration */}
          <input
            type="hidden"
            name="_subject"
            value="New Contact Form Submission"
          />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value={window.location.href} />
          <input type="text" name="_honey" style={{ display: "none" }} />

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex flex-col flex-1">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={`border-[1.5px] p-2 focus:outline-none ${
                  errors.name ? "border-red" : ""
                }`}
                value={formValues.name}
                onChange={handleChange}
                required
              />
              {errors.name && (
                <p className="text-red text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col flex-1">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`border-[1.5px] p-2 focus:outline-none ${
                  errors.email ? "border-red" : ""
                }`}
                value={formValues.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className="text-red text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <textarea
              name="message"
              placeholder="Message"
              rows="5"
              className={`border-[1.5px] w-full p-2 mb-1 focus:outline-none ${
                errors.message ? "border-red" : ""
              }`}
              value={formValues.message}
              onChange={handleChange}
              required
            ></textarea>
            {errors.message && (
              <p className="text-red text-sm">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white py-2 px-3 hover:bg-gray-800 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "[Send]"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

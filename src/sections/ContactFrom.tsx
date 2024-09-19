'use client'
import React, { useState, useRef } from 'react'
import Swal from 'sweetalert2'
const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);

    formData.append("access_key", process.env.NEXT_PUBLIC_WEB_FORM_API as string);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    const result = await response.json();
    if (result.success) {
      Swal.fire({
        title: "Success!",
        text: "Your message has been sent!",
        icon: "success"
      });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      formRef.current?.reset();
    } else {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error"
      });
    }
  }

  return (
    <div className="container mx-auto max-w-3xl p-8 md:p-16 rounded-lg mb-16" id='contactForm'>
      <h1 className="text-4xl font-bold mb-8 text-center">
        Send A Message
      </h1>
      <form className="space-y-8  text-black" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 md:grid-cols-2 ">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="py-3 px-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="py-3 px-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <input
          type="text"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          required
          className="py-3 px-5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Message"
          required
          className="py-3 px-5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-16 py-3 bg-indigo-500 text-white text-xl max-w-max rounded hover:bg-indigo-600 transition duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
    
  )
}

export default ContactForm


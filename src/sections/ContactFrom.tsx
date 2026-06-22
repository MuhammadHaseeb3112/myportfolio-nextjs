// src/sections/ContactFrom.tsx
"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { sendContactMessage } from "@/services/portfolio";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setName(""); setEmail(""); setSubject(""); setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await sendContactMessage({ name, email, subject, message });
      Swal.fire({ title: "Success!", text: "Your message has been sent!", icon: "success" });
      reset();
    } catch (err) {
      console.error(err);
      Swal.fire({ title: "Error!", text: "Something went wrong. Please try again.", icon: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="container mx-auto max-w-3xl p-8 md:p-16 rounded-lg mb-16"
      id="contactForm"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Send A Message</h1>
      <form className="space-y-8 text-black" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 md:grid-cols-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            disabled={submitting}
            className="py-3 px-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            disabled={submitting}
            className="py-3 px-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60"
          />
        </div>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          required
          disabled={submitting}
          className="py-3 px-5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Message"
          required
          disabled={submitting}
          className="py-3 px-5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="px-16 py-3 bg-indigo-500 text-white text-xl max-w-max rounded hover:bg-indigo-600 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending…" : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

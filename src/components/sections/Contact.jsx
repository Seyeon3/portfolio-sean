// src/components/Contact.jsx
import { useRef } from "react";
import { Mail, Phone, MapPin, User, Send } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_kk2aplq",   // 🔹 EmailJS Service ID
        "template_21zpl18",  // 🔹 EmailJS Template ID
        form.current,
        "KNLFWBgjkn8FIF_v0"    // 🔹 EmailJS Public Key (NOT secret key)
      )
      .then(
        () => {
          alert("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error("FAILED...", error.text);
          alert("❌ Failed to send message, please try again.");
        }
      );
  };

   return (
    <section id="contact" className="relative py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-400/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-white mb-14"
        >
          Get in <span className="text-teal-400">Touch</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-white"
          >
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <p className="text-gray-300 mb-6">
              Feel free to reach out through the form or directly via the following contact details:
            </p>
            <div className="flex items-center gap-3">
              <Phone className="text-teal-400" /> <span>+63 927 956 6746</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-amber-400" /> <span>seanmanaog22@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-teal-400" /> <span>Caloocan City, Philippines</span>
            </div>
          </motion.div>

          {/* EmailJS Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form ref={form} onSubmit={sendEmail} className="space-y-3">
              {/* Name */}
              <div className="relative">
                <User className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-300" size={16} />
                <input
                  type="text"
                  name="from_name"  // ✅ fixed
                  required
                  placeholder="Your name"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-300" size={16} />
                <input
                  type="email"
                  name="from_email"  // ✅ fixed
                  required
                  placeholder="Email address"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  name="message"
                  required
                  rows="3"
                  placeholder="Your message..."
                  className="w-full px-3 py-2.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(255,255,255,0.5)" }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-gradient-to-r from-teal-400 to-amber-400 hover:from-amber-400 hover:to-teal-400 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm"
              >
                <Send size={16} /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

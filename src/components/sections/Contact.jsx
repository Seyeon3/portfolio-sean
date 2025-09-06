import { useState, useRef } from "react";
import { Mail, UserCircle, AtSign, MessageSquareText, SendHorizonal, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const ContactWidget = () => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null); // success or error
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_kk2aplq",    
        "template_21zpl18",   
        form.current,
        "KNLFWBgjkn8FIF_v0"   
      )
      .then(() => {
        setToast({ type: "success", message: "✅ Message sent successfully!" });
        form.current.reset();
        setTimeout(() => setToast(null), 3000);
      })
      .catch(() => {
        setToast({ type: "error", message: "❌ Failed to send message, try again." });
        setTimeout(() => setToast(null), 3000);
      });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Floating Contact Icon with Neon Glow */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="relative bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-full shadow-lg hover:from-blue-400 hover:to-indigo-400 focus:outline-none"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        style={{
          boxShadow: "0 0 12px #3b82f6, 0 0 24px #2563eb, 0 0 36px #1e40af",
        }}
      >
        <Mail size={28} />
      </motion.button>

      {/* Slide-in Contact Form */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-96 max-w-[90vw] bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl rounded-2xl p-6 border border-blue-500/40"
          >
            <h3 className="text-xl font-bold mb-4 text-center">
              Get in <span className="text-blue-400">Touch</span>
            </h3>

            <form ref={form} onSubmit={sendEmail} className="space-y-3">
              {/* Name */}
              <div className="relative">
                <UserCircle className="absolute top-1/2 left-3 -translate-y-1/2 text-blue-300" size={18} />
                <input
                  type="text"
                  name="from_name"
                  required
                  placeholder="Your name"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/10 border border-blue-400/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <AtSign className="absolute top-1/2 left-3 -translate-y-1/2 text-blue-300" size={18} />
                <input
                  type="email"
                  name="from_email"
                  required
                  placeholder="Email address"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/10 border border-blue-400/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <MessageSquareText className="absolute top-3 left-3 text-blue-300" size={18} />
                <textarea
                  name="message"
                  required
                  rows="3"
                  placeholder="Your message..."
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/10 border border-blue-400/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                ></textarea>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.9)" }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm"
              >
                <SendHorizonal size={16} /> Send Message
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Toast Notification (Top-Right) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`fixed top-6 right-6 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-white text-sm ${
              toast.type === "success" ? "bg-green-600/90" : "bg-red-600/90"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={20} className="text-green-300" />
            ) : (
              <XCircle size={20} className="text-red-300" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactWidget;

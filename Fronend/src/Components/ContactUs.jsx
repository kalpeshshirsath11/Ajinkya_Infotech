import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="
            relative
            bg-orange-400/25
            backdrop-blur-2xl
            rounded-[2.5rem]
            p-12
            border border-white/30
            shadow-2xl shadow-orange-400/30
            hover:-translate-y-2
            transition-transform duration-500
          "
        >
          {/* Glow Ring */}
          <div className="absolute inset-0 rounded-[2.5rem] ring-2 ring-orange-400/20 pointer-events-none" />

          {/* Content */}
          <div className="relative text-center">
            <h2 className="text-4xl font-bold text-orange-600 mb-4">
              Let’s Build Your IT Career
            </h2>

            <p className="text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
              Have questions about courses, batches, or placements?  
              Reach out to Ajinkya Infotech and take your first confident step
              toward a successful tech career.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-5">
              <a
                href="tel:+919999999999"
                className="
                  px-8 py-4 rounded-full
                  bg-gradient-to-r from-orange-500 to-orange-600
                  text-white font-semibold
                  shadow-lg shadow-orange-500/40
                  hover:scale-105
                  transition-transform
                "
              >
                📞 Call Now
              </a>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-8 py-4 rounded-full
                  bg-white/80
                  text-green-600 font-semibold
                  backdrop-blur
                  border border-white/40
                  shadow-md
                  hover:scale-105
                  transition-transform
                "
              >
                💬 WhatsApp
              </a>

              <a
                href="mailto:info@ajinkyainfotech.com"
                className="
                  px-8 py-4 rounded-full
                  bg-white/80
                  text-orange-600 font-semibold
                  backdrop-blur
                  border border-white/40
                  shadow-md
                  hover:scale-105
                  transition-transform
                "
              >
                ✉️ Email Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
    
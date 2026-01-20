import { FaPhoneAlt, FaEnvelope, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400
                  bg-[length:200%_200%] animate-gradient 
                  text-white ">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-extrabold tracking-wide mb-4">
            Ajinkya Infotech
          </h2>

          <p className="text-sm leading-relaxed text-orange-100">
            A professional software training institute dedicated to building
            strong technical foundations and industry-ready careers.
          </p>

          <p className="mt-4 text-sm text-orange-200">
            Nashik, Maharashtra, India
          </p>
        </div>

        {/* Contact Details */}
        <div>
          <h2 className="text-xl font-semibold mb-5">Get in Touch</h2>

          <div className="space-y-4 text-sm">
            <p className="flex items-center gap-3 text-orange-100 hover:text-white transition">
              <FaPhoneAlt className="text-orange-200" />
              <span>+91 98765 43210</span>
            </p>

            <p className="flex items-center gap-3 text-orange-100 hover:text-white transition">
              <FaEnvelope className="text-orange-200" />
              <span>contact@ajinkyainfotech.com</span>
            </p>

            <p className="flex items-center gap-3 text-orange-100 hover:text-white transition">
              <FaGlobe className="text-orange-200" />
              <span>www.ajinkyainfotech.com</span>
            </p>
          </div>
        </div>

        {/* Map */}
        <div>
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
            <FaMapMarkerAlt className="text-orange-200" />
            Our Location
          </h2>

          <div className="overflow-hidden rounded-xl shadow-xl border border-orange-300/40">
            <iframe
              title="Ajinkya Infotech Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.852195055718!2d73.78607257527406!3d20.014717181392932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddebb188bf4f2b%3A0x5bacd8fb9260328d!2sAjinkya%20Infotech!5e0!3m2!1sen!2sin!4v1768636204624!5m2!1sen!2sin"
              className="w-full h-44 grayscale hover:grayscale-0 transition duration-300"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-orange-400/50 text-center py-5 text-sm text-orange-100">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">
          Ajinkya Infotech
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

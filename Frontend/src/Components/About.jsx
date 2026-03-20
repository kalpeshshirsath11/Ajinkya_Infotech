import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="w-full py-20 bg-white">
      {/* Heading */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl font-bold text-orange-600">
          {t('about.heading')}
        </h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-8 shadow-xl hover:scale-105 transition-transform"
        >
          <h3 className="text-xl font-semibold mb-4">{t('about.card1.title')}</h3>
          <p className="text-sm leading-relaxed">
            {t('about.card1.content')}
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white border border-orange-200 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
        >
          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            {t('about.card2.title')}
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {t('about.card2.content')}
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-8 shadow-xl hover:scale-105 transition-transform"
        >
          <h3 className="text-xl font-semibold mb-4">{t('about.card3.title')}</h3>
          <p className="text-sm leading-relaxed">
            {t('about.card3.content')}
          </p>
        </motion.div>
      </div>

      {/* CTA synced with footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-16 px-6"
      >
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-8 text-center shadow-xl">
          <p className="text-lg mb-4">
            {t('about.cta.text')}
          </p>
          <button className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-100 transition">
            {t('about.cta.button')}
          </button>
        </div>
      </motion.div>
    </section>
  );
}

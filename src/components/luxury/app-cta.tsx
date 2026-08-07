'use client';

import { motion } from 'framer-motion';
import { Phone, Building2, Apple } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { getAssetPath } from '@/lib/utils';

export function AppCTA() {
  const { toggleAdvisor, setPage } = useAppStore();

  return (
    <section id="cta" className="relative overflow-hidden py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#0B132B]">
      {/* Background Image with Dark Vignette Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${getAssetPath('/hero_bg.png')})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B] via-[#0B132B]/90 to-[#0B132B]" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: CTA Headline & Buttons */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-[family-name:var(--font-jakarta)] leading-[1.2] tracking-tight">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="mt-2.5 text-slate-300 text-xs sm:text-sm font-[family-name:var(--font-inter)] leading-relaxed max-w-md">
            Let our experts help you make the right investment decision for your future.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => toggleAdvisor()}
              className="bg-[#C89B2B] hover:bg-[#b08722] text-white font-semibold rounded-2xl px-6 py-3 text-xs sm:text-sm flex items-center gap-2.5 shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer font-[family-name:var(--font-inter)]"
            >
              <Phone className="w-4 h-4 fill-white" />
              Talk to Expert
            </button>

            <button
              onClick={() => setPage('listing')}
              className="border border-white/30 hover:border-white/60 bg-black/30 hover:bg-black/50 text-white font-semibold rounded-2xl px-6 py-3 text-xs sm:text-sm flex items-center gap-2.5 backdrop-blur-md transition-all duration-200 cursor-pointer font-[family-name:var(--font-inter)]"
            >
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              Browse Projects
            </button>
          </div>
        </motion.div>

        {/* Center Column: Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-3 flex justify-center items-center py-2"
        >
          <div className="relative group flex items-center justify-center">
            {/* Soft Ambient Gold Backlight Glow */}
            <div className="absolute inset-0 bg-[#C89B2B]/20 rounded-full blur-2xl group-hover:bg-[#C89B2B]/35 transition-all duration-500" />
            <img
              src={getAssetPath('/phone_mockup.png')}
              alt="Flat & Villa Mobile App Mockup"
              loading="eager"
              className="relative z-10 w-52 sm:w-64 md:w-72 lg:w-[290px] h-auto max-h-[340px] sm:max-h-[380px] md:max-h-[420px] lg:max-h-[450px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] contrast-[1.04] saturate-[1.04] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Right Column: "Get the App" QR Code Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-4 flex justify-start lg:justify-end"
        >
          <div className="bg-[#151C2C]/80 backdrop-blur-xl border border-white/15 rounded-3xl p-5 sm:p-6 shadow-2xl text-white flex items-center gap-4 sm:gap-5 max-w-md w-full">
            {/* Left Realistic QR Code Image Box */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white p-1.5 rounded-2xl shrink-0 flex items-center justify-center shadow-xl relative border border-white/30 group/qr hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img
                src={getAssetPath('/qr_code.png')}
                alt="Scan to download Flat & Villa App"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>

            {/* Right Text & App Store Badges */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-[family-name:var(--font-jakarta)] text-white leading-tight">
                  Get the App
                </h3>
                <p className="text-xs text-slate-300 font-[family-name:var(--font-inter)] leading-snug mt-1">
                  Scan to download <br />
                  our mobile app
                </p>
              </div>

              {/* Side-by-Side App Store Buttons */}
              <div className="mt-3 flex items-center gap-2">
                {/* App Store Button */}
                <button className="bg-black/90 hover:bg-black border border-white/20 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 transition-all text-white cursor-pointer hover:border-white/40">
                  <Apple className="w-3.5 h-3.5 text-white shrink-0" />
                  <div className="text-left leading-none">
                    <span className="block text-[9px] font-bold font-[family-name:var(--font-jakarta)] text-white">
                      App Store
                    </span>
                  </div>
                </button>

                {/* Google Play Button */}
                <button className="bg-black/90 hover:bg-black border border-white/20 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 transition-all text-white cursor-pointer hover:border-white/40">
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.3 0 .58.09.82.25l13.5 8.5c.5.31.78.86.78 1.44 0 .58-.28 1.13-.78 1.44l-13.5 8.5c-.24.16-.52.25-.82.25-.83 0-1.5-.67-1.5-1.5z" fill="#C89B2B" />
                  </svg>
                  <div className="text-left leading-none">
                    <span className="block text-[9px] font-bold font-[family-name:var(--font-jakarta)] text-white">
                      Google Play
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

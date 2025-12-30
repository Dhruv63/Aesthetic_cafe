import React from 'react';
import { motion } from 'framer-motion';

const Space: React.FC = () => {
  return (
    <section id="space" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Text Block */}
          <div className="md:col-span-5 relative z-10 order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-8xl font-serif font-bold text-dark-brown opacity-10 absolute -top-20 -left-10 select-none">
                VIBE
              </h2>
              <span className="text-terracotta font-bold tracking-widest uppercase text-xs mb-4 block">The Space</span>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-dark-brown mb-8 leading-tight">
                Designed for <br/> <span className="italic text-light-brown">Conversation</span>
              </h3>
              
              <div className="space-y-6 text-dark-brown/80 font-light leading-relaxed text-lg">
                <p>
                  Cocoa isn't just a cafe; it's a living room for the community. We've stripped back the noise to create a sanctuary of warm earth tones, curved arches, and textured fabrics.
                </p>
                <p>
                  Every corner is intentional. From the communal table for creative collisions to the solitary window seat for your morning read.
                </p>
              </div>

              <div className="mt-10 flex gap-8">
                <div>
                  <div className="text-3xl font-serif text-terracotta">12h</div>
                  <div className="text-xs uppercase tracking-wider text-dark-brown/60 mt-1">Daily Brewing</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-terracotta">Free</div>
                  <div className="text-xs uppercase tracking-wider text-dark-brown/60 mt-1">High-Speed WiFi</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image Collage */}
          <div className="md:col-span-7 relative h-[600px] order-1 md:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 right-0 w-3/4 h-[400px] rounded-tl-[100px] rounded-br-[40px] overflow-hidden shadow-2xl z-10"
            >
              <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1200&auto=format&fit=crop" alt="Interior Main" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-0 left-10 w-1/2 h-[300px] rounded-tr-[80px] rounded-bl-[40px] overflow-hidden shadow-xl z-20 border-8 border-white"
            >
              <img src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop" alt="Coffee Detail" className="w-full h-full object-cover" />
            </motion.div>
            
            {/* Decorative Circle */}
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-terracotta rounded-full -z-10 blur-2xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Space;
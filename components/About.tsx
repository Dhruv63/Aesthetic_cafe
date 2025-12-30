import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Moves the image slightly opposite to the scroll direction to create depth (parallax)
  // As we scroll down (0 -> 1), y goes from -50 to 50, effectively moving the image down 
  // relative to its container, which counteracts the upward scroll movement.
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={ref} id="about" className="py-24 px-6 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <span className="text-terracotta font-bold tracking-widest uppercase text-xs mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-brown mb-8 leading-tight">
              From a Home Kitchen to <span className="italic text-terracotta">Virar's Favorite Spot</span>
            </h2>
            
            <div className="space-y-6 text-dark-brown/80 font-light leading-relaxed text-lg">
              <p>
                Cocoa began as a whisper—a shared dream between friends who believed that Virar deserved a place that felt like a getaway. We started with a single oven and a recipe for the perfect chocolate ganache.
              </p>
              <p>
                Today, we are more than just a cafe. We are a canvas for conversations, a haven for readers, and a studio for artisanal baking. We believe in sourcing locally, baking slowly, and serving every cup with a story.
              </p>
            </div>

            <div className="mt-10 pt-10 border-t border-dark-brown/10">
              <p className="font-serif italic text-2xl text-dark-brown mb-2">"We bake memories, one slice at a time."</p>
              <p className="text-sm font-bold tracking-widest uppercase text-terracotta">— The Cocoa Team</p>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-1 md:order-2"
          >
            <div className="relative z-10 rounded-t-[200px] rounded-b-[20px] overflow-hidden shadow-2xl h-[500px] md:h-[600px]">
              <img 
                src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1000&auto=format&fit=crop" 
                alt="Cocoa Cafe Team and Interior" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-terracotta/10 rounded-full blur-2xl -z-0"></div>
            <div className="absolute top-20 -left-10 w-24 h-24 border-2 border-terracotta/30 rounded-full -z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
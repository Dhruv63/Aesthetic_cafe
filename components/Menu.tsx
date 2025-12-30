import React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '../types';

interface MenuDisplayItem extends MenuItem {
  image: string;
}

const signatureItems: MenuDisplayItem[] = [
  { 
    name: 'Blue Velvet Cheese Cream', 
    price: '₹450', 
    tag: 'Signature',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop'
  },
  { 
    name: 'Orange Sour Cream Cake', 
    price: '₹380', 
    tag: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'
  },
  { 
    name: 'Apple Nut Cinnamon', 
    price: '₹320', 
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?q=80&w=800&auto=format&fit=crop'
  },
  { 
    name: 'Dark Truffle Roast', 
    price: '₹290', 
    tag: "Chef's Pick",
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop'
  },
];

const Menu: React.FC = () => {
  return (
    <section id="menu" className="py-32 bg-cream relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-dark-brown/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-terracotta font-bold tracking-widest uppercase text-xs mb-2 block">Our Kitchen</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-dark-brown">Curated Indulgence</h2>
          </div>
          <p className="text-dark-brown/70 max-w-sm text-right md:text-left font-light leading-relaxed">
            Handcrafted daily using imported cocoa, fresh farm cream, and locally sourced spices.
          </p>
        </div>

        {/* Horizontal Scroll Layout for "Premium" feel */}
        <div className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {signatureItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-[85vw] md:w-[350px] snap-center group relative transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-beige mb-6 relative shadow-lg border-2 border-transparent group-hover:border-terracotta transition-colors duration-300">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/80 via-transparent to-transparent opacity-60"></div>
                
                {/* Floating Tag */}
                {item.tag && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-dark-brown shadow-sm">
                    {item.tag}
                  </div>
                )}
                
                {/* Price on Image */}
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-serif text-3xl">{item.price}</p>
                </div>
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-dark-brown group-hover:text-terracotta transition-colors">{item.name}</h3>
              <p className="text-sm text-dark-brown/60 mt-1">Contains egg • Nuts • Dairy</p>
            </motion.div>
          ))}
          
          {/* "View All" Card */}
          <div className="flex-shrink-0 w-[200px] flex items-center justify-center snap-center">
            <a href="#" className="w-24 h-24 rounded-full border border-dark-brown/20 flex items-center justify-center hover:bg-dark-brown hover:text-cream transition-all group hover:scale-110">
              <span className="font-serif italic text-lg transition-transform">View All</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
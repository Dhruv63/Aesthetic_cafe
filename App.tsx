import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Space from './components/Space';
import About from './components/About';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased text-dark-brown selection:bg-terracotta selection:text-white bg-cream">
      <Navbar />
      <Hero />
      <Menu />
      <Space />
      <About />
      <Footer />
    </div>
  );
};

export default App;
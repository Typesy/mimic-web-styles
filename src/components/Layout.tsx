
import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-primary">
      <nav className="py-4 px-6 bg-secondary">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white text-xl font-bold">
            <Rocket className="w-6 h-6" />
            AI Toolbox
          </Link>
          <div className="space-x-6">
            <Link to="/" className="text-white hover:text-accent">
              Home
            </Link>
            <Link to="/tools" className="text-white hover:text-accent">
              Tools
            </Link>
            <Link to="/about" className="text-white hover:text-accent">
              About
            </Link>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;

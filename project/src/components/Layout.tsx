import { ReactNode } from 'react';
import Navbar from './Navbar';
import CustomCursor from './CustomCursor';
import ScrollToTop from './ScrollToTop';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white relative">
      <CustomCursor />
      <Navbar />
      {children}
      <ScrollToTop />
    </div>
  );
} 
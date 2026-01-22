import React, { useEffect, useState } from 'react';
interface Section {
  id: string;
  label: string;
}
interface HeaderProps {
  sections: Section[];
}
export function Header({
  sections
}: HeaderProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });
    sections.forEach(({
      id
    }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [sections]);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  return <header className="sticky top-0 z-50 w-full bg-[#1E3A5F]/50 backdrop-blur-sm border-b border-uspn-blue/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: University Logo */}
        <div className="flex items-center">
          <img src="formalab/images/sorbonne.png" alt="Université Sorbonne Paris Nord" className="h-12 w-auto" />
        </div>

        {/* Center: Table of Contents Navigation */}
        <nav className="hidden md:flex items-center space-x-1 bg-white/60 backdrop-blur-sm p-1 rounded-full border border-uspn-blue/20 shadow-sm">
          {sections.map(section => <button key={section.id} onClick={() => scrollToSection(section.id)} className={`
                relative px-4 py-1.5 text-xs font-mono font-medium transition-all duration-300 rounded-full
                ${activeSection === section.id ? 'text-uspn-navy bg-white shadow-sm ring-1 ring-uspn-blue/30' : 'text-uspn-navy/60 hover:text-uspn-navy hover:bg-uspn-blue/10'}
              `}>
              {section.label}
            </button>)}
        </nav>

        {/* Right: Placeholder for balance */}
        <div className="w-8 hidden md:block" />
      </div>
    </header>;
}
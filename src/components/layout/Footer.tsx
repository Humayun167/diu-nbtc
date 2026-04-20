/**
 * Footer Component
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { nbtcLogo } from '../../assets/assets';
import { VisitorCounter } from '@/components/ui/visitor-counter';

const footerLinks = {
  research: [
    { label: 'Nanomedicine', href: '/research' },
    { label: 'Biosensors', href: '/research' },
    { label: 'Drug Delivery', href: '/research' },
    { label: 'Publications', href: '/publications' },
  ],
  about: [
    { label: 'Our Team', href: '/team' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Opportunities', href: '/opportunities' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'DIU Website', href: 'https://daffodilvarsity.edu.bd', external: true },
    { label: 'Research Portal', href: '#' },
    { label: 'Student Resources', href: '/opportunities' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img 
                src={nbtcLogo} 
                alt="NBTC Logo" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <span className="font-display font-bold text-lg">NBTC</span>
                <span className="block text-xs text-primary-foreground/60">
                  Daffodil International University
                </span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/70 mb-6">
              Advancing healthcare through innovative bio-nanotechnology research 
              and cutting-edge scientific discovery.
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Daffodil Smart City, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:bionanolab@diu.edu.bd" className="hover:text-secondary transition-colors">
                  bionanolab@diu.edu.bd
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+880 2-123456789</span>
              </div>
            </div>
          </div>

          {/* Research Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Research</h4>
            <ul className="space-y-2">
              {footerLinks.research.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs sm:text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} Nano BioTechnology Center, DIU. All rights reserved.
          </p>
          <VisitorCounter variant="compact" />
          <p className="text-xs sm:text-sm text-primary-foreground/50">
            Developed by{' '}
            <a
              href="https://www.humayunrashidkhan.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary/80 hover:underline transition-colors font-medium cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                window.open('https://www.humayunrashidkhan.tech/', '_blank');
              }}
            >
              Md. Humayun Rashid Khan
            </a>
          </p>
          <div className="flex items-center gap-6 text-sm text-primary-foreground/50">
            <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary-foreground transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

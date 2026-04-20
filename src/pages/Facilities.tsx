/**
 * Facilities Page
 */

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Microscope, Atom, FlaskConical, Zap, Thermometer, Eye, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const equipment = [
  {
    icon: Microscope,
    name: 'Transmission Electron Microscope (TEM)',
    description: 'High-resolution imaging of nanoparticles and nanomaterials at atomic scale.',
    specs: ['Resolution: 0.2 nm', 'Magnification: up to 1,000,000x', 'EDS capability'],
    status: 'Operational',
  },
  {
    icon: Eye,
    name: 'Scanning Electron Microscope (SEM)',
    description: 'Surface morphology analysis and elemental composition mapping.',
    specs: ['Resolution: 1.2 nm', 'EDS & WDS analysis', 'Variable pressure mode'],
    status: 'Operational',
  },
  {
    icon: Atom,
    name: 'Dynamic Light Scattering (DLS)',
    description: 'Particle size distribution and zeta potential measurements.',
    specs: ['Size range: 0.3 nm - 10 μm', 'Zeta potential capability', 'Temperature control'],
    status: 'Operational',
  },
  {
    icon: Zap,
    name: 'UV-Vis Spectrophotometer',
    description: 'Optical characterization of nanoparticles and plasmonic measurements.',
    specs: ['Wavelength: 190-1100 nm', 'Double beam configuration', 'Temperature cell holder'],
    status: 'Operational',
  },
  {
    icon: Thermometer,
    name: 'Differential Scanning Calorimeter (DSC)',
    description: 'Thermal analysis and phase transition characterization.',
    specs: ['Temperature: -90 to 550°C', 'Heating rate: 0.1-100°C/min', 'Modulated DSC'],
    status: 'Operational',
  },
  {
    icon: FlaskConical,
    name: 'High Performance Liquid Chromatography (HPLC)',
    description: 'Drug analysis and nanoparticle-drug conjugate characterization.',
    specs: ['UV-Vis detector', 'Fluorescence detector', 'Mass spectrometer compatible'],
    status: 'Operational',
  },
];

const facilities = [
  {
    name: 'Nanoparticle Synthesis Lab',
    description: 'Clean room facility for controlled synthesis of various nanoparticles including metal, polymer, and lipid nanoparticles.',
    features: ['Class 1000 clean room', 'Chemical fume hoods', 'Inert atmosphere glovebox', 'Sonication equipment'],
  },
  {
    name: 'Cell Culture Facility',
    description: 'BSL-2 certified facility for in vitro testing of nanomaterials on various cell lines.',
    features: ['Laminar flow cabinets', 'CO2 incubators', 'Inverted microscope', 'Flow cytometer'],
  },
  {
    name: 'Characterization Suite',
    description: 'Comprehensive analytical equipment for physical and chemical characterization.',
    features: ['FTIR spectroscopy', 'X-ray diffraction', 'Atomic force microscopy', 'Electrochemical workstation'],
  },
];

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 hero-gradient">
        <div className="container-wide px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white/80 mb-4">
              Facilities
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Lab Facilities & Equipment
            </h1>
            <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-white/80">
              State-of-the-art facilities and advanced instrumentation for cutting-edge 
              bio-nanotechnology research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Major Equipment Section */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            badge="Equipment"
            title="Major Instruments"
            description="Advanced analytical and characterization equipment for nanoscale research."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {equipment.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="nano" className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-accent/10 text-accent">
                        {item.status}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                    <ul className="space-y-1">
                      {item.specs.map((spec) => (
                        <li key={spec} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-secondary" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Facilities Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide">
          <SectionHeading
            badge="Laboratories"
            title="Research Facilities"
            description="Specialized laboratories designed for advanced bio-nanotechnology research."
          />

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="glass" className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">{facility.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{facility.description}</p>
                    <h4 className="text-sm font-semibold mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {facility.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Information */}
      <section className="section-padding">
        <div className="container-narrow">
          <Card variant="dark" className="p-8 md:p-12">
            <div className="text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Equipment Access
              </h2>
              <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-primary-foreground/70 mb-6 max-w-xl mx-auto">
                Our facilities are available to research students, faculty members, and 
                external collaborators. Contact us for scheduling and usage policies.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left mt-8">
                <div className="p-4 rounded-lg bg-white/5">
                  <h4 className="font-semibold text-primary-foreground mb-2">Internal Users</h4>
                  <p className="text-sm text-primary-foreground/60">
                    DIU students and faculty can request access through the lab management system.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <h4 className="font-semibold text-primary-foreground mb-2">External Collaborators</h4>
                  <p className="text-sm text-primary-foreground/60">
                    Partnership arrangements available for academic and industry collaborations.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <h4 className="font-semibold text-primary-foreground mb-2">Training</h4>
                  <p className="text-sm text-primary-foreground/60">
                    Equipment training sessions provided for all new users by lab technicians.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

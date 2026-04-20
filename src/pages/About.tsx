/**
 * About Page
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To advance the frontiers of bio-nanotechnology through innovative research, education, and collaboration, developing solutions that address critical healthcare challenges.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'To become a leading center of excellence in bio-nanotechnology research in South Asia, fostering innovation that transforms healthcare and improves quality of life.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We are committed to maintaining the highest standards of scientific rigor, ethical conduct, and academic integrity in all our research endeavors.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in the power of interdisciplinary collaboration, working with researchers, clinicians, and industry partners to translate discoveries into practical applications.',
  },
];

const milestones = [
  { year: '2018', title: 'Lab Establishment', description: 'Bio Nanotechnology Lab founded at DIU' },
  { year: '2019', title: 'First Publication', description: 'Published first research paper in international journal' },
  { year: '2020', title: 'Major Grant', description: 'Received national research funding for nanomedicine project' },
  { year: '2021', title: 'Expansion', description: 'Upgraded facilities with advanced characterization equipment' },
  { year: '2022', title: 'Industry Partnership', description: 'Established collaboration with pharmaceutical industry' },
  { year: '2023', title: 'Recognition', description: 'Received excellence award for research contributions' },
];

export default function AboutPage() {
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
              About Us
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Pioneering Bio-Nanotechnology Research
            </h1>
            <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-white/80">
              The Bio Nanotechnology Lab at Daffodil International University is dedicated to 
              advancing healthcare through innovative nanoscale research and discovery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                badge="Overview"
                title="Who We Are"
                align="left"
              />
              <div className="prose prose-lg text-muted-foreground mt-6 space-y-4">
                <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto">
                  Established at Daffodil International University, the Bio Nanotechnology Lab 
                  stands at the forefront of nanoscale research in Bangladesh. Our 
                  interdisciplinary team combines expertise in biology, chemistry, physics, 
                  and engineering to tackle complex healthcare challenges.
                </p>
                <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto">
                  We specialize in developing innovative solutions in nanomedicine, biosensors, 
                  drug delivery systems, and biocompatible nanomaterials. Our research aims to 
                  translate fundamental discoveries into practical applications that can improve 
                  patient outcomes and healthcare accessibility.
                </p>
                <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto">
                  The lab serves as a hub for training the next generation of researchers, 
                  offering hands-on experience in cutting-edge nanotechnology techniques and 
                  fostering a culture of scientific inquiry and innovation.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <Card variant="nano" className="p-6 text-center">
                <span className="block font-display text-4xl font-bold gradient-text">8+</span>
                <span className="text-sm text-muted-foreground">Years of Research</span>
              </Card>
              <Card variant="nano" className="p-6 text-center">
                <span className="block font-display text-4xl font-bold gradient-text">25+</span>
                <span className="text-sm text-muted-foreground">Publications</span>
              </Card>
              <Card variant="nano" className="p-6 text-center">
                <span className="block font-display text-4xl font-bold gradient-text">40+</span>
                <span className="text-sm text-muted-foreground">Researchers</span>
              </Card>
              <Card variant="nano" className="p-6 text-center">
                <span className="block font-display text-4xl font-bold gradient-text">12</span>
                <span className="text-sm text-muted-foreground">Collaborations</span>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide">
          <SectionHeading
            badge="Our Values"
            title="Mission & Vision"
            description="Guided by our commitment to excellence, innovation, and collaboration."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="glass" className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            badge="Our Journey"
            title="Lab Milestones"
            description="Key moments that have shaped our research journey."
          />

          <div className="mt-12 relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''} ml-12 md:ml-0`}>
                    <Card variant="elevated" className="inline-block">
                      <CardContent className="p-6">
                        <span className="text-sm font-semibold text-secondary">{milestone.year}</span>
                        <h3 className="font-display text-xl font-bold mt-1">{milestone.title}</h3>
                        <p className="text-muted-foreground mt-2">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-background -translate-x-1/2 z-10" />

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

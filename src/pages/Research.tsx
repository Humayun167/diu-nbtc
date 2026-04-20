/**
 * Research Page
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Pill, Activity, Atom, Dna, ArrowRight, CheckCircle, Calendar, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';

const researchAreas = [
  {
    icon: Pill,
    title: 'Nanomedicine',
    description: 'Developing therapeutic nanoparticles for targeted treatment of cancer, infectious diseases, and chronic conditions.',
    highlights: [
      'Targeted cancer therapy using gold nanoparticles',
      'Magnetic nanoparticles for hyperthermia treatment',
      'Antimicrobial nanocoatings for medical devices',
      'Nanoparticle-based vaccine delivery systems',
    ],
    status: 'Active',
  },
  {
    icon: Activity,
    title: 'Biosensors',
    description: 'Creating ultra-sensitive nanobiosensors for early disease detection and point-of-care diagnostics.',
    highlights: [
      'Electrochemical biosensors for glucose monitoring',
      'Plasmonic nanosensors for pathogen detection',
      'Wearable nano-biosensors for health monitoring',
      'Lab-on-a-chip diagnostic platforms',
    ],
    status: 'Active',
  },
  {
    icon: Atom,
    title: 'Drug Delivery Systems',
    description: 'Engineering smart nanocarriers for controlled and targeted drug delivery with reduced side effects.',
    highlights: [
      'Stimuli-responsive drug release systems',
      'Lipid nanoparticles for RNA therapeutics',
      'Polymer nanoparticles for sustained release',
      'Targeted delivery across blood-brain barrier',
    ],
    status: 'Active',
  },
  {
    icon: Dna,
    title: 'Nano Materials for Healthcare',
    description: 'Synthesizing and characterizing novel nanomaterials for biomedical applications.',
    highlights: [
      'Carbon nanotubes for tissue engineering',
      'Quantum dots for bioimaging',
      'Biocompatible surface modifications',
      'Green synthesis of metal nanoparticles',
    ],
    status: 'Active',
  },
];

const currentProjects = [
  {
    title: 'Smart Nanogel for Diabetes Management',
    description: 'Developing glucose-responsive insulin delivery system using smart hydrogel nanoparticles.',
    funding: 'National Research Grant',
    duration: '2023-2025',
  },
  {
    title: 'Rapid COVID-19 Detection Kit',
    description: 'Gold nanoparticle-based lateral flow assay for rapid and accurate virus detection.',
    funding: 'University Research Fund',
    duration: '2022-2024',
  },
  {
    title: 'Nanomedicine for Breast Cancer',
    description: 'Targeted chemotherapy delivery using antibody-conjugated nanoparticles.',
    funding: 'International Collaboration',
    duration: '2023-2026',
  },
];

const upcomingEvents = [
  {
    title: 'International Nanotechnology Conference 2026',
    date: 'February 15-17, 2026',
    time: '9:00 AM - 5:00 PM',
    location: 'Main Auditorium, Science Building',
    description: 'Join us for three days of cutting-edge presentations on the latest advances in nanotechnology and biomedical applications.',
    type: 'Conference',
  },
  {
    title: 'Workshop: Nanoparticle Synthesis Techniques',
    date: 'March 5, 2026',
    time: '10:00 AM - 4:00 PM',
    location: 'Nano Lab Training Center',
    description: 'Hands-on workshop covering green synthesis methods and characterization of metal nanoparticles.',
    type: 'Workshop',
  },
  {
    title: 'Seminar: Future of Drug Delivery Systems',
    date: 'March 20, 2026',
    time: '2:00 PM - 4:00 PM',
    location: 'Seminar Hall B',
    description: 'Guest lecture by Dr. Sarah Chen on next-generation smart drug delivery platforms.',
    type: 'Seminar',
  },
  {
    title: 'Lab Open Day',
    date: 'April 10, 2026',
    time: '11:00 AM - 3:00 PM',
    location: 'Nano Horizon Research Center',
    description: 'Explore our state-of-the-art facilities and meet our research team. Open to students and the public.',
    type: 'Open Day',
  },
];

export default function ResearchPage() {
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
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white/80 mb-4">
              Research
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Research Areas
            </h1>
            <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-white/80">
              Exploring the intersection of biology and nanotechnology to develop 
              innovative solutions for healthcare challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            badge="Focus Areas"
            title="Core Research Domains"
            description="Our research spans multiple domains at the cutting edge of bio-nanotechnology."
          />

          <div className="mt-12 space-y-8">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="p-8 bg-gradient-to-br from-secondary/5 to-accent/5">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4">
                        <area.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-display text-2xl font-bold mb-2">{area.title}</h3>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                        {area.status}
                      </span>
                    </div>
                    <div className="p-8 md:col-span-2">
                      <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-muted-foreground mb-6">{area.description}</p>
                      <h4 className="font-semibold mb-3">Current Focus:</h4>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {area.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Projects Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide">
          <SectionHeading
            badge="Active Projects"
            title="Current Research Projects"
            description="Ongoing research initiatives funded by national and international grants."
          />

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="nano" className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Funding:</span>
                        <span className="font-medium">{project.funding}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{project.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            badge="Events"
            title="Upcoming Events"
            description="Stay updated with our conferences, workshops, seminars, and community events."
          />

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                        {event.type}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Interested in Collaboration?
            </h2>
            <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-muted-foreground mb-8 max-w-xl mx-auto">
              We welcome research collaborations with academic institutions and industry partners.
            </p>
            <Button variant="nano" size="lg" asChild>
              <Link to="/contact">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

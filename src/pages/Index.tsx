/**
 * Home Page
 * 
 * Landing page with hero section featuring 3D nano-particle
 * and scroll-synced DNA animation.
 */

import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, FlaskConical, Microscope, Users, BookOpen, Atom, Dna, Pill, Activity, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { NanoParticle } from '@/components/3d/NanoParticle';
import { DNA3D } from '@/components/3d/DNA3D';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const researchAreas = [
  {
    icon: Pill,
    title: 'Nanomedicine',
    description: 'Developing nano-scale therapeutic solutions for targeted disease treatment.',
  },
  {
    icon: Activity,
    title: 'Biosensors',
    description: 'Creating ultra-sensitive detection systems for early disease diagnosis.',
  },
  {
    icon: Atom,
    title: 'Drug Delivery',
    description: 'Engineering smart nanocarriers for precision drug delivery systems.',
  },
  {
    icon: Dna,
    title: 'Nano Materials',
    description: 'Synthesizing biocompatible nanomaterials for healthcare applications.',
  },
];

const stats = [
  { value: '25+', label: 'Research Papers' },
  { value: '8', label: 'Faculty Members' },
  { value: '40+', label: 'Graduate Students' },
  { value: '5', label: 'Active Projects' },
];

const testimonials = [
  {
    name: 'Ahmed Moustofa',
    role: 'Professor',
    content: 'International collaborations in research lead to transformative discoveries. NBTC is playing a key role in fostering global partnerships in nano-biotechnology research. I encourage researchers and students to leverage these opportunities to enhance their impact in the field.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    name: 'Professor Dr. Mohammad Ali Moni',
    role: 'Professor',
    content: 'I have had the privilege of collaborating with NBTC, and I am impressed by its commitment to cutting-edge research in nano-biotechnology. The potential of nanotechnology in transforming global healthcare is immense, and this lab is at the forefront of making meaningful contributions to the field.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    name: 'Dr. Md Zahid Hasan',
    role: 'Associate Professor',
    content: 'The Nano BioTechnology Center (NBTC) is dedicated to advancing nanotechnology in healthcare through innovative research and interdisciplinary collaboration. Our goal is to bridge the gap between technology and medical science, ensuring that nano-driven solutions contribute to real-world medical applications.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
];

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const dnaOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 0]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      
      {/* DNA Background - Fixed position, fades on scroll, hidden on mobile */}
      <div className="fixed inset-0 pointer-events-none z-[5] hidden md:block overflow-hidden">
        <motion.div style={{ opacity: dnaOpacity }} className="absolute right-0 top-0 w-1/2 h-screen">
          <Suspense fallback={null}>
            <DNA3D className="w-full h-full" />
          </Suspense>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        {/* 3D Nano Particle */}
        <div className="absolute inset-0 opacity-60 md:opacity-80">
          <Suspense fallback={null}>
            <NanoParticle className="w-full h-full" />
          </Suspense>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container-wide pt-20 pb-32 md:pt-20 md:pb-20 px-4 sm:px-6">
          <div className="max-w-3xl bg-gradient-to-r from-primary/40 via-primary/20 to-transparent md:bg-none rounded-2xl p-4 md:p-0 backdrop-blur-sm md:backdrop-blur-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white/90 backdrop-blur-sm border border-white/10 mb-6">
                <Microscope className="w-4 h-4" />
                Daffodil International University
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            >
              Nano BioTechnology
              <span className="block text-secondary">Center, DIU </span>
            
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-white/80 mb-6 sm:mb-8 max-w-xl"
            >
              Pioneering the future of healthcare through innovative bio-nanotechnology research, 
              developing nanoscale solutions for medicine, diagnostics, and drug delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/research">
                  Explore Research
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/publications">View Publications</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 bg-white/60 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 -mt-16 sm:-mt-24 pb-8 sm:pb-12">
        <div className="container-wide px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-xl sm:rounded-2xl p-4 sm:p-8 md:p-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <span className="block font-display text-2xl sm:text-4xl md:text-5xl font-bold gradient-text">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground mt-1 block">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative z-10 section-padding bg-background">
        <div className="container-wide px-4 sm:px-6">
          <SectionHeading
            badge="Our Purpose"
            title="Mission & Vision"
            description="Guided by our commitment to advancing healthcare through nanotechnology innovation."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card variant="nano" className="h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4">
                    <FlaskConical className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl gradient-text">Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-muted-foreground">
                    To pioneer groundbreaking research in nano-biotechnology that transforms healthcare delivery, 
                    developing innovative nanoscale solutions for disease diagnosis, treatment, and prevention.
                  </p>
                  <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-muted-foreground">
                    We are committed to fostering a collaborative research environment that nurtures the next 
                    generation of scientists while making meaningful contributions to global health challenges.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card variant="nano" className="h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center mb-4">
                    <Microscope className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl gradient-text">Our Vision</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-muted-foreground">
                    To become a globally recognized center of excellence in nano-biotechnology, leading 
                    transformative research that bridges the gap between scientific discovery and clinical application.
                  </p>
                  <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-muted-foreground">
                    We envision a future where our innovations in nanomedicine, biosensors, and drug delivery 
                    systems revolutionize healthcare accessibility and patient outcomes worldwide.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 section-padding bg-muted/30">
        <div className="container-wide px-4 sm:px-6">
          <SectionHeading
            badge="Testimonials"
            title="Testimonials"
            description="Hear from our collaborators, researchers, and alumni about their experience with our center."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="nano" className="h-full relative overflow-hidden p-6">
                  {/* Profile Section */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-secondary/20"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      {/* Star Rating */}
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Quote Section */}
                  <div className="relative">
                    <span className="text-4xl text-secondary font-serif leading-none">"</span>
                    <p className="text-muted-foreground italic pl-2 pr-6">
                      {testimonial.content}
                    </p>
                    <span className="text-4xl text-secondary font-serif leading-none absolute bottom-0 right-0">"</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="relative z-10 section-padding bg-background">
        <div className="container-wide px-4 sm:px-6">
          <SectionHeading
            badge="Research Focus"
            title="Advancing Nanoscale Science"
            description="Our lab focuses on cutting-edge research areas at the intersection of biology and nanotechnology."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="nano" className="h-full group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <area.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {area.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-12"
          >
            <Button variant="nano-outline" size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/research">
                View All Research Areas
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="relative z-10 section-padding bg-muted/50">
        <div className="container-wide px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                badge="About Us"
                title="Leading Nano BioTechnology Center"
                description="Established at Daffodil International University, our center is dedicated to pushing the boundaries of nanotechnology in healthcare."
                align="left"
              />
              <div className="space-y-4 mt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <FlaskConical className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">State-of-the-Art Facilities</h4>
                    <p className="text-muted-foreground text-sm">
                      Advanced equipment for nano-scale research and experimentation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Expert Research Team</h4>
                    <p className="text-muted-foreground text-sm">
                      Renowned faculty and dedicated researchers driving innovation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Published Research</h4>
                    <p className="text-muted-foreground text-sm">
                      Contributions to top-tier journals and international conferences.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button variant="nano" size="lg" className="w-full sm:w-auto" asChild>
                  <Link to="/about">
                    Learn More About Us
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 p-8 flex items-center justify-center">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <Suspense fallback={null}>
                    <NanoParticle className="w-full h-full" />
                  </Suspense>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-secondary/10 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 section-padding hero-gradient">
        <div className="container-narrow text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Join Our Research Community
            </h2>
            <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
              We welcome passionate students and researchers to join our lab. 
              Explore thesis opportunities, internships, and collaborative research positions.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/opportunities">View Opportunities</Link>
              </Button>
              <Button variant="hero-outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

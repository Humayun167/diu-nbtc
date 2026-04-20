/**
 * Opportunities Page
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, Briefcase, Users, BookOpen, ArrowRight, CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const opportunities = [
  {
    icon: GraduationCap,
    title: 'PhD Positions',
    description: 'Full-time doctoral research positions with stipend and tuition waiver.',
    requirements: [
      'MSc in relevant field (Pharmacy, Chemistry, Biomedical Engineering)',
      'Strong academic record with research experience',
      'Published research papers preferred',
      'Proficiency in English (written and spoken)',
    ],
    benefits: ['Monthly stipend', 'Tuition waiver', 'Research funding', 'Conference travel support'],
    positions: 2,
    status: 'Open',
  },
  {
    icon: BookOpen,
    title: 'MSc Thesis Projects',
    description: 'Research-based thesis opportunities in various bio-nanotechnology domains.',
    requirements: [
      'Enrolled in MSc program at DIU or partner institutions',
      'Background in life sciences or engineering',
      'Commitment to 12-18 months of research',
      'Basic laboratory skills',
    ],
    benefits: ['Research training', 'Publication opportunities', 'Lab equipment access', 'Mentorship'],
    positions: 5,
    status: 'Open',
  },
  {
    icon: Briefcase,
    title: 'Research Internships',
    description: 'Short-term research experience for undergraduate and graduate students.',
    requirements: [
      'Currently enrolled undergraduate or graduate student',
      'Available for minimum 3 months',
      'Interest in nanotechnology and biomedical research',
      'Basic chemistry/biology knowledge',
    ],
    benefits: ['Hands-on training', 'Certificate of completion', 'Letter of recommendation', 'Project experience'],
    positions: 8,
    status: 'Open',
  },
  {
    icon: Users,
    title: 'Research Collaborations',
    description: 'Partnership opportunities for academic and industry researchers.',
    requirements: [
      'Relevant research expertise',
      'Complementary research interests',
      'Commitment to collaborative research',
      'Funding or resource contribution',
    ],
    benefits: ['Shared resources', 'Joint publications', 'Knowledge exchange', 'Extended network'],
    positions: null,
    status: 'Ongoing',
  },
];

const applicationSteps = [
  {
    step: 1,
    title: 'Review Requirements',
    description: 'Carefully review the eligibility criteria and requirements for your chosen position.',
  },
  {
    step: 2,
    title: 'Prepare Documents',
    description: 'Prepare your CV, academic transcripts, research statement, and recommendation letters.',
  },
  {
    step: 3,
    title: 'Submit Application',
    description: 'Send your complete application package via email or the online portal.',
  },
  {
    step: 4,
    title: 'Interview',
    description: 'Shortlisted candidates will be invited for an interview with the research team.',
  },
];

export default function OpportunitiesPage() {
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
              Opportunities
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Join Our Lab
            </h1>
            <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-white/80">
              We welcome talented and passionate individuals to join our research team. 
              Explore opportunities for thesis, internships, and research positions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            badge="Open Positions"
            title="Current Opportunities"
            description="Explore research opportunities available at our lab."
          />

          <div className="grid lg:grid-cols-2 gap-6 mt-12">
            {opportunities.map((opp, index) => (
              <motion.div
                key={opp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="nano" className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                        <opp.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center gap-2">
                        {opp.positions && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-secondary/10 text-secondary">
                            {opp.positions} positions
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          opp.status === 'Open' 
                            ? 'bg-accent/10 text-accent' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {opp.status}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{opp.title}</CardTitle>
                    <CardDescription className="text-base">{opp.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                          {opp.requirements.map((req) => (
                            <li key={req} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Benefits:</h4>
                        <div className="flex flex-wrap gap-2">
                          {opp.benefits.map((benefit) => (
                            <span 
                              key={benefit}
                              className="px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide">
          <SectionHeading
            badge="How to Apply"
            title="Application Process"
            description="Follow these steps to apply for research positions at our lab."
          />

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {applicationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <Card variant="glass" className="h-full text-center">
                  <CardContent className="pt-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mx-auto mb-4">
                      <span className="font-display font-bold text-white text-lg">{step.step}</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < applicationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Documents */}
      <section className="section-padding">
        <div className="container-narrow">
          <Card variant="elevated" className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-secondary">Required Documents</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Prepare Your Application
                </h2>
                <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-muted-foreground mb-6">
                  Please prepare the following documents before submitting your application:
                </p>
                <ul className="space-y-2">
                  {[
                    'Curriculum Vitae (CV)',
                    'Academic Transcripts',
                    'Research Statement (1-2 pages)',
                    'Two Letters of Recommendation',
                    'Cover Letter',
                    'Sample Publications (if any)',
                  ].map((doc) => (
                    <li key={doc} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center md:text-left">
                <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-muted-foreground mb-6">
                  Send your complete application package to:
                </p>
                <a 
                  href="mailto:bionanolab@diu.edu.bd"
                  className="font-semibold text-lg text-secondary hover:underline"
                >
                  bionanolab@diu.edu.bd
                </a>
                <p className="text-sm text-muted-foreground mt-2 mb-6">
                  Please include position title in the subject line
                </p>
                <Button variant="nano" size="lg" asChild>
                  <Link to="/contact">
                    Contact Us
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

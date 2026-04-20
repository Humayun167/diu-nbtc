/**
 * Team Page
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, GraduationCap, Award, Users, UserCheck, History } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { CommitteeItem, getExCommittee, getFacultyCommittee, getStudentCommittee, STORAGE_KEYS } from '@/lib/admin-content';
import { getFacultyCommitteeFromFirebase, getStudentCommitteeFromFirebase, getExCommitteeFromFirebase } from '@/lib/firebaseService';
import { advisor, director } from '@/assets/assets';

const advisors = [
  { name: 'Dr. Jamal Uddin', title: 'Professor and Founding Director', department: 'Center for Nanotechnology, Coppin State University, USA', expertise: 'Nanotechnology, Research Leadership', email: '', image: advisor },
];

export default function TeamPage() {
  const [facultyCommittee, setFacultyCommittee] = useState<CommitteeItem[]>([]);
  const [studentCommittee, setStudentCommittee] = useState<CommitteeItem[]>([]);
  const [exCommitteeMembers, setExCommitteeMembers] = useState<CommitteeItem[]>([]);

  useEffect(() => {
    const loadCommittees = async () => {
      try {
        const [firebaseFaculty, firebaseStudents, firebaseEx] = await Promise.all([
          getFacultyCommitteeFromFirebase(),
          getStudentCommitteeFromFirebase(),
          getExCommitteeFromFirebase(),
        ]);

        setFacultyCommittee(firebaseFaculty.length > 0 ? firebaseFaculty : getFacultyCommittee());
        setStudentCommittee(firebaseStudents.length > 0 ? firebaseStudents : getStudentCommittee());
        setExCommitteeMembers(firebaseEx.length > 0 ? firebaseEx : getExCommittee());
      } catch (error) {
        console.error('Error loading committees from Firebase:', error);
        setFacultyCommittee(getFacultyCommittee());
        setStudentCommittee(getStudentCommittee());
        setExCommitteeMembers(getExCommittee());
      }
    };

    loadCommittees();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEYS.facultyCommittee) setFacultyCommittee(getFacultyCommittee());
      if (event.key === STORAGE_KEYS.studentCommittee) setStudentCommittee(getStudentCommittee());
      if (event.key === STORAGE_KEYS.exCommittee) setExCommitteeMembers(getExCommittee());
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

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
              Our Team
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Faculty & Researchers
            </h1>
            <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-white/80">
              Meet the dedicated team of scientists and researchers driving innovation 
              at the Nano BioTechnology Center.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Advisor Panel Section */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            badge="Leadership"
            title="Advisor Panel"
            description="Distinguished leaders providing strategic guidance and vision for our center."
            icon={<Award className="w-5 h-5" />}
          />

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full max-w-sm"
              >
                <Card variant="glass" className="overflow-hidden h-full text-center">
                  <CardContent className="p-0">
                    <div className="h-56 overflow-hidden">
                      <img
                        src={advisor.image}
                        alt={advisor.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold">{advisor.name}</h3>
                      <p className="text-secondary font-medium text-sm">{advisor.title}</p>
                      <p className="text-muted-foreground text-sm mt-1">{advisor.department}</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-center gap-2 text-sm">
                          <GraduationCap className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="text-muted-foreground">{advisor.expertise}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                          <a 
                            href={`mailto:${advisor.email}`}
                            className="text-muted-foreground hover:text-secondary transition-colors"
                          >
                            {advisor.email}
                          </a>
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

      {/* Director Panel Section */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            badge="Leadership"
            title="Lab Director "
            description="Lab director providing operational leadership and vision for our center."
            icon={<Award className="w-5 h-5" />}
          />
          <div className="flex justify-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm"
            >
              <Card variant="glass" className="overflow-hidden h-full text-center">
                <CardContent className="p-0">
                  <div className="w-56 h-56 mx-auto overflow-hidden rounded-lg">
                    <img
                      src={director}
                      alt="Lab Director"
                      className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold">Dr. Md. Ali Hossain</h3>
                    <p className="text-secondary font-medium text-sm">Associate Professor, Dept. of CSE & Director</p>
                    <p className="text-muted-foreground text-sm mt-1">NanoBio Technology Center, DIU</p>
                    <p className="text-muted-foreground text-sm mt-1">Faculty of Science and Information Technology</p>
                    <p className="text-muted-foreground text-sm mt-1">Daffodil International University</p>
                    <div className="flex items-center justify-center gap-2 text-sm mt-3">
                      <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                      <a 
                        href="mailto:ali.cse@diu.edu.bd"
                        className="text-muted-foreground hover:text-secondary transition-colors"
                      >
                        ali.cse@diu.edu.bd
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Faculty Committee Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide">
          <SectionHeading
            badge="Faculty"
            title="Faculty Committee"
            description="Our experienced faculty members leading research initiatives and academic programs."
            icon={<UserCheck className="w-5 h-5" />}
          />

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {facultyCommittee.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="glass" className="overflow-hidden h-full">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-40 h-48 sm:h-auto flex-shrink-0">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-display text-xl font-bold">{member.name}</h3>
                            <p className="text-secondary font-medium text-sm">{member.title}</p>
                          </div>
                          <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full">{member.role}</span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">{member.department}</p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-start gap-2 text-sm"><GraduationCap className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /><span className="text-muted-foreground">{member.research}</span></div>
                          <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-secondary flex-shrink-0" /><a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-secondary transition-colors">{member.email}</a></div>
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

      {/* Student Committee Section */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            badge="Students"
            title="Student Committee"
            description="Graduate students and research assistants actively contributing to our projects and community."
            icon={<Users className="w-5 h-5" />}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {studentCommittee.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="nano" className="overflow-hidden text-center h-full">
                  <CardContent className="p-0">
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <span className="absolute top-3 right-3 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                        {member.role}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold">{member.name}</h3>
                      <p className="text-secondary text-sm font-medium">{member.title}</p>
                      <p className="text-muted-foreground text-sm mt-2">{member.research}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ex-Committee Members Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide">
          <SectionHeading
            badge="Alumni"
            title="Ex-Committee Members"
            description="Former members who have contributed significantly to our center's growth and success."
            icon={<History className="w-5 h-5" />}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {exCommitteeMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="glass" className="overflow-hidden h-full">
                  <CardContent className="p-0">
                    <div className="h-40 overflow-hidden grayscale hover:grayscale-0 transition-all duration-300">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold">{member.name}</h3>
                      <p className="text-secondary text-sm font-medium">{member.title}</p>
                      <p className="text-muted-foreground text-xs mt-1">{member.tenure}</p>
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground"><span className="font-medium">Now:</span> {member.currentPosition}</p>
                        <p className="text-xs text-accent mt-1">★ {member.achievement}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="section-padding">
        <div className="container-narrow">
          <Card variant="dark" className="p-8 md:p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Join Our Research Team
              </h2>
              <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-primary-foreground/70 mb-6 max-w-xl mx-auto">
                We are always looking for talented and motivated individuals to join our lab. 
                Explore opportunities for thesis, internships, and research positions.
              </p>
              <a
                href="/opportunities"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-white font-medium hover:bg-secondary/90 transition-colors"
              >
                View Opportunities
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

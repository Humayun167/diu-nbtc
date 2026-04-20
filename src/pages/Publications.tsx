/**
 * Publications Page
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ExternalLink, FileText, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { PublicationItem, getPublications, STORAGE_KEYS } from '@/lib/admin-content';
import { getPublicationsFromFirebase } from '@/lib/firebaseService';

const years = ['All', '2026', '2025', '2024', '2023', '2022', '2021', '2020'];
const types: Array<'All' | PublicationItem['type']> = ['All', 'Journal Article', 'Journal (Accepted)', 'Conference Paper', 'Conference (Accepted)', 'Review Article'];

export default function PublicationsPage() {
  const [publications, setPublications] = useState<PublicationItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedType, setSelectedType] = useState<'All' | PublicationItem['type']>('All');
  const [activeCategory, setActiveCategory] = useState<'journal' | 'conference'>('journal');

  useEffect(() => {
    const loadPublications = async () => {
      try {
        const firebasePublications = await getPublicationsFromFirebase();
        setPublications(firebasePublications.length > 0 ? firebasePublications : getPublications());
      } catch (error) {
        console.error('Error loading publications from Firebase:', error);
        setPublications(getPublications());
      }
    };

    loadPublications();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEYS.publications) {
        loadPublications();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) || pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) || pub.journal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = selectedYear === 'All' || pub.year.toString() === selectedYear;
    const matchesType = selectedType === 'All' || pub.type === selectedType;
    return matchesSearch && matchesYear && matchesType;
  });

  const journalPublications = filteredPublications.filter((pub) => pub.type === 'Journal Article' || pub.type === 'Review Article' || pub.type === 'Journal (Accepted)');
  const conferencePublications = filteredPublications.filter((pub) => pub.type === 'Conference Paper' || pub.type === 'Conference (Accepted)');

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
              Publications
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Research Publications
            </h1>
            <p className="text-justify text-[1.1rem] leading-[1.7] hyphens-auto text-white/80">
              Explore our peer-reviewed research publications in leading scientific journals 
              and international conferences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b bg-card/50 backdrop-blur-sm sticky top-16 md:top-20 z-30">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search publications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* Year Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                {years.map((year) => (
                  <option key={year} value={year}>{year === 'All' ? 'All Years' : year}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                {types.map((type) => (
                  <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-6 bg-background">
        <div className="container-wide">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setActiveCategory('journal')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeCategory === 'journal'
                  ? 'bg-secondary text-white shadow-lg shadow-secondary/25'
                  : 'bg-card border border-border text-muted-foreground hover:border-secondary/50 hover:text-secondary'
              }`}
            >
              <FileText className="w-5 h-5" />
              Journal Articles
            </button>
            <button
              onClick={() => setActiveCategory('conference')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeCategory === 'conference'
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'bg-card border border-border text-muted-foreground hover:border-accent/50 hover:text-accent'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Conference Papers
            </button>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="section-padding">
        <div className="container-wide">
          {/* Journal Articles Section */}
          {activeCategory === 'journal' && (
            <motion.div
              key="journal"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">
                    {journalPublications.length}
                  </span> journal articles
                </p>
              </div>

                  {journalPublications.length > 0 ? (
                <div className="space-y-4">
                      {journalPublications.map((pub, index) => (
                      <motion.div
                            key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <Card variant="elevated" className="hover:border-secondary/30">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                                  <FileText className="w-6 h-6 text-secondary" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-wrap gap-2 mb-2">
                                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-secondary/10 text-secondary">
                                    {pub.year}
                                  </span>
                                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent">
                                    {pub.type}
                                  </span>
                                </div>
                                <h3 className="font-display text-lg font-semibold mb-1 hover:text-secondary transition-colors cursor-pointer">
                                  {pub.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">{pub.authors}</p>
                                <p className="text-sm font-medium text-secondary">{pub.journal}</p>
                                <p className="text-sm text-muted-foreground mt-3">{pub.abstract}</p>
                                <div className="mt-4 flex items-center gap-4">
                                  {pub.doi ? <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:underline inline-flex items-center gap-1">View Publication<ExternalLink className="w-3 h-3" /></a> : null}
                                  {pub.doi ? <span className="text-xs text-muted-foreground">DOI: {pub.doi}</span> : null}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold mb-2">No journal articles found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Conference Papers Section */}
          {activeCategory === 'conference' && (
            <motion.div
              key="conference"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">
                    {conferencePublications.length}
                  </span> conference papers
                </p>
              </div>

                {conferencePublications.length > 0 ? (
                <div className="space-y-4">
                    {conferencePublications.map((pub, index) => (
                      <motion.div
                          key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <Card variant="elevated" className="hover:border-accent/30">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                                  <Calendar className="w-6 h-6 text-accent" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-wrap gap-2 mb-2">
                                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-secondary/10 text-secondary">
                                    {pub.year}
                                  </span>
                                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent">
                                    {pub.type}
                                  </span>
                                </div>
                                <h3 className="font-display text-lg font-semibold mb-1 hover:text-accent transition-colors cursor-pointer">
                                  {pub.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">{pub.authors}</p>
                                <p className="text-sm font-medium text-accent">{pub.journal}</p>
                                <p className="text-sm text-muted-foreground mt-3">{pub.abstract}</p>
                                <div className="mt-4 flex items-center gap-4">
                                  {pub.doi ? <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline inline-flex items-center gap-1">View Publication<ExternalLink className="w-3 h-3" /></a> : null}
                                  {pub.doi ? <span className="text-xs text-muted-foreground">DOI: {pub.doi}</span> : null}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold mb-2">No conference papers found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

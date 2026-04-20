/**
 * Event Page
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowRight, Award, Coffee, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { EventItem, getEvents, STORAGE_KEYS } from '@/lib/admin-content';
import { getEventsFromFirebase } from '@/lib/firebaseService';

type Event = EventItem;

const formatDisplayDate = (value: string) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

function EventCard({ event, status }: { event: Event; status: 'running' | 'upcoming' | 'past' }) {
  const statusColors = { running: 'bg-green-500', upcoming: 'bg-blue-500', past: 'bg-gray-500' };
  const statusLabels = { running: 'Happening Now', upcoming: 'Coming Soon', past: 'Completed' };

  const body = (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">{event.category}</Badge>
          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium text-white ${statusColors[status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full bg-white ${status === 'running' ? 'animate-pulse' : ''}`} />
            {statusLabels[status]}
          </span>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">{event.title}</CardTitle>
        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="w-4 h-4 text-primary" /> <span>{formatDisplayDate(event.date)}</span></div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="w-4 h-4 text-primary" /> <span>{event.time}</span></div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4 text-primary" /> <span>{event.location}</span></div>
        {event.attendees && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Users className="w-4 h-4 text-primary" /> <span>{event.attendees} Attendees</span></div>}
        {status !== 'past' && (
          <Button className="w-full mt-4 group/btn" variant={status === 'running' ? 'default' : 'outline'}>
            {status === 'running' ? 'Join Now' : 'Register'}
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        )}
      </CardContent>
    </Card>
  );

  if (!event.image) return <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>{body}</motion.div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="col-span-full">
      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="relative overflow-hidden">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover min-h-[300px] lg:min-h-[400px]" />
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-white ${statusColors[status]}`}>
                <span className={`w-2 h-2 rounded-full bg-white ${status === 'running' ? 'animate-pulse' : ''}`} />
                {statusLabels[status]}
              </span>
            </div>
          </div>
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <Badge variant="outline" className="w-fit mb-3">{event.category}</Badge>
            <h3 className="font-display text-xl lg:text-2xl font-bold mb-3 text-foreground">{event.title}</h3>
            <p className="text-muted-foreground mb-4 text-sm lg:text-base">{event.description}</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="w-4 h-4 text-primary" /> <span>{formatDisplayDate(event.date)}</span></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="w-4 h-4 text-primary" /> <span>{event.time}</span></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4 text-primary" /> <span>{event.location}</span></div>
            </div>
            {event.registrationFee && (
              <div className="bg-primary/10 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-primary">Registration Fee:</span>
                  <span className="font-bold text-lg">{event.registrationFee}</span>
                </div>
                {event.deadline && <p className="text-sm text-red-600 font-medium">⏰ Registration Deadline: {formatDisplayDate(event.deadline)}</p>}
              </div>
            )}
            {event.includes?.length ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {event.includes.map((item) => (
                  <span key={item} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {item === 'Certificate' && <Award className="w-3 h-3" />}
                    {item === 'Lunch' && <Coffee className="w-3 h-3" />}
                    {item === 'Souvenir' && <Gift className="w-3 h-3" />}
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
            {status !== 'past' && (
              <Button className="w-full lg:w-auto group/btn" size="lg">{status === 'running' ? 'Join Now' : 'Register Now'}<ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" /></Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function EventPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'running' | 'upcoming' | 'past'>('running');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const firebaseEvents = await getEventsFromFirebase();
        setAllEvents(firebaseEvents.length > 0 ? firebaseEvents : getEvents());
      } catch (error) {
        console.error('Error loading events from Firebase:', error);
        setAllEvents(getEvents());
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEYS.events) {
        loadEvents();
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const categorizeEvents = (events: Event[]) => {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const running: Event[] = [];
    const upcoming: Event[] = [];
    const past: Event[] = [];

    events.forEach((event) => {
      const eventDate = new Date(event.date);
      const normalized = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate()).getTime();
      if (normalized === startOfToday) running.push(event);
      else if (normalized > startOfToday) upcoming.push(event);
      else past.push(event);
    });

    return { running, upcoming, past };
  };

  const { running: runningEvents, upcoming: upcomingEvents, past: pastEvents } = categorizeEvents(allEvents);

  useEffect(() => {
    if (isLoading) return;
    if (runningEvents.length > 0) setActiveTab('running');
    else if (upcomingEvents.length > 0) setActiveTab('upcoming');
    else if (pastEvents.length > 0) setActiveTab('past');
  }, [isLoading, runningEvents.length, upcomingEvents.length, pastEvents.length]);

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><Navigation /><p className="text-muted-foreground">Loading events...</p></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 hero-gradient">
        <div className="container-wide px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-block px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white/80 mb-4">Events</span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">Events & Activities</h1>
            <p className="text-base sm:text-lg text-white/80">Stay updated with our conferences, workshops, seminars, and other events. Join us in advancing bio-nanotechnology research and collaboration.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading badge="Our Events" title="Discover What's Happening" description="Explore our running, upcoming, and past events to stay connected with the latest in bio-nanotechnology." />

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'running' | 'upcoming' | 'past')} className="mt-12">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="running" className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />Running</TabsTrigger>
              <TabsTrigger value="upcoming" className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500" />Upcoming</TabsTrigger>
              <TabsTrigger value="past" className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-500" />Past</TabsTrigger>
            </TabsList>

            <TabsContent value="running">
              {runningEvents.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{runningEvents.map((event) => <EventCard key={event.id} event={event} status="running" />)}</div> : <div className="text-center py-12"><p className="text-muted-foreground">No events are currently running.</p></div>}
            </TabsContent>
            <TabsContent value="upcoming">
              {upcomingEvents.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{upcomingEvents.map((event) => <EventCard key={event.id} event={event} status="upcoming" />)}</div> : <div className="text-center py-12"><p className="text-muted-foreground">No upcoming events at the moment.</p></div>}
            </TabsContent>
            <TabsContent value="past">
              {pastEvents.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{pastEvents.map((event) => <EventCard key={event.id} event={event} status="past" />)}</div> : <div className="text-center py-12"><p className="text-muted-foreground">No past events to display.</p></div>}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="section-padding bg-muted/50">
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">Want to Host an Event?</h2>
            <p className="text-muted-foreground mb-6">If you're interested in organizing a workshop, seminar, or collaborative event with our lab, we'd love to hear from you.</p>
            <Button size="lg" asChild><a href="/contact">Contact Us<ArrowRight className="w-4 h-4 ml-2" /></a></Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

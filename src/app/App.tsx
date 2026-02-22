import { Toaster } from "@/app/components/ui/sonner";
import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { QualificationsSection } from "@/app/components/QualificationsSection";
import { ProcessSection } from "@/app/components/ProcessSection";
import { RegistrationSection } from "@/app/components/RegistrationSection";
import { FAQSection } from "@/app/components/FAQSection";
import { Footer } from "@/app/components/Footer";
import { ThemeCustomizer } from "@/app/components/ThemeCustomizer";
import { VideoProvider } from "@/app/contexts/VideoContext";
import { SEOHead } from "@/app/components/SEOHead";
import { StructuredData } from "@/app/components/StructuredData";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { captureAffiliateData } from "@/app/utils/affiliate";
import { initializeSessionTracking, trackAppointmentSet } from "@/app/utils/sessionTracking";

export default function App() {
  useEffect(() => {
    // Set page title
    document.title = "Tommy Kovatch";
    
    // Capture affiliate/UTM data from URL parameters
    captureAffiliateData();
    
    // Initialize session tracking (creates session immediately)
    initializeSessionTracking();
    
    // Check if user is returning from Calendly (appointment scheduled)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('calendly_scheduled') || urlParams.has('calendly')) {
      trackAppointmentSet();
    }
    
    // Listen for Calendly events (if embedded)
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event && e.data.event.indexOf('calendly.event_scheduled') !== -1) {
        trackAppointmentSet();
      }
    };
    window.addEventListener('message', handleCalendlyEvent);
    
    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, []);

  return (
    <HelmetProvider>
      <SEOHead />
      <StructuredData />
      <VideoProvider>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Hero />
            <QualificationsSection />
            <ProcessSection />
            <RegistrationSection />
            <FAQSection />
          </main>
          <Footer />
          <Toaster />
          <ThemeCustomizer />
        </div>
      </VideoProvider>
    </HelmetProvider>
  );
}
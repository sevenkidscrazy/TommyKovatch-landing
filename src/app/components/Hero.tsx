import { Button } from "@/app/components/ui/button";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { trackButtonClick } from "@/app/utils/tracking";
import { trackVideoUnmuted, trackVideoMilestone } from "@/app/utils/sessionTracking";
import Player from "@vimeo/player";
import { useVideoContext } from "@/app/contexts/VideoContext";

export function Hero() {
  const [showSoundPrompt, setShowSoundPrompt] = useState(true);
  const [showUnmuteMessage, setShowUnmuteMessage] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const videoContext = useVideoContext();

  const scrollToRegistration = () => {
    trackButtonClick('Get Started - Hero');
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load Vimeo Player API script and handle autoplay
  useEffect(() => {
    // Add a small delay to ensure iframe is loaded
    const initTimer = setTimeout(() => {
      const initPlayer = async () => {
        if (iframeRef.current) {
          try {
            playerRef.current = new Player(iframeRef.current);
            
            // Register this player with the video context
            videoContext.registerPlayer('video1', playerRef.current);
            
            // Check initial mute state after a brief delay
            setTimeout(async () => {
              try {
                const muted = await playerRef.current?.getMuted();
                const volume = await playerRef.current?.getVolume();
                setIsVideoMuted(muted || volume === 0);
              } catch (error) {
                // Assume muted on error (browser autoplay policy)
                setIsVideoMuted(true);
              }
            }, 500);
            
            // Track when video is unmuted
            playerRef.current.on('volumechange', async (data: any) => {
              try {
                const muted = await playerRef.current?.getMuted();
                const isMuted = muted || data.volume === 0;
                setIsVideoMuted(isMuted);
                
                // Hide the unmute message when unmuted
                if (!isMuted) {
                  setShowUnmuteMessage(false);
                  trackVideoUnmuted();
                }
              } catch (error) {
                console.log('Error checking mute state:', error);
              }
            });
            
            // Track play/pause state
            playerRef.current.on('play', () => {
              videoContext.setVideoPaused('video1', false);
              videoContext.pauseOtherVideos('video1');
            });
            
            playerRef.current.on('pause', () => {
              videoContext.setVideoPaused('video1', true);
            });
            
            playerRef.current.on('ended', () => {
              videoContext.setVideoEnded('video1', true);
              trackVideoMilestone(100);
            });
            
            // Track video progress at milestones
            playerRef.current.on('timeupdate', (data: any) => {
              const percent = (data.percent * 100);
              trackVideoMilestone(percent);
            });
          } catch (error) {
            console.error('Error initializing Vimeo Player:', error);
          }
        }
      };
      
      initPlayer();
    }, 1000); // Wait 1 second for iframe to load

    // Hide sound prompt after 5 seconds
    const timer = setTimeout(() => {
      setShowSoundPrompt(false);
    }, 5000);

    return () => {
      videoContext.unregisterPlayer('video1');
      clearTimeout(initTimer);
      clearTimeout(timer);
    };
  }, [videoContext]);

  const handleUnmuteSoundPrompt = () => {
    setShowSoundPrompt(false);
    // Attempt to unmute the video
    if (playerRef.current) {
      playerRef.current.setMuted(false);
      playerRef.current.setVolume(1);
    }
  };

  const handleUnmuteClick = () => {
    if (playerRef.current) {
      playerRef.current.setMuted(false);
      playerRef.current.setVolume(1);
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 pt-2 sm:pt-8 pb-16 px-4 sm:px-6 lg:px-8" aria-labelledby="hero-heading">
      <div className="container mx-auto max-w-4xl">
        {/* Video player - large and centered */}
        <div className="relative mb-8">
          {/* Blinking UNMUTE VIDEO message */}
          {showUnmuteMessage && isVideoMuted && (
            <div className="flex justify-center mb-4">
              <button
                onClick={handleUnmuteClick}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-red-700 transition-colors cursor-pointer animate-pulse"
                aria-label="Unmute video"
              >
                <VolumeX className="size-6" />
                <span>UNMUTE VIDEO</span>
              </button>
            </div>
          )}
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
              <iframe 
                ref={iframeRef}
                src="https://player.vimeo.com/video/1164824132?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                title="Financial Freedom Strategy - Why You Are Here"
                aria-label="Financial freedom introductory video"
              />
            </div>
          </div>
          
          {/* Sound prompt overlay */}
          {showSoundPrompt && (
            <div 
              className="absolute top-4 right-4 bg-black/80 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 cursor-pointer hover:bg-black/90 transition-colors animate-in fade-in slide-in-from-top duration-300"
              onClick={handleUnmuteSoundPrompt}
              role="button"
              aria-label="Turn on sound for the best experience"
            >
              <Volume2 className="size-5 animate-pulse" />
              <span className="text-sm font-medium">Turn on sound for the best experience</span>
            </div>
          )}
        </div>
        
        {/* Headline and CTA below video */}
        <div className="text-center space-y-6">
          <h1 id="hero-heading" className="text-[1.7rem] sm:text-[2.1rem] lg:text-[2.6rem] tracking-tight leading-tight text-gray-900 max-w-7xl mx-auto">
            <span style={{ color: '#1a3a5c' }}>
              Discover How To Use Intentional Financial Structuring To Build Wealth & Erase Debt <span className="font-bold italic">FASTER</span> Without Giving Up Control Or Momentum.
            </span>
          </h1>
          
         <div className="flex justify-center pt-4">
            <Button 
              size="lg" 
              onClick={scrollToRegistration}
              className="text-white px-8 py-6 text-lg group"
              style={{ background: 'linear-gradient(to right, #1a3a5c, #c9a961)' }}
              aria-label="Get started with financial freedom consultation"
            >
              Get Started Today
              <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
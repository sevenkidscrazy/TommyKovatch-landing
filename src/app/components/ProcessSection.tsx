import { Card } from "@/app/components/ui/card";
import { GraduationCap, FileText, Target, AlertCircle, Rocket, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { useVideoContext } from "@/app/contexts/VideoContext";
import { CaseStudiesCarousel } from "@/app/components/CaseStudiesCarousel";

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const hasAutoplayedRef = useRef(false);
  const videoContext = useVideoContext();
  const [showUnmuteMessage, setShowUnmuteMessage] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [playerReady, setPlayerReady] = useState(false); // Track when player is ready

  // Initialize video2 player
  useEffect(() => {
    console.log('🎬 Video2: Starting initialization...');
    const initTimer = setTimeout(() => {
      const initPlayer = async () => {
        if (iframeRef.current) {
          try {
            console.log('🎬 Video2: Creating Vimeo Player instance...');
            playerRef.current = new Player(iframeRef.current);
            
            // Register this player with the video context
            videoContext.registerPlayer('video2', playerRef.current);
            console.log('✅ Video2: Player initialized and registered');
            
            // Track volume changes
            playerRef.current.on('volumechange', async (data: any) => {
              try {
                const muted = await playerRef.current?.getMuted();
                const isMuted = muted || data.volume === 0;
                setIsVideoMuted(isMuted);
                console.log('🔊 Video2: Volume changed - muted:', isMuted);
                
                // Hide the unmute message when unmuted
                if (!isMuted) {
                  setShowUnmuteMessage(false);
                }
              } catch (error) {
                console.log('Error checking mute state:', error);
              }
            });
            
            // Track play/pause state
            playerRef.current.on('play', () => {
              console.log('▶️ Video2: Playing');
              videoContext.setVideoPaused('video2', false);
              videoContext.pauseOtherVideos('video2');
            });
            
            playerRef.current.on('pause', () => {
              console.log('⏸️ Video2: Paused');
              videoContext.setVideoPaused('video2', true);
            });
            
            playerRef.current.on('ended', () => {
              console.log('⏹️ Video2: Ended');
              videoContext.setVideoEnded('video2', true);
            });
            
            // Set player ready
            setPlayerReady(true);
          } catch (error) {
            console.error('❌ Video2: Error initializing:', error);
          }
        } else {
          console.log('❌ Video2: iframe not found');
        }
      };
      
      initPlayer();
    }, 1500); // Wait 1.5 seconds for iframe to load

    return () => {
      console.log('🧹 Video2: Cleanup');
      videoContext.unregisterPlayer('video2');
      clearTimeout(initTimer);
    };
  }, [videoContext]);

  // Intersection Observer to detect when video2 is in view
  useEffect(() => {
    console.log('📍 Video2: Setting up intersection observer...');
    console.log('📍 Video2: playerReady:', playerReady);
    console.log('📍 Video2: containerRef.current:', !!containerRef.current);
    console.log('📍 Video2: playerRef.current:', !!playerRef.current);
    
    if (!playerReady || !containerRef.current || !playerRef.current) {
      console.log('⚠️ Video2: Cannot set up observer - waiting for player to be ready');
      return;
    }

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        console.log('👀 Video2: Intersection change - isIntersecting:', entry.isIntersecting, 'hasAutoplayed:', hasAutoplayedRef.current);
        
        if (entry.isIntersecting && !hasAutoplayedRef.current) {
          // Check conditions for autoplay
          const video1Ended = videoContext.hasVideo1Ended();
          const video1Paused = videoContext.isVideo1Paused();
          
          console.log('🔍 Video2: Checking autoplay conditions:', {
            video1Ended,
            video1Paused,
            shouldAutoplay: video1Ended || video1Paused
          });
          
          // Autoplay if video1 has ended OR video1 is paused
          if (video1Ended || video1Paused) {
            try {
              console.log('🎬 Video2: Attempting to autoplay...');
              // Play muted (browsers allow this)
              await playerRef.current?.play();
              hasAutoplayedRef.current = true;
              setShowUnmuteMessage(true); // Show unmute button
              
              console.log('✅ Video2: Autoplayed successfully (muted)');
            } catch (error) {
              console.log('❌ Video2: Could not autoplay:', error);
            }
          } else {
            console.log('⏸️ Video2: Autoplay blocked - Video1 still active');
          }
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of video is visible
      }
    );

    observer.observe(containerRef.current);
    console.log('✅ Video2: Intersection observer set up');

    // Also set up a polling mechanism to check state while in view
    const checkInterval = setInterval(async () => {
      if (hasAutoplayedRef.current) return;
      
      // Check if video2 is in view
      if (containerRef.current && playerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
          const video1Ended = videoContext.hasVideo1Ended();
          const video1Paused = videoContext.isVideo1Paused();
          
          console.log('🔄 Video2: Polling check - video1Ended:', video1Ended, 'video1Paused:', video1Paused);
          
          if (video1Ended || video1Paused) {
            try {
              console.log('🎬 Video2: Polling triggered autoplay...');
              // Play muted (browsers allow this)
              await playerRef.current?.play();
              hasAutoplayedRef.current = true;
              setShowUnmuteMessage(true); // Show unmute button
              
              console.log('✅ Video2: Polling autoplay successful (muted)');
            } catch (error) {
              console.log('❌ Video2: Polling autoplay failed:', error);
            }
          }
        }
      }
    }, 1000); // Check every second

    return () => {
      console.log('🧹 Video2: Cleaning up observer and polling');
      observer.disconnect();
      clearInterval(checkInterval);
    };
  }, [videoContext, playerReady]); // Add playerReady as dependency

  const steps = [
    {
      number: 1,
      icon: GraduationCap,
      title: "Financial Intake & Education",
      description: "Have your financial info on hand and be ready to learn.",
      color: "navy"
    },
    {
      number: 2,
      icon: FileText,
      title: "Strategy & Structuring",
      description: "Based on financial data provided, Tommy will structure your customized plan.",
      color: "gold"
    },
    {
      number: 3,
      icon: Target,
      title: "Action Plan Review",
      description: "Review your custom financial structure & strategy in detail.",
      color: "navy"
    },
    {
      number: 4,
      icon: AlertCircle,
      title: "The Path Forward",
      description: "Tommy will show you a clear path to achieve your financial objectives in 10 years or less, tailored to your unique situation.",
      color: "gold"
    },
    {
      number: 5,
      icon: Rocket,
      title: "Launch Your Strategy",
      description: "Your option to move forward with a customized budget-neutral finance restructure that eliminates the need to borrow ever again.",
      color: "navy"
    }
  ];

  const handleUnmuteClick = () => {
    if (playerRef.current) {
      playerRef.current.setMuted(false);
      playerRef.current.setVolume(1);
    }
  };

  // Debug helper
  const handleDebugClick = () => {
    console.log('🐛 DEBUG INFO:');
    console.log('- showUnmuteMessage:', showUnmuteMessage);
    console.log('- isVideoMuted:', isVideoMuted);
    console.log('- hasAutoplayed:', hasAutoplayedRef.current);
    console.log('- playerRef exists:', !!playerRef.current);
    console.log('- containerRef exists:', !!containerRef.current);
    console.log('- video1Ended:', videoContext.hasVideo1Ended());
    console.log('- video1Paused:', videoContext.isVideo1Paused());
  };

  return (
    <section id="process" className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A straightforward process designed to help you achieve your financial goals. These are the steps that Tommy is going to take you through when you meet with him.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            const navyClasses = "border-2";
            const navyGradient = { background: 'linear-gradient(to bottom right, #1a3a5c, #2a4a6c)' };
            const goldGradient = { background: 'linear-gradient(to bottom right, #c9a961, #d9b971)' };
            const gradient = step.color === "navy" ? navyGradient : goldGradient;
            const bgColor = step.color === "navy" ? { backgroundColor: '#f5f7fa' } : { backgroundColor: '#faf9f5' };
            const isGoalStep = step.number === 5;
            
            return (
              <Card key={step.number} className={`p-6 hover:shadow-xl transition-all ${navyClasses} ${isGoalStep ? 'scale-105' : ''} relative`} style={{ ...bgColor, ...(isGoalStep ? { boxShadow: '0 0 0 1px #c9a961, 0 0 20px rgba(201, 169, 97, 0.4), 0 0 40px rgba(201, 169, 97, 0.2), 0 10px 30px rgba(0, 0, 0, 0.15)' } : {}) }}>
                {isGoalStep && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white px-4 py-1 rounded-full text-sm shadow-lg" style={goldGradient}>
                    Your Goal
                  </div>
                )}
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <div className="size-16 rounded-full flex items-center justify-center mx-auto" style={gradient}>
                      <Icon className="size-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 size-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-sm text-gray-900">
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-xl text-gray-900">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-12 p-8 bg-white rounded-xl border-2 shadow-lg" style={{ borderColor: '#c9a961' }}>
          <div className="text-center">
            <h3 className="text-2xl text-gray-900 mb-3">
              A Complimentary Action Plan
            </h3>
            <p className="text-lg text-gray-600">
              Everyone receives a complimentary, no-obligation customized Action Plan. Just make sure you come prepared to your meeting with Tommy to make your time together as productive as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Case Studies Carousel */}
      <CaseStudiesCarousel />

      <div className="container mx-auto max-w-7xl">
        {/* Heading before second video */}
        <div className="text-center mt-12 mb-6">
          <h2 className="text-4xl sm:text-5xl text-gray-900">
            I Almost Forgot!
          </h2>
        </div>

        {/* Second Video Container - What to Bring Video */}
        <div ref={containerRef} className="mt-8 mx-auto" style={{ maxWidth: '960px' }}>
          {/* Blinking UNMUTE VIDEO message */}
          {showUnmuteMessage && isVideoMuted && (
            <div className="flex justify-center mb-4">
              <button
                onClick={handleUnmuteClick}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-red-700 transition-colors cursor-pointer animate-pulse"
              >
                <VolumeX className="size-6" />
                <span>UNMUTE VIDEO</span>
              </button>
            </div>
          )}
          
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe 
              ref={iframeRef}
              src="https://player.vimeo.com/video/1165064460?badge=0&autopause=0&player_id=0&app_id=58479&muted=1" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
              title="WhatToBring"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>

        <div className="mt-8 p-8 bg-white rounded-xl border-2 shadow-lg max-w-4xl mx-auto" style={{ borderColor: '#1a3a5c' }}>
          <div className="text-center">
            <h3 className="text-2xl text-gray-900 mb-4">
              What to Bring
            </h3>
            <ul className="text-left max-w-3xl mx-auto space-y-2">
              <li className="text-lg text-gray-600 flex items-start">
                <span className="mr-3" style={{ color: '#c9a961' }}>•</span>
                <span>All debt balances (mortgage, credit cards, personal loans, student loans, car loans, etc)</span>
              </li>
              <li className="text-lg text-gray-600 flex items-start">
                <span className="mr-3" style={{ color: '#c9a961' }}>•</span>
                <span>Current interest rates for each debt account</span>
              </li>
              <li className="text-lg text-gray-600 flex items-start">
                <span className="mr-3" style={{ color: '#c9a961' }}>•</span>
                <span>Current debt payments for each, including minimum and actual if paying above the minimums</span>
              </li>
              <li className="text-lg text-gray-600 flex items-start">
                <span className="mr-3" style={{ color: '#c9a961' }}>•</span>
                <span>All savings account balances including retirement accounts, if applicable (401k, IRA, 403b, etc)</span>
              </li>
              <li className="text-lg text-gray-600 flex items-start">
                <span className="mr-3" style={{ color: '#c9a961' }}>•</span>
                <span>Amounts being contributed to each savings or retirement account</span>
              </li>
              <li className="text-lg text-gray-600 flex items-start">
                <span className="mr-3" style={{ color: '#c9a961' }}>•</span>
                <span>Income (weekly, monthly, W-2 and side hustles)</span>
              </li>
              <li className="text-lg text-gray-600 flex items-start">
                <span className="mr-3" style={{ color: '#c9a961' }}>•</span>
                <span>Any existing insurance policies you are paying toward</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
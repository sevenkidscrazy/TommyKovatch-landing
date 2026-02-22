import { createContext, useContext, useRef, useState, ReactNode } from 'react';
import Player from '@vimeo/player';

interface VideoContextType {
  registerPlayer: (id: string, player: Player) => void;
  unregisterPlayer: (id: string) => void;
  pauseOtherVideos: (currentId: string) => void;
  setVideoEnded: (id: string, ended: boolean) => void;
  setVideoPaused: (id: string, paused: boolean) => void;
  hasVideo1Ended: () => boolean;
  isVideo1Paused: () => boolean;
  isVideo1Playing: () => boolean;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
  const playersRef = useRef<Map<string, Player>>(new Map());
  const videoStates = useRef<Map<string, { ended: boolean; paused: boolean }>>(new Map());

  const registerPlayer = (id: string, player: Player) => {
    playersRef.current.set(id, player);
    videoStates.current.set(id, { ended: false, paused: false });
  };

  const unregisterPlayer = (id: string) => {
    playersRef.current.delete(id);
    videoStates.current.delete(id);
  };

  const pauseOtherVideos = async (currentId: string) => {
    for (const [id, player] of playersRef.current.entries()) {
      if (id !== currentId) {
        try {
          await player.pause();
        } catch (error) {
          console.log(`Could not pause video ${id}:`, error);
        }
      }
    }
  };

  const setVideoEnded = (id: string, ended: boolean) => {
    const state = videoStates.current.get(id);
    if (state) {
      state.ended = ended;
    }
  };

  const setVideoPaused = (id: string, paused: boolean) => {
    const state = videoStates.current.get(id);
    if (state) {
      state.paused = paused;
    }
  };

  const hasVideo1Ended = () => {
    return videoStates.current.get('video1')?.ended || false;
  };

  const isVideo1Paused = () => {
    return videoStates.current.get('video1')?.paused || false;
  };

  const isVideo1Playing = () => {
    const state = videoStates.current.get('video1');
    return state ? !state.paused && !state.ended : false;
  };

  return (
    <VideoContext.Provider
      value={{
        registerPlayer,
        unregisterPlayer,
        pauseOtherVideos,
        setVideoEnded,
        setVideoPaused,
        hasVideo1Ended,
        isVideo1Paused,
        isVideo1Playing,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideoContext() {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
}

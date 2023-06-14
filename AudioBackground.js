import React, { useEffect } from 'react';
import { Audio } from 'expo-av';

const AudioBackground = ({ source, isLooping = true, play = true }) => {
  useEffect(() => {
    let sound;

    const playAudio = async () => {
      sound = new Audio.Sound();

      try {
        await sound.loadAsync(source);
        if (isLooping) {
          await sound.setIsLoopingAsync(true);
        }
        if (play) {
          await sound.playAsync();
        } else {
          await sound.stopAsync();
        }
      } catch (error) {
        console.warn('Failed to load background sound', error);
      }
    };

    playAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [source, isLooping, play]);

  return null;
};

export default AudioBackground;

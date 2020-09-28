import React from "react";

export default function useSound(
  url,
  {
    volume = 1,
    playbackRate = 1,
    soundEnabled = true,
    interrupt = false,
    onload,
    ...delegated
  } = {}
) {
  const HowlConstructor = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(null);
  const [sound, setSound] = React.useState(null);


  const handleLoad = () => {
    if (typeof onload === "function") {
      onload.call(sound);
    }
    if (sound) setDuration(sound.duration() * 1000);
  };

  React.useEffect(() => {
    let isCancelled = false;
    import("howler").then((mod) => {
      if (!isCancelled) {
        HowlConstructor.current = mod.Howl;

        const sound = new HowlConstructor.current({
          src: [url],
          volume,
          rate: playbackRate,
          onload: handleLoad,
          ...delegated,
        });

        setSound(sound);
      }
    });
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (HowlConstructor.current && sound) {
      setSound(
        new HowlConstructor.current({
          src: [url],
          volume,
          onload: handleLoad,
          ...delegated,
        })
      );
    }
    // The linter wants to run this effect whenever ANYTHING changes,
    // but very specifically I only want to recreate the Howl instance
    // when the `url` changes. Other changes should have no effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  React.useEffect(() => {
    if (sound) {
      sound.volume(volume);
      sound.rate(playbackRate);
    }
    // A weird bug means that including the `sound` here can trigger an
    // error on unmount, where the state loses track of the sprites??
    // No idea, but anyway I don't need to re-run this if only the `sound`
    // changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume, playbackRate]);

  const play = React.useCallback(
    (options) => {
      if (typeof options === "undefined") {
        options = {};
      }

      if (!sound || (!soundEnabled && !options.forceSoundEnabled)) {
        return;
      }

      if (interrupt) {
        sound.stop();
      }

      if (options.playbackRate) {
        sound.rate(options.playbackRate);
      }

      sound.play(options.id);

      sound.once("end", () => setIsPlaying(false));

      setIsPlaying(true);
    },
    [sound, soundEnabled, interrupt]
  );

  const stop = React.useCallback(
    (id) => {
      if (!sound) {
        return;
      }
      sound.stop(id);
      setIsPlaying(false);
    },
    [sound]
  );

  const pause = React.useCallback(
    (id) => {
      if (!sound) {
        return;
      }
      sound.pause(id);
      setIsPlaying(false);
    },
    [sound]
  );

  const returnedValue = [
    play,
    {
      sound,
      stop,
      pause,
      isPlaying,
      duration,
    },
  ];

  return returnedValue;
}

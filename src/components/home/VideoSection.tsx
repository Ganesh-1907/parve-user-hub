import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import video from '@/assets/reel.mp4';
import hero3 from '@/assets/hero-2.png';
export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-12 md:py-12 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Experience Pure Beauty
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Watch how our pure, carefully crafted products transform your skincare routine
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-medium animate-fade-in">
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            loop
            muted={isMuted}
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            poster={hero3}
          >
            <source
              src={video}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Play/Pause Overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity ${
              isPlaying
                ? "opacity-0 pointer-events-none"
                : "opacity-100 bg-foreground/10 hover:bg-foreground/20"
            }`}
          >
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-card transition-all hover:scale-110"
              >
                <Play className="w-8 h-8 text-foreground ml-1" />
              </button>
            )}
          </div>

          {/* Pause Button */}
          {isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-card transition-all"
            >
              <Pause className="w-5 h-5 text-foreground" />
            </button>
          )}

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-card transition-all"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-foreground" />
            ) : (
              <Volume2 className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

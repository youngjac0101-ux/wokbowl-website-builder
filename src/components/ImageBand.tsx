import { useState } from "react";

const ImageBand = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative w-full overflow-hidden" aria-label="Featured image" style={{ height: "clamp(200px, 40vw, 480px)" }}>
      {imgError ? (
        <div className="h-full w-full bg-secondary flex items-center justify-center">
          <div className="text-center">
            <span className="text-5xl block mb-3" aria-hidden="true">🔥</span>
            <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Photo coming soon
            </p>
          </div>
        </div>
      ) : (
        <img
          src="/images/hero/band.jpg"
          alt="The WOKBOWL counter — Sydney Asian Kitchen, Neutral Bay"
          className="h-full w-full object-cover object-center"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}
    </section>
  );
};

export default ImageBand;

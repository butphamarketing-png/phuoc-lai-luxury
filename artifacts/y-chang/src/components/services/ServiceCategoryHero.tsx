const POPUP_VERSION = "20260528";

const HUB_IMAGES = [
  { src: `/pop-up-2.jpg?v=${POPUP_VERSION}`, alt: "Promotion Left" },
  { src: `/pop-up-1.jpg?v=${POPUP_VERSION}`, alt: "Promotion Center" },
  { src: `/pop-up-2.jpg?v=${POPUP_VERSION}`, alt: "Promotion Right" },
] as const;

export default function ServiceCategoryHero() {
  return (
    <div className="flex w-full flex-row bg-black">
      {HUB_IMAGES.map((image, index) => (
        <div
          key={image.src}
          className="relative w-1/3 aspect-[3/4] overflow-hidden md:aspect-[4/5]"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
          />
          {index === 1 && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
          )}
        </div>
      ))}
    </div>
  );
}

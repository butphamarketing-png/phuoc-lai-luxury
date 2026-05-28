import { POPUP_HUB_IMAGES } from "@/lib/popup-images";

export default function ServiceCategoryHero() {
  return (
    <div className="flex w-full flex-row bg-black">
      {POPUP_HUB_IMAGES.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
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

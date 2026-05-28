/** Cache-bust when popup assets change */
export const POPUP_VERSION = "20260528b";

export const POPUP_IMAGES = {
  one: `/pop-up-1.jpg?v=${POPUP_VERSION}`,
  two: `/pop-up-2.jpg?v=${POPUP_VERSION}`,
  three: `/pop-up-3.jpg?v=${POPUP_VERSION}`,
} as const;

export const POPUP_SLIDES = [
  POPUP_IMAGES.one,
  POPUP_IMAGES.two,
  POPUP_IMAGES.three,
] as const;

export const POPUP_MASTERS = [
  { img: POPUP_IMAGES.three, name: "Master Nhung Lai" },
  { img: POPUP_IMAGES.one, name: "Master Phuoc Lai" },
  { img: POPUP_IMAGES.two, name: "Master Cam Lai" },
] as const;

export const POPUP_HUB_IMAGES = [
  { src: POPUP_IMAGES.three, alt: "Master Nhung Lai" },
  { src: POPUP_IMAGES.one, alt: "Master Phuoc Lai" },
  { src: POPUP_IMAGES.two, alt: "Master Cam Lai" },
] as const;

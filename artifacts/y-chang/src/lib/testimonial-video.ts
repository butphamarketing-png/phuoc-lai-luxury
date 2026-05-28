/** YouTube video ID — https://youtube.com/shorts/PitJegneQtc */
export const TESTIMONIAL_YOUTUBE_ID = "PitJegneQtc";

export function testimonialEmbedUrl(id = TESTIMONIAL_YOUTUBE_ID): string {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&showinfo=0`;
}

import { ViewTransition, type ReactNode } from "react";

/* Card opens into the piece.

   A WorkCard's 16:10 frame and the first figure on /work/samples/[slug]
   share one view-transition name per slug (work-media-<slug>). Next 16 runs
   App Router navigations as transitions, and React's <ViewTransition> wraps
   the commit in document.startViewTransition, so clicking a card morphs its
   frame into the sample's first image. Any in-app link whose destination
   shows the same piece in view morphs the same way, for example a "More like
   this" card into its own sample page. Cards with custom `media` morph too,
   because the name sits on the frame, not the image inside it.

   Needs data-scroll-behavior="smooth" on <html> (src/app/layout.tsx). Without
   it, Next smooth-scrolls to the top of the new page, the sample image is
   still off screen when React measures it, and the morph never pairs.

   Rules both ends must follow:
   - Same `name`, `share`, and `default`. With default="none" and no `share`,
     the pair silently stops morphing.
   - default="none" keeps every named frame still during unrelated
     transitions (filter changes, other navigations).
   - One frame per slug per page. Two mounted names that match make React log
     an error and the browser skip the transition.

   React names the old frame as soon as a match exists on the new page, but
   only names the new one if it lands in the viewport. When it doesn't (the
   card sits further down the new page), the old frame is left alone in its
   group (:only-child) and is hidden at once, so neighboring cards don't
   linger as ghosts over the new page. Browsers without the View Transitions
   API, and prefers-reduced-motion, get a plain navigation.

   Browser Back does not morph: React renders popstate navigations
   synchronously (to keep scroll restoration exact), and synchronous commits
   skip view transitions. Back restores the previous page and its scroll
   position instantly.

   The <style> carries href + precedence so React hoists it into <head> once,
   however many cards render, and keeps it there across navigations. */

export const workMediaName = (slug: string) => `work-media-${slug}`;

const CSS = `
::view-transition-group(.work-media) {
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
::view-transition-old(.work-media),
::view-transition-new(.work-media) {
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
::view-transition-old(.work-media):only-child {
  animation: none;
  opacity: 0;
}
::view-transition {
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-image-pair(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
  }
}
`;

export function WorkMediaTransition({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <>
      <style href="work-media-transition" precedence="default">{CSS}</style>
      <ViewTransition name={workMediaName(slug)} share="work-media" default="none">
        {children}
      </ViewTransition>
    </>
  );
}

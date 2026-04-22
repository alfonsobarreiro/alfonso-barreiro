import ProblemSlide from "./_ProblemSlide";

export default function Slide4() {
  return (
    <ProblemSlide
      index={4}
      number="01"
      title="Onboarding friction."
      lead="The multi-step signup was the most cited pain point. Users dropped off mid-flow."
      paragraphs={[
        "Steps felt repetitive. There was no clear signal of progress or what the form was building toward.",
        "For a discovery platform, the signup flow is the first act of discovery. If it feels like paperwork, the product has already failed its promise.",
      ]}
    />
  );
}

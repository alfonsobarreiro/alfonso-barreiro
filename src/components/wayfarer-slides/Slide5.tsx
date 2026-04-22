import ProblemSlide from "./_ProblemSlide";

export default function Slide5() {
  return (
    <ProblemSlide
      index={5}
      number="02"
      title="Layout inconsistency."
      lead="The design didn’t hold together across screen sizes. Hierarchy broke on mobile."
      paragraphs={[
        "Spacing shifted unpredictably. Components that looked intentional on desktop felt accidental on smaller viewports.",
        "This isn’t a cosmetic problem. Inconsistency erodes trust, and trust is the currency of a platform asking users to plan a trip they haven’t taken yet.",
      ]}
    />
  );
}

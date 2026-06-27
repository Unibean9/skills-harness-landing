import { HeroStepper } from "./hero-stepper";
import { HeroWorkspace } from "./hero-workspace";

export function HeroGallery() {
  return (
    <div className="hero-gallery hidden w-full min-w-0 md:grid md:grid-cols-[minmax(152px,176px)_minmax(0,1fr)] md:items-start md:gap-5 lg:gap-7 xl:gap-9">
      <HeroStepper />
      <HeroWorkspace />
    </div>
  );
}

import type { HeroWorkflowTone } from "./content";

export function stepToneColor(tone: HeroWorkflowTone) {
  const tones = {
    sky: "#6a9bcc",
    clay: "#d97757",
    olive: "#788c5d",
    ink: "#141413",
    terracotta: "#c96442",
  } as const;
  return tones[tone];
}

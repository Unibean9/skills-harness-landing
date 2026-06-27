import { heroWorkflowSteps } from "../content";
import { stepToneColor } from "../step-tone-color";

export function HeroStepper() {
  return (
    <div className="hero-stepper relative flex min-h-[620px] flex-col justify-between py-8 lg:min-h-[680px]" aria-hidden="true">
      <div className="absolute bottom-2 left-[6px] top-2 w-px bg-[#d9d4c7]" />
      {heroWorkflowSteps.map((step) => (
        <div key={step.title} className="hero-step relative z-10">
          <div className="flex items-start gap-3">
            <span
              className="relative z-10 mt-1 size-3 shrink-0 rounded-full border-2 bg-[#faf9f5]"
              style={{ borderColor: stepToneColor(step.tone) }}
            />
            <div className="min-w-0 pr-2">
              <p className="font-mono text-xs font-black leading-none" style={{ color: stepToneColor(step.tone) }}>
                {step.num} {step.title}
              </p>
              <p className="mt-2 text-xs font-medium leading-[1.4] text-[#343430]">{step.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

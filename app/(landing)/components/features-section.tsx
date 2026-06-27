import { bestFeatures } from "./content";
import { SectionLabel } from "./section-label";

export function FeaturesSection() {
  return (
    <section className="reveal-block bg-[#f0eee6] px-4 py-16 md:px-6 lg:px-10 lg:py-24">
      <div className="mb-12 max-w-[780px]">
        <SectionLabel>TÍNH NĂNG ĐÁNG GIÁ</SectionLabel>
        <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
          Không chỉ là một bộ prompt
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {bestFeatures.map((feature, index) => (
          <article key={feature.title} className={index === 1 ? "bg-[#141413] p-6 text-[#faf9f5]" : "border border-[#dedacf] bg-[#faf9f5] p-6"}>
            <feature.icon className={index === 1 ? "mb-6 size-6 text-[#d97757]" : "mb-6 size-6 text-[#c96442]"} />
            <h3 className="text-2xl font-black">{feature.title}</h3>
            <p className={index === 1 ? "mt-3 text-base leading-7 text-[#d8d4c9]" : "mt-3 text-base leading-7 text-[#5e5d59]"}>{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

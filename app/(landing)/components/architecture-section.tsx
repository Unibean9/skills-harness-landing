export function ArchitectureSection() {
  return (
    <section id="architecture" className="reveal-block bg-[#f0eee6] px-4 py-4 md:px-6">
      <div className="grid border border-[#e1ded2] bg-[#faf9f5] lg:grid-cols-2">
        <article className="flex h-full flex-col border-b border-[#e1ded2] p-8 lg:border-r lg:p-12">
          <p className="font-mono text-sm font-black text-[#c96442]">01</p>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.035em] md:text-6xl">PRODUCT.md là trí nhớ chiến lược.</h2>
          <p className="mt-8 flex-1 text-lg leading-8 text-[#343430]">
            File này trả lời “đang thiết kế cho ai, để làm gì, tránh điều gì, nguyên tắc nào quan trọng”.
            Khi agent chạy `/fk plan`, `/fk build`, `/fk review`, nó không đoán brief từ prompt ngắn nữa.
          </p>
          <div className="mt-10 flex min-h-[280px] w-full flex-col border border-[#d9d4c7] bg-[#faf9f5] font-mono text-sm">
            <div className="border-b border-[#d9d4c7] bg-[#f0eee6] px-5 py-3 text-[#5e5d59]">PRODUCT.md · loaded before intent</div>
            <div className="flex flex-1 flex-col justify-center space-y-2 p-5 leading-7">
              <p><span className="text-[#788c5d]">✓</span> users, purpose, register</p>
              <p><span className="text-[#788c5d]">✓</span> brand personality, anti-references</p>
              <p><span className="text-[#788c5d]">✓</span> design principles and accessibility</p>
              <p><span className="text-[#c96442]">→</span> every command starts from the same product truth</p>
            </div>
          </div>
        </article>
        <article className="flex h-full flex-col border-b border-[#e1ded2] p-8 lg:p-12">
          <p className="font-mono text-sm font-black text-[#c96442]">02</p>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.035em] md:text-6xl">DESIGN.md là trí nhớ thị giác.</h2>
          <p className="mt-8 flex-1 text-lg leading-8 text-[#343430]">
            File này mô tả màu, type, spacing, component conventions và visual system. Agent dùng nó để
            khớp style hiện có thay vì phát minh lại mỗi lần.
          </p>
          <div className="mt-10 flex min-h-[280px] w-full flex-col border border-[#d9d4c7] bg-[#faf9f5] text-sm">
            {[
              ["TOKENS", "Colors, fonts, radius, spacing scale."],
              ["COMPONENTS", "Button, card, input, table, navigation patterns."],
              ["LAYOUT", "Grid, density, section rhythm, responsive rules."],
              ["MOTION", "Easing, reduced motion, interaction behavior."],
            ].map(([label, text]) => (
              <div key={label} className="grid flex-1 gap-4 border-b border-[#e8e6dc] px-5 py-4 last:border-0 sm:grid-cols-[120px_1fr] sm:items-center">
                <span className="font-mono font-black text-[#c96442]">{label}</span>
                <span className="font-semibold text-[#343430]">{text}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="border-b border-[#e1ded2] p-8 lg:border-r lg:border-b-0 lg:p-12">
          <p className="font-mono text-sm font-black text-[#c96442]">03</p>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.035em] md:text-6xl">Áp dụng vào từng lệnh.</h2>
          <p className="mt-8 max-w-[54ch] text-lg leading-8 text-[#343430]">
            `/fk plan` dùng PRODUCT.md để hỏi đúng. `/fk build` dùng DESIGN.md để code đúng hệ.
            `/fk check` và detector soi lại output theo rule cụ thể.
          </p>
        </article>
        <article className="p-8 lg:p-12">
          <p className="font-mono text-sm font-black text-[#c96442]">04</p>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.035em] md:text-6xl">Quan trọng vì nó sống cùng dự án.</h2>
          <p className="mt-8 max-w-[68ch] text-lg leading-8 text-[#343430]">
            Hai file này có thể commit, review, cập nhật và dùng lại giữa nhiều agent. Team không phụ thuộc
            vào trí nhớ của một phiên chat.
          </p>
        </article>
      </div>
    </section>
  );
}

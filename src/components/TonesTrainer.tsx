import { useState } from "react";
import { speakChinese } from "@/lib/speak";

const TONES = [
  { mark: "mā", hanzi: "妈", meaning: "أم", tone: 1, desc: "نغمة عالية مستوية — اصرخ كأنك تنادي من بعيد" },
  { mark: "má", hanzi: "麻", meaning: "كتّان", tone: 2, desc: "صاعدة — كأنك تسأل: ها؟" },
  { mark: "mǎ", hanzi: "马", meaning: "حصان", tone: 3, desc: "نازلة ثم صاعدة — كأنك متردد" },
  { mark: "mà", hanzi: "骂", meaning: "يوبّخ", tone: 4, desc: "هابطة حادة — كأنك تصدر أمراً" },
];

export function TonesTrainer({ onPlay }: { onPlay?: () => void }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-luffy-yellow border-y-4 border-ink py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 halftone opacity-10 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <div className="mb-10 text-center">
          <div className="inline-block bg-ink text-luffy-yellow px-3 py-1 font-mono text-xs mb-3 -rotate-1">
            ★ TONE BATTLE ★
          </div>
          <h2 className="text-3xl sm:text-5xl font-black">معركة النغمات الأربع</h2>
          <p className="mt-3 text-ink/80 max-w-2xl mx-auto">
            نفس الحرف، أربع نبرات، أربعة معاني مختلفة. اضغط على كل نغمة واستمع للفرق!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TONES.map((t) => (
            <button
              key={t.tone}
              onMouseEnter={() => setActive(t.tone)}
              onClick={() => {
                speakChinese(t.hanzi);
                onPlay?.();
              }}
              className="group bg-parchment border-4 border-ink p-5 text-right hover:-translate-y-1 hover:shadow-impact-sm transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 bg-luffy-red text-white size-10 flex items-center justify-center font-black border-b-2 border-r-2 border-ink">
                {t.tone}
              </div>
              <div className="font-chinese text-6xl font-black mb-2 text-ink">{t.hanzi}</div>
              <div className="font-mono text-2xl text-luffy-red font-bold">{t.mark}</div>
              <div className="text-sm font-bold mt-1">{t.meaning}</div>
              <div
                className={`text-xs text-ink/60 mt-3 transition-opacity ${
                  active === t.tone ? "opacity-100" : "opacity-60"
                }`}
              >
                {t.desc}
              </div>
              <div className="mt-3 text-xs font-mono opacity-50 group-hover:opacity-100">🔊 اضغط للسماع</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { speakChinese } from "@/lib/speak";

type Card = { hanzi: string; pinyin: string; meaning: string };

const DECK: Card[] = [
  { hanzi: "海", pinyin: "hǎi", meaning: "بحر" },
  { hanzi: "船", pinyin: "chuán", meaning: "سفينة" },
  { hanzi: "宝藏", pinyin: "bǎo zàng", meaning: "كنز" },
  { hanzi: "自由", pinyin: "zì yóu", meaning: "حرية" },
  { hanzi: "力量", pinyin: "lì liàng", meaning: "قوة" },
  { hanzi: "战斗", pinyin: "zhàn dòu", meaning: "قتال" },
  { hanzi: "伙伴", pinyin: "huǒ bàn", meaning: "رفيق" },
  { hanzi: "冒险", pinyin: "mào xiǎn", meaning: "مغامرة" },
];

export function FlashCards() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const c = DECK[i];

  const next = () => {
    setFlipped(false);
    setI((x) => (x + 1) % DECK.length);
  };
  const prev = () => {
    setFlipped(false);
    setI((x) => (x - 1 + DECK.length) % DECK.length);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between text-xs font-mono mb-3 text-ink/60">
        <span>بطاقة {i + 1} / {DECK.length}</span>
        <span>قاموس القراصنة</span>
      </div>

      <button
        onClick={() => {
          setFlipped((f) => !f);
          if (!flipped) speakChinese(c.hanzi);
        }}
        className="w-full aspect-[4/3] border-b-[12px] border-r-[12px] border-ink bg-parchment p-6 flex flex-col items-center justify-center text-ink relative overflow-hidden hover:-rotate-1 transition-transform"
      >
        <div className="absolute top-2 right-2 bg-luffy-red text-white px-2 py-0.5 text-[10px] font-mono">
          {flipped ? "المعنى" : "اضغط للقلب"}
        </div>
        {!flipped ? (
          <>
            <div className="font-chinese text-[110px] sm:text-[140px] leading-none font-black">{c.hanzi}</div>
            <div className="font-mono text-xl text-luffy-red mt-2">{c.pinyin}</div>
          </>
        ) : (
          <>
            <div className="text-3xl sm:text-4xl font-black">{c.meaning}</div>
            <div className="font-chinese text-3xl text-luffy-red mt-3">{c.hanzi}</div>
            <div className="font-mono text-sm mt-1">{c.pinyin}</div>
          </>
        )}
      </button>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <button onClick={prev} className="border-4 border-ink py-3 font-black bg-parchment hover:bg-luffy-yellow">
          ←
        </button>
        <button
          onClick={() => speakChinese(c.hanzi)}
          className="border-4 border-ink py-3 font-black bg-parchment hover:bg-luffy-yellow"
        >
          🔊
        </button>
        <button onClick={next} className="border-4 border-ink py-3 font-black bg-luffy-red text-white hover:bg-ink">
          →
        </button>
      </div>
    </div>
  );
}

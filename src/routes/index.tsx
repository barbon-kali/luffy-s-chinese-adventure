import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MascotSprite, MASCOT_META, type MascotId } from "@/components/MascotSprite";
import { TonesTrainer } from "@/components/TonesTrainer";
import { FlashCards } from "@/components/FlashCards";
import { useProgress } from "@/hooks/use-progress";
import { speakChinese } from "@/lib/speak";

export const Route = createFileRoute("/")({
  component: Index,
});

type Lesson = {
  hanzi: string;
  pinyin: string;
  answer: string;
  choices: string[];
};

const LESSONS: Lesson[] = [
  { hanzi: "你好", pinyin: "nǐ hǎo", answer: "مرحباً", choices: ["وداعاً", "مرحباً", "شكراً"] },
  { hanzi: "海贼", pinyin: "hǎi zéi", answer: "قرصان", choices: ["بحّار", "قرصان", "كنز"] },
  { hanzi: "朋友", pinyin: "péng yǒu", answer: "صديق", choices: ["عدو", "صديق", "أخ"] },
  { hanzi: "梦想", pinyin: "mèng xiǎng", answer: "حلم", choices: ["نوم", "حلم", "ذكرى"] },
  { hanzi: "船长", pinyin: "chuán zhǎng", answer: "قبطان", choices: ["جندي", "طبّاخ", "قبطان"] },
  { hanzi: "战斗", pinyin: "zhàn dòu", answer: "قتال", choices: ["قتال", "سلام", "نوم"] },
  { hanzi: "谢谢", pinyin: "xiè xiè", answer: "شكراً", choices: ["شكراً", "آسف", "حسناً"] },
  { hanzi: "再见", pinyin: "zài jiàn", answer: "وداعاً", choices: ["مرحباً", "وداعاً", "صباح الخير"] },
  { hanzi: "勇气", pinyin: "yǒng qì", answer: "شجاعة", choices: ["خوف", "ذكاء", "شجاعة"] },
  { hanzi: "大海", pinyin: "dà hǎi", answer: "محيط", choices: ["جبل", "محيط", "نهر"] },
];

const SHOUTS = {
  correct: ["سوغوي! إجابة صحيحة!", "ياااهوو! أنت قرصان حقيقي!", "ممتاز! XP+10!"],
  wrong: ["إيييه؟! ليست هذه!", "ما هذا؟! حاول مرة أخرى!", "كاد قلبي يتوقف!"],
  idle: ["اختر إجابتك أيها القرصان!", "أنا جائع... وأنتظر إجابتك!", "اضغط الصوت لتسمع النطق!"],
};

function Index() {
  const [mascot, setMascot] = useState<MascotId>("hat");
  const { progress, hydrated, addXp, markLearned, setBestStreak, toggleDark, toggleSound, reset } =
    useProgress();

  return (
    <div className="min-h-screen bg-background font-display text-ink overflow-x-hidden">
      <Nav
        mascot={mascot}
        setMascot={setMascot}
        xp={progress.xp}
        dark={progress.dark}
        sound={progress.sound}
        onToggleDark={toggleDark}
        onToggleSound={toggleSound}
        onReset={reset}
      />
      <Hero mascot={mascot} xp={progress.xp} learned={progress.learned.length} best={progress.bestStreak} />
      <LessonSection
        mascot={mascot}
        soundOn={progress.sound}
        learned={progress.learned}
        onCorrect={(hanzi) => {
          addXp(10);
          markLearned(hanzi);
        }}
        onStreakChange={setBestStreak}
        hydrated={hydrated}
      />
      <TonesTrainer onPlay={() => addXp(1)} />
      <Roadmap learnedCount={progress.learned.length} />
      <Footer />
    </div>
  );
}

function Nav({
  mascot,
  setMascot,
  xp,
  dark,
  sound,
  onToggleDark,
  onToggleSound,
  onReset,
}: {
  mascot: MascotId;
  setMascot: (m: MascotId) => void;
  xp: number;
  dark: boolean;
  sound: boolean;
  onToggleDark: () => void;
  onToggleSound: () => void;
  onReset: () => void;
}) {
  const ids: MascotId[] = ["hat", "hoodie", "ribbon"];
  return (
    <nav className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b-4 border-ink px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-4">
        <div className="bg-luffy-red text-white font-black px-3 sm:px-4 py-1 -rotate-2 border-2 border-ink text-lg sm:text-2xl shadow-impact-sm">
          أكاديمية لوفي
        </div>
        <div className="hidden md:flex gap-6 font-bold text-sm">
          <a href="#lesson" className="hover:text-luffy-red transition-colors">الدروس</a>
          <a href="#tones" className="hover:text-luffy-red transition-colors">النغمات</a>
          <a href="#roadmap" className="hover:text-luffy-red transition-colors">الخريطة</a>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:flex items-center gap-1 border-2 border-ink p-1 bg-parchment">
          {ids.map((id) => (
            <button
              key={id}
              onClick={() => setMascot(id)}
              aria-label={MASCOT_META[id].name}
              title={MASCOT_META[id].name}
              className={`size-9 overflow-hidden border-2 transition-all ${
                mascot === id ? "border-luffy-red scale-110" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <MascotSprite id={id} mood="idle" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        <div
          className="hidden sm:flex items-center gap-1 bg-ink text-luffy-yellow px-3 py-1 font-mono text-xs font-bold border-2 border-ink"
          title="نقاط الخبرة"
        >
          ⚡ XP {xp}
        </div>
        <button
          onClick={onToggleSound}
          aria-label="تبديل الصوت"
          title={sound ? "الصوت مفعّل" : "الصوت متوقف"}
          className="size-10 bg-parchment border-2 border-ink flex items-center justify-center font-black hover:bg-luffy-yellow"
        >
          {sound ? "🔊" : "🔇"}
        </button>
        <button
          onClick={onToggleDark}
          aria-label="تبديل الوضع الليلي"
          title="الوضع الليلي"
          className="size-10 bg-luffy-yellow border-2 border-ink flex items-center justify-center font-black hover:bg-ink hover:text-luffy-yellow transition-colors"
        >
          {dark ? "☀" : "🌙"}
        </button>
        <button
          onClick={() => {
            if (confirm("إعادة كل التقدم؟")) onReset();
          }}
          aria-label="إعادة التقدم"
          title="إعادة التقدم"
          className="hidden sm:flex size-10 bg-parchment border-2 border-ink items-center justify-center font-black hover:bg-luffy-red hover:text-white transition-colors"
        >
          ↺
        </button>
      </div>
    </nav>
  );
}

function Hero({
  mascot,
  xp,
  learned,
  best,
}: {
  mascot: MascotId;
  xp: number;
  learned: number;
  best: number;
}) {
  return (
    <section className="relative py-16 sm:py-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
      <div className="absolute inset-0 speed-lines pointer-events-none opacity-50" aria-hidden />

      <div className="flex-1 relative z-10 animate-fade-up">
        <div className="inline-flex items-center gap-2 mb-6 bg-ink text-luffy-yellow px-3 py-1 font-mono text-xs -rotate-1">
          <span>★ LEVEL UP YOUR 中文 ★</span>
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[1.05] mb-6 drop-shadow-[4px_4px_0px_var(--luffy-yellow)]">
          كُن مَلِك
          <br />
          <span className="text-luffy-red">القراصنة</span>
          <br />
          فِي الصينية!
        </h1>
        <p className="text-lg sm:text-xl max-w-[42ch] mb-10 text-ink/80 leading-relaxed">
          منصة تفاعلية تُحوّل تعلّم الماندرين إلى مغامرة شَونِن. تعابير حيّة، نطق حماسي، وتحديات لن تنساها.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#lesson" className="group relative inline-flex">
            <span className="absolute inset-0 bg-ink translate-x-2 translate-y-2" />
            <span className="relative bg-luffy-red text-white px-8 sm:px-10 py-4 sm:py-5 text-xl sm:text-2xl font-black border-4 border-ink group-hover:translate-x-1 group-hover:translate-y-1 transition-transform">
              ابدأ المغامرة الآن ⚔
            </span>
          </a>
          <a href="#tones" className="inline-flex items-center px-6 py-4 border-4 border-ink font-bold hover:bg-luffy-yellow transition-colors">
            تدرّب على النغمات
          </a>
        </div>

        <div className="mt-12 flex flex-wrap gap-6 text-sm font-bold">
          <Stat value={String(xp)} label="نقطة خبرة" />
          <Stat value={String(learned)} label="كلمة محفوظة" />
          <Stat value={String(best)} label="أفضل سلسلة" />
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center min-h-[420px]">
        <div className="absolute size-72 sm:size-96 bg-luffy-yellow rounded-full -z-10 blur-3xl opacity-40" />
        <div className="relative animate-bounce-slow">
          <MascotSprite id={mascot} pose="full" className="w-72 sm:w-[28rem] h-auto drop-shadow-[6px_6px_0px_var(--ink)]" />
        </div>
        <div className="absolute top-4 right-2 bg-luffy-yellow border-4 border-ink px-3 py-1 font-black rotate-12 shadow-impact-sm">
          中文 +1
        </div>
        <div className="absolute bottom-6 left-2 bg-white border-4 border-ink px-3 py-1 font-black -rotate-6 shadow-impact-sm">
          XP × 1.5
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-2 border-ink px-4 py-2 bg-parchment shadow-impact-sm">
      <div className="text-2xl font-black leading-none">{value}</div>
      <div className="text-xs text-ink/60 mt-1">{label}</div>
    </div>
  );
}

type Mode = "challenge" | "cards";

function LessonSection({
  mascot,
  soundOn,
  learned,
  onCorrect,
  onStreakChange,
  hydrated,
}: {
  mascot: MascotId;
  soundOn: boolean;
  learned: string[];
  onCorrect: (hanzi: string) => void;
  onStreakChange: (s: number) => void;
  hydrated: boolean;
}) {
  const [mode, setMode] = useState<Mode>("challenge");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);

  const lesson = LESSONS[index];
  const isCorrect = selected === lesson.answer;
  const mood = selected === null ? "idle" : isCorrect ? "excited" : "shocked";
  const shout = useMemo(() => {
    const pool = selected === null ? SHOUTS.idle : isCorrect ? SHOUTS.correct : SHOUTS.wrong;
    return pool[(index + (selected ? 1 : 0)) % pool.length];
  }, [selected, isCorrect, index]);

  const speak = () => {
    if (soundOn) speakChinese(lesson.hanzi);
  };

  const pick = (choice: string) => {
    if (selected) return;
    setSelected(choice);
    if (choice === lesson.answer) {
      const next = streak + 1;
      setStreak(next);
      onStreakChange(next);
      onCorrect(lesson.hanzi);
      if (soundOn) speakChinese(lesson.hanzi);
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    setSelected(null);
    setIndex((i) => (i + 1) % LESSONS.length);
  };

  return (
    <section id="lesson" className="bg-ink py-20 sm:py-24 text-background border-y-4 border-ink">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 border-b-2 border-white/20 pb-4">
          <div>
            <span className="text-luffy-yellow font-mono text-xs sm:text-sm uppercase">
              {mode === "challenge"
                ? `الدرس ${String(index + 1).padStart(2, "0")} / ${String(LESSONS.length).padStart(2, "0")}`
                : "وضع البطاقات"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2">
              {mode === "challenge" ? "مواجهة لغوية حية" : "قاموس الجراند لاين"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-mono text-xs sm:text-sm">
              STREAK: <span className="text-luffy-yellow font-bold">{streak}</span> 🔥
            </div>
            {hydrated && (
              <div className="font-mono text-xs sm:text-sm border-l border-white/20 pl-3">
                المحفوظ: <span className="text-luffy-yellow font-bold">{learned.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Mode tabs */}
        <div className="inline-flex mb-8 border-4 border-luffy-yellow">
          {(["challenge", "cards"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-5 py-2 font-black text-sm transition-colors ${
                mode === m ? "bg-luffy-yellow text-ink" : "text-luffy-yellow hover:bg-luffy-yellow/10"
              }`}
            >
              {m === "challenge" ? "⚔ تحدي" : "🃏 بطاقات"}
            </button>
          ))}
        </div>

        {mode === "cards" ? (
          <FlashCards />
        ) : (
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            {/* Question card */}
            <div
              key={index}
              className="bg-parchment text-ink p-8 sm:p-10 border-b-[12px] border-r-[12px] border-ink -rotate-1 relative overflow-hidden animate-pop-in"
            >
              <div className="absolute top-0 right-0 bg-luffy-yellow px-4 py-1 border-b-2 border-l-2 border-ink text-xs font-bold">
                تحدي سريع
              </div>

              <div className="flex flex-col items-center mb-8">
                <div className="font-chinese text-[96px] sm:text-[120px] leading-none mb-4 font-black">
                  {lesson.hanzi}
                </div>
                <div className="font-mono text-xl sm:text-2xl text-luffy-red">{lesson.pinyin}</div>
                <div className="mt-3 h-1 w-20 bg-ink/10" />
                <button
                  onClick={speak}
                  className="mt-4 size-14 border-4 border-ink flex items-center justify-center hover:bg-luffy-yellow active:translate-y-0.5 transition-all text-2xl"
                  aria-label="استمع للنطق"
                >
                  🔊
                </button>
              </div>

              <div className="grid gap-3">
                {lesson.choices.map((c) => {
                  const isPicked = selected === c;
                  const isAnswer = c === lesson.answer;
                  const reveal = selected !== null;
                  const cls = reveal
                    ? isAnswer
                      ? "bg-luffy-yellow text-ink shadow-impact-sm"
                      : isPicked
                        ? "bg-luffy-red text-white"
                        : "opacity-50"
                    : "hover:bg-luffy-red hover:text-white";
                  return (
                    <button
                      key={c}
                      onClick={() => pick(c)}
                      disabled={selected !== null}
                      className={`w-full p-4 border-4 border-ink font-bold text-right flex justify-between items-center transition-all ${cls}`}
                    >
                      <span>{c}</span>
                      <span className="font-black text-sm">
                        {reveal ? (isAnswer ? "✓ +10 XP" : isPicked ? "✗" : "") : "→"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selected && (
                <button
                  onClick={next}
                  className="mt-6 w-full bg-ink text-luffy-yellow py-3 font-black border-4 border-ink hover:bg-luffy-red hover:text-white transition-colors"
                >
                  الدرس التالي ←
                </button>
              )}
            </div>

            {/* Reactive sprite */}
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-sm">
                <div
                  key={shout}
                  className="absolute -top-12 -right-2 sm:-right-6 bg-white text-ink p-4 border-4 border-ink font-black z-20 max-w-[240px] animate-pop-in"
                >
                  {shout}
                  <div className="absolute -bottom-3 right-12 size-6 bg-white border-b-4 border-l-4 border-ink rotate-45" />
                </div>

                <div
                  className={`relative z-10 overflow-hidden border-4 border-white bg-parchment aspect-square ${
                    mood === "shocked" ? "animate-impact-shake" : ""
                  }`}
                >
                  <MascotSprite id={mascot} mood={mood} pose="face" className="w-full h-full object-cover" />
                </div>

                <div
                  className={`absolute inset-0 rounded-full blur-3xl -z-10 transition-colors ${
                    mood === "excited"
                      ? "bg-luffy-yellow/60"
                      : mood === "shocked"
                        ? "bg-luffy-red/50"
                        : "bg-luffy-blue/30"
                  }`}
                />
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 w-full max-w-sm text-center text-xs font-mono">
                <MoodChip active={mood === "idle"} label="هادئ" />
                <MoodChip active={mood === "excited"} label="متحمس" />
                <MoodChip active={mood === "shocked"} label="مصدوم" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div id="tones" />
    </section>
  );
}

function MoodChip({ active, label }: { active: boolean; label: string }) {
  return (
    <div
      className={`border-2 py-2 ${
        active ? "bg-luffy-yellow text-ink border-luffy-yellow" : "border-white/20 text-white/50"
      }`}
    >
      {label}
    </div>
  );
}

function Roadmap({ learnedCount }: { learnedCount: number }) {
  const chapters = [
    { n: "01", title: "بحر البدايات", desc: "أساسيات البينيِن والنغمات الأربع", unlockAt: 0, color: "bg-parchment", shadow: "shadow-impact-blue", rot: "rotate-3" },
    { n: "02", title: "جزيرة الحوارات", desc: "تعارُف، أرقام، وكلمات يومية", unlockAt: 3, color: "bg-luffy-yellow", shadow: "shadow-impact-red", rot: "-rotate-6" },
    { n: "03", title: "مدينة الرموز", desc: "كتابة الهانزي وتراكيب الجمل", unlockAt: 6, color: "bg-parchment", shadow: "shadow-[8px_8px_0px_#cfc6b0]", rot: "rotate-6" },
    { n: "04", title: "جزيرة لافتيل اللغوية", desc: "إتقان وطلاقة كاملة", unlockAt: 10, color: "bg-parchment", shadow: "shadow-[8px_8px_0px_#cfc6b0]", rot: "-rotate-3" },
  ];

  return (
    <section id="roadmap" className="py-20 sm:py-24 px-6 relative">
      <div className="absolute inset-0 halftone opacity-[0.04] pointer-events-none" />
      <div className="max-w-4xl mx-auto relative">
        <h3 className="text-center text-3xl sm:text-4xl font-black mb-4 relative">
          <span className="relative z-10 px-4 bg-background">طريق الجراند لاين اللغوي</span>
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-ink/10 -z-0" />
        </h3>
        <p className="text-center text-sm text-ink/60 mb-12">
          تقدّمت: <span className="font-black text-luffy-red">{learnedCount}</span> كلمة محفوظة
        </p>

        <div className="relative flex flex-col items-stretch gap-12 sm:gap-16">
          <div className="absolute top-10 right-1/2 h-full w-1 border-r-4 border-dashed border-ink/20 -z-10" />
          {chapters.map((c, i) => {
            const side = i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse";
            const locked = learnedCount < c.unlockAt;
            return (
              <div
                key={c.n}
                className={`flex flex-col sm:items-center gap-6 ${side} ${locked ? "opacity-60" : ""}`}
              >
                <div
                  className={`size-20 sm:size-24 border-4 border-ink flex items-center justify-center font-black text-2xl sm:text-3xl shrink-0 ${c.color} ${c.shadow} ${c.rot} ${
                    !locked ? "hover:scale-110 cursor-pointer" : ""
                  } transition-transform`}
                >
                  {c.n}
                </div>
                <div className={i % 2 === 0 ? "text-right sm:text-right" : "text-right sm:text-left"}>
                  <div className="font-black text-xl sm:text-2xl">{c.title}</div>
                  <div className="text-sm text-ink/60 mt-1">
                    {locked ? `🔒 افتح بعد ${c.unlockAt} كلمة — ` : "✓ مفتوح — "}
                    {c.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-luffy-red text-white py-12 px-6 border-t-8 border-ink relative overflow-hidden">
      <div className="absolute inset-0 speed-lines opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative">
        <div className="text-center md:text-right">
          <div className="text-3xl sm:text-4xl font-black mb-2">أكاديمية لوفي</div>
          <p className="font-bold opacity-90">اللغة الصينية.. بأسلوب القراصنة.</p>
        </div>
        <div className="flex gap-3">
          {["FB", "X", "IG", "YT"].map((s) => (
            <div
              key={s}
              className="size-12 bg-white border-2 border-ink flex items-center justify-center text-ink font-black cursor-pointer hover:bg-luffy-yellow transition-colors"
            >
              {s}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-10 text-xs font-mono opacity-70 relative">
        © 2025 LUFFY ACADEMY — THE SHONEN WAY TO FLUENCY
      </div>
    </footer>
  );
}

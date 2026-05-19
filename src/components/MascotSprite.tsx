import hat1 from "@/assets/mascots/hat-1.png";
import hat2 from "@/assets/mascots/hat-2.png";
import hat3 from "@/assets/mascots/hat-3.png";
import hat4 from "@/assets/mascots/hat-4.png";
import hoodie1 from "@/assets/mascots/hoodie-1.png";
import hoodie2 from "@/assets/mascots/hoodie-2.png";
import hoodie3 from "@/assets/mascots/hoodie-3.png";
import hoodie4 from "@/assets/mascots/hoodie-4.png";
import ribbon1 from "@/assets/mascots/ribbon-1.png";
import ribbon2 from "@/assets/mascots/ribbon-2.png";
import ribbon3 from "@/assets/mascots/ribbon-3.png";
import ribbon4 from "@/assets/mascots/ribbon-4.png";

export type MascotId = "hat" | "hoodie" | "ribbon";
export type MascotMood = "idle" | "excited" | "shocked";
export type MascotPose = "full" | "face";

// pose 1 = full body, 2 = calm smile, 3 = eyes-closed peaceful, 4 = laugh open mouth
const SETS: Record<MascotId, { full: string; idle: string; excited: string; shocked: string }> = {
  hat: { full: hat1, idle: hat2, excited: hat4, shocked: hat3 },
  hoodie: { full: hoodie1, idle: hoodie2, excited: hoodie4, shocked: hoodie3 },
  ribbon: { full: ribbon1, idle: ribbon2, excited: ribbon4, shocked: ribbon3 },
};

export const MASCOT_META: Record<MascotId, { name: string; tag: string }> = {
  hat: { name: "كابتن هات", tag: "المدرّب الواثق" },
  hoodie: { name: "هودي", tag: "الرفيق المرح" },
  ribbon: { name: "ريبون", tag: "الأميرة الذكية" },
};

export function MascotSprite({
  id = "hat",
  mood = "idle",
  pose = "face",
  className = "",
}: {
  id?: MascotId;
  mood?: MascotMood;
  pose?: MascotPose;
  className?: string;
}) {
  const set = SETS[id];
  const src = pose === "full" ? set.full : set[mood];
  return (
    <img
      src={src}
      alt={MASCOT_META[id].name}
      className={className}
      draggable={false}
      loading="eager"
    />
  );
}

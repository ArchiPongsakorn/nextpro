"use client";
import { useState } from "react";
import AuthForm from "./AuthForm";
import AuthSuccess from "./AuthSuccess";
import s from "./auth.module.css";

const TABS = [
  { id: "login", label: "เข้าสู่ระบบ" },
  { id: "register", label: "สมัครสมาชิก" },
];

/** การ์ดฝั่งขวา: แท็บสลับ เข้าสู่ระบบ/สมัครสมาชิก และหน้าสำเร็จ */
export default function AuthCard({ initialTab = "login" }) {
  const [tab, setTab] = useState(initialTab);
  const [done, setDone] = useState(null);

  const switchTab = (id) => {
    setTab(id);
    window.history.replaceState(null, "", id === "register" ? "/login?tab=register" : "/login");
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") switchTab(tab === "login" ? "register" : "login");
  };

  return (
    <section className={s.card} aria-label="เข้าสู่ระบบหรือสมัครสมาชิก">
      {done ? (
        <AuthSuccess {...done} />
      ) : (
        <>
          <div className={s.tabs} role="tablist" aria-label="เลือกการดำเนินการ" onKeyDown={onKeyDown}>
            {TABS.map((t) => (
              <button key={t.id} type="button" role="tab" className={s.tab} aria-selected={tab === t.id} onClick={() => switchTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
          <AuthForm key={tab} mode={tab} onSwitch={switchTab} onSuccess={setDone} />
        </>
      )}
    </section>
  );
}

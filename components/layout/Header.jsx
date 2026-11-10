import Link from "next/link";
import { cx } from "../../lib/cx";
import s from "./header.module.css";

const LINKS = [
  { id: "home", href: "/", label: "หน้าแรก" },
  { id: "shop", href: "/shop", label: "เลือกซื้อบัตร" },
];

/**
 * แถบเมนูบนสุดที่ใช้ร่วมทุกหน้า
 * - current: id ของเมนูที่กำลังเปิดอยู่ ("home" | "shop")
 * - children: ปุ่มฝั่งขวา (เช่น ปุ่มเข้าสู่ระบบ หรือไอคอนตะกร้า)
 */
export default function Header({ current, children }) {
  return (
    <header className={s.header}>
      <div className={cx("wrap", s.headerRow)}>
        <Link className={s.logo} href="/">
          <span className={s.logoMark} aria-hidden="true">A</span>
          <span className={s.logoText}>AAA</span>
        </Link>
        <nav className={s.nav} aria-label="เมนูหลัก">
          {LINKS.map((l) => (
            <Link key={l.id} href={l.href} className={cx(s.navLink, current === l.id && s.isCurrent)} aria-current={current === l.id ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </header>
  );
}

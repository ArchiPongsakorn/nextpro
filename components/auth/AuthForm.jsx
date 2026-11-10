"use client";
import { useState } from "react";
import Link from "next/link";
import Field from "../ui/Field";
import PasswordMeter from "./PasswordMeter";
import { AUTH_FORMS } from "../../data/forms";
import { validateFields } from "../../lib/validators";
import { login, register } from "../../lib/api";
import { cx } from "../../lib/cx";
import s from "./auth.module.css";

/**
 * ฟอร์มเดียวใช้ได้ทั้งเข้าสู่ระบบและสมัครสมาชิก
 * หน้าตาและกติกาตรวจข้อมูลมาจาก AUTH_FORMS ใน src/data/forms.js
 */
export default function AuthForm({ mode, onSwitch, onSuccess }) {
  const cfg = AUTH_FORMS[mode];
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [accepted, setAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [loading, setLoading] = useState(false);
  const idOf = (name) => `${mode}-${name}`;

  const change = (field, raw) => {
    const value = field.sanitize ? field.sanitize(raw) : raw;
    const next = { ...values, [field.name]: value };
    setValues(next);
    if (errors[field.name]) setErrors((e) => ({ ...e, [field.name]: field.validate(value, next) }));
  };

  const blur = (field) => {
    if (values[field.name]) setErrors((e) => ({ ...e, [field.name]: field.validate(values[field.name], values) }));
  };

  async function submit(e) {
    e.preventDefault();
    const found = validateFields(cfg.fields, values);
    const termsMsg = cfg.terms && !accepted ? "กรุณายอมรับเงื่อนไขก่อนสมัครสมาชิก" : "";
    setErrors(found);
    setTermsError(termsMsg);

    const firstBad = cfg.fields.find((f) => found[f.name]);
    if (firstBad) return document.getElementById(idOf(firstBad.name))?.focus();
    if (termsMsg) return document.getElementById(idOf("terms"))?.focus();

    setLoading(true);
    await (mode === "login" ? login : register)(values);
    setLoading(false);
    onSuccess(cfg.done);
  }

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <h2 className={s.formTitle}>{cfg.title}</h2>
      <p className={s.formSub}>{cfg.sub}</p>

      {cfg.fields.map((f) => (
        <Field
          key={f.name}
          id={idOf(f.name)}
          label={f.label}
          type={f.type}
          hint={f.hint}
          value={values[f.name] ?? ""}
          error={errors[f.name]}
          onChange={(v) => change(f, v)}
          onBlur={() => blur(f)}
          autoComplete={f.autoComplete}
          inputMode={f.inputMode}
          placeholder={f.placeholder}
        >
          {f.meter && <PasswordMeter value={values.password ?? ""} />}
        </Field>
      ))}

      {mode === "login" && (
        <div className={s.row}>
          <label className={s.check}><input type="checkbox" name="remember" /> จดจำฉันไว้</label>
          <Link className={s.link} href="/login">ลืมรหัสผ่าน?</Link>
        </div>
      )}

      {cfg.terms && (
        <div>
          <label className={s.check}>
            <input id={idOf("terms")} type="checkbox" checked={accepted} onChange={(e) => { setAccepted(e.target.checked); setTermsError(""); }} />
            <span>ฉันยอมรับ <Link className={s.link} href="/login">เงื่อนไขการใช้งาน</Link> และ <Link className={s.link} href="/login">นโยบายความเป็นส่วนตัว</Link></span>
          </label>
          {termsError && <p className={s.termsError}>{termsError}</p>}
        </div>
      )}

      <button type="submit" className={cx("btn", loading && s.loading)} disabled={loading}>{cfg.submit}</button>
      <p className={s.swap}>
        {cfg.swap.text} <button type="button" onClick={() => onSwitch(cfg.swap.to)}>{cfg.swap.label}</button>
      </p>
    </form>
  );
}

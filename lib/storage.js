/** อ่าน/เขียน localStorage แบบปลอดภัย (ใช้เฉพาะฝั่ง client) */
export function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ใช้งานต่อได้แม้บันทึกไม่ได้ */
  }
}

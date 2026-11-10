/**
 * จุดเชื่อมต่อระบบหลังบ้าน (ตอนนี้เป็นตัวจำลอง)
 * เปลี่ยนเนื้อในฟังก์ชันให้เรียก API จริง เช่น fetch("/api/login", { method: "POST", body: ... })
 */
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function login(payload) {
  await wait(900);
  return { ok: true, user: { id: payload.id } };
}

export async function register(payload) {
  await wait(900);
  return { ok: true };
}

export async function createOrder(order) {
  await wait(700);
  const orderNo = "MF" + String(Math.floor(Math.random() * 1e6)).padStart(6, "0");
  return { ok: true, orderNo };
}

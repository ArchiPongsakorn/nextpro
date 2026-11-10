/** รวม className เข้าด้วยกัน ข้ามค่าที่เป็น false/undefined */
export const cx = (...parts) => parts.filter(Boolean).join(" ");

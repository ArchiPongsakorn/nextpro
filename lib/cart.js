import { PRODUCTS_BY_ID } from "../data/catalog";

/** คีย์ประจำบรรทัดในตะกร้า (สินค้า + ไซซ์) */
export const lineKey = (line) => `${line.id}|${line.option}`;

export function summarize(lines) {
  const sum = { count: 0, total: 0, tokens: 0, hasTicket: false, hasMerch: false };
  for (const l of lines) {
    const p = PRODUCTS_BY_ID[l.id];
    sum.count += l.qty;
    sum.total += l.qty * p.price;
    sum.tokens += l.qty * (p.tokens || 0);
    if (p.type === "ticket") sum.hasTicket = true;
    else sum.hasMerch = true;
  }
  return sum;
}

/**
 * แตกสินค้าเป็นรายชิ้น: บัตรทุกใบ (กรอกข้อมูลผู้ถือบัตร) และของที่ระลึกทุกชิ้น (เลือกรับที่งานหรือจัดส่ง)
 */
export function orderUnits(lines) {
  return lines.flatMap((l) => {
    const p = PRODUCTS_BY_ID[l.id];
    return Array.from({ length: l.qty }, (_, i) => ({
      key: [l.id, l.option, i + 1].filter(Boolean).join("-"),
      id: l.id,
      option: l.option,
      kind: p.type,
    }));
  });
}

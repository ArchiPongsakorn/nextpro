/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ใช้เฉพาะไฟล์ .jsx เป็นหน้า/เลย์เอาต์ ไฟล์เริ่มต้นของ create-next-app (page.tsx, layout.tsx, page.js, layout.js)
  // จะถูกเมิน จึงไม่ต้องลบไฟล์เดิมออก (และตัดกฎ Tailwind ที่ทำให้ CSS Modules พังออกด้วย)
  pageExtensions: ["jsx"],
};

export default nextConfig;

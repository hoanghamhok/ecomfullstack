// components/BrandSlider.tsx
const brands = [
  { name: "Apple", logo: "/images/png-apple-logo-9711.png" },
  { name: "Samsung", logo: "/images/samsung-logo-png-1294.png" },
  { name: "Dell", logo: "/images/dell-png-logo-3741.png" },
  { name: "Sony", logo: "/images/sony-logo-3060.png" },
  { name: "LG", logo: "/images/lg-logo-14410.png" },
  { name: "Asus", logo: "/images/logo-asus-png-7165.png" },
];

export default function BrandSlider() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center gap-10 overflow-x-auto scrollbar-hide">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center min-w-[100px]">
              <img src={brand.logo} alt={brand.name} className="h-12 w-auto grayscale hover:grayscale-0 transition" />
              <span className="mt-2 text-xs text-slate-500">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

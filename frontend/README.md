https://kampus-etkinlik-sigma.vercel.app

# Kampüs Etkinlikleri · Sprint 4

Vite, TypeScript ve React. Sprint 3'teki site tek bir React uygulamasına taşındı; sayfa geçişi ve arama state ile çalışıyor.

**Etiket:** `sprint-04`

## Dosyalar

- `package.json`: Proje adı, komutlar (dev, build) ve paket listesi.
- `package-lock.json`: Yüklenen paketlerin tam sürümleri.
- `node_modules/`: İndirilen paketler; GitHub'a gönderilmez.
- `tsconfig*.json`: TypeScript ayarları.
- `vite.config.ts`: Vite ayarları ve React eklentisi.
- `index.html`: Uygulamanın tek HTML dosyası; içinde boş `div#root` var.
- `src/main.tsx`: React'i başlatır ve App bileşenini root'a çizer.
- `src/App.tsx`: Uygulamanın ana bileşeni; beş sayfanın hepsi burada.
- `src/App.css`: Sprint 3'teki CSS (numaraya göre renk ve font).
- `src/index.css`: Genel stil dosyası; bu sprintte boş.
- `src/types/campus-event.ts`: Bir etkinliğin tipi ve kategori listesi.
- `src/data/events.ts`: 6 etkinliğin tipli verisi.
- `src/utils/filter-events.ts`: Arama, kategori filtresi ve id ile bulma fonksiyonları.
- `public/`: Olduğu gibi kopyalanan dosyalar (afis.svg).

# إعداد Google Maps

## الخطوات للحصول على API Key

### 1. إنشاء مشروع Google Cloud
- اذهب إلى: [Google Cloud Console](https://console.cloud.google.com/)
- سجل الدخول بحساب Google الخاص بك
- أنشئ مشروع جديد أو اختر مشروع موجود

### 2. تفعيل APIs المطلوبة
انتقل إلى قسم "APIs & Services" > "Library" وفعّل:
- **Google Maps JavaScript API**
- **Places API**
- **Geocoding API** (اختياري للحصول على العناوين)

### 3. إنشاء API Key
- اذهب إلى "APIs & Services" > "Credentials"
- اضغط على "Create Credentials" > "API Key"
- انسخ API Key

### 4. تقييد API Key (مهم للأمان)
- اضغط على API Key الذي أنشأته
- في قسم "Application restrictions":
  - اختر "HTTP referrers"
  - أضف: `localhost:3000/*` للتطوير
  - أضف domain موقعك للإنتاج
- في قسم "API restrictions":
  - اختر "Restrict key"
  - حدد فقط APIs التي فعلتها

### 5. إضافة API Key للمشروع

#### الطريقة الأولى: ملف .env
أنشئ ملف `.env` في مجلد المشروع الرئيسي:

```env
NUXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
```

#### الطريقة الثانية: مباشرة في nuxt.config.ts
افتح ملف `nuxt.config.ts` واستبدل:

```typescript
googleMapsApiKey: "",
```

بـ:

```typescript
googleMapsApiKey: "YOUR_API_KEY_HERE",
```

### 6. إعادة تشغيل الخادم
بعد إضافة API Key، أعد تشغيل الخادم:

```bash
npm run dev
```

## ملاحظات مهمة

⚠️ **لا تشارك API Key الخاص بك علناً**
- أضف `.env` إلى `.gitignore`
- استخدم تقييدات API Key لحماية حسابك

💰 **التكاليف**
- Google Maps يوفر $200 رصيد مجاني شهرياً
- معظم المشاريع الصغيرة لا تتجاوز الحد المجاني

🔗 **روابط مفيدة**
- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)

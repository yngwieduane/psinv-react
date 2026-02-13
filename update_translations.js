const fs = require('fs');
const path = require('path');

const translations = {
    ar: {
        Units: "الوحدات",
        Properties: "العقارات",
        "Coming Soon": "قريباً",
        SearchPlaceHolder: "ابحث عن مشروع أو مجمع...",
        Searching: "جاري البحث...",
        Contract: "نوع العقد",
        Sale: "للبيع",
        Rent: "للإيجار",
        Category: "فئة",
        Any: "الكل",
        Residential: "سكني",
        Commercial: "تجاري",
        "Property Types": "أنواع العقارات",
        RESIDENTIAL_TYPES: {
            Apartment: "شقة",
            Villa: "فيلا",
            Townhouse: "تاون هاوس",
            Studio: "استوديو",
            "Twin House": "توين هاوس",
            Penthouse: "بنتهاوس"
        },
        COMMERCIAL_TYPES: {
            Office: "مكتب",
            Warehouse: "مستودع",
            Retail: "محلات تجارية",
            Shop: "محل",
            Plot: "قطعة أرض"
        },
        "Beds and Baths": "غرف نوم وحمامات",
        Beds: "غرف",
        Baths: "حمامات",
        Bedrooms: "غرف نوم",
        Bathrooms: "حمامات",
        "Price Range": "نطاق السعر",
        "Minimum Price": "السعر الأدنى",
        "Maximum Price": "السعر الأقصى",
        Search: "بحث"
    },
    de: {
        Units: "Einheiten",
        Properties: "Immobilien",
        "Coming Soon": "Demnächst",
        SearchPlaceHolder: "Suche nach Projekt oder Gemeinde...",
        Searching: "Suchen...",
        Contract: "Vertrag",
        Sale: "Verkauf",
        Rent: "Miete",
        Category: "Kategorie",
        Any: "Alle",
        Residential: "Wohnen",
        Commercial: "Gewerbe",
        "Property Types": "Immobilientypen",
        RESIDENTIAL_TYPES: {
            Apartment: "Wohnung",
            Villa: "Villa",
            Townhouse: "Reihenhaus",
            Studio: "Studio",
            "Twin House": "Doppelhaus",
            Penthouse: "Penthouse"
        },
        COMMERCIAL_TYPES: {
            Office: "Büro",
            Warehouse: "Lagerhaus",
            Retail: "Einzelhandel",
            Shop: "Geschäft",
            Plot: "Grundstück"
        },
        "Beds and Baths": "Betten und Bäder",
        Beds: "Betten",
        Baths: "Bäder",
        Bedrooms: "Schlafzimmer",
        Bathrooms: "Badezimmer",
        "Price Range": "Preisspanne",
        "Minimum Price": "Mindestpreis",
        "Maximum Price": "Höchstpreis",
        Search: "Suchen"
    },
    ru: {
        Units: "Объекты",
        Properties: "Недвижимость",
        "Coming Soon": "Скоро",
        SearchPlaceHolder: "Поиск по проекту или сообществу...",
        Searching: "Поиск...",
        Contract: "Контракт",
        Sale: "Продажа",
        Rent: "Аренда",
        Category: "Категория",
        Any: "Любой",
        Residential: "Жилая",
        Commercial: "Коммерческая",
        "Property Types": "Типы недвижимости",
        RESIDENTIAL_TYPES: {
            Apartment: "Квартира",
            Villa: "Вилла",
            Townhouse: "Таунхаус",
            Studio: "Студия",
            "Twin House": "Твинхаус",
            Penthouse: "Пентхаус"
        },
        COMMERCIAL_TYPES: {
            Office: "Офис",
            Warehouse: "Склад",
            Retail: "Ритейл",
            Shop: "Магазин",
            Plot: "Участок"
        },
        "Beds and Baths": "Спальни и ванные",
        Beds: "Спальни",
        Baths: "Ванные",
        Bedrooms: "Спальни",
        Bathrooms: "Ванные комнаты",
        "Price Range": "Ценовой диапазон",
        "Minimum Price": "Мин. цена",
        "Maximum Price": "Макс. цена",
        Search: "Поиск"
    },
    zh: {
        Units: "单元",
        Properties: "房产",
        "Coming Soon": "即将推出",
        SearchPlaceHolder: "按项目或社区搜索...",
        Searching: "正在搜索...",
        Contract: "合同",
        Sale: "出售",
        Rent: "出租",
        Category: "类别",
        Any: "任何",
        Residential: "住宅",
        Commercial: "商业",
        "Property Types": "房产类型",
        RESIDENTIAL_TYPES: {
            Apartment: "公寓",
            Villa: "别墅",
            Townhouse: "联排别墅",
            Studio: "单身公寓",
            "Twin House": "双拼别墅",
            Penthouse: "阁楼"
        },
        COMMERCIAL_TYPES: {
            Office: "办公室",
            Warehouse: "仓库",
            Retail: "零售",
            Shop: "店铺",
            Plot: "地块"
        },
        "Beds and Baths": "卧室和浴室",
        Beds: "卧室",
        Baths: "浴室",
        Bedrooms: "卧室",
        Bathrooms: "浴室",
        "Price Range": "价格范围",
        "Minimum Price": "最低价格",
        "Maximum Price": "最高价格",
        Search: "搜索"
    }
};

const messagesDir = path.join(process.cwd(), 'messages');

Object.keys(translations).forEach(lang => {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            content.HomeSearch = translations[lang];
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
            console.log(`Updated ${lang}.json`);
        } catch (e) {
            console.error(`Error updating ${lang}.json:`, e);
        }
    } else {
        console.warn(`${lang}.json not found`);
    }
});

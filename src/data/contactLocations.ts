export interface ContactLocation {
  id: number;

 name: {
    en: string;
    ar?: string;
    de?: string;
    ru?: string;
    zh?: string;
  };

  address: {
    en: string;
    ar?: string;
    de?: string;
    ru?: string;
    zh?: string;
  };

  address_community: {
    en: string;
    ar?: string;
    de?: string;
    ru?: string;
    zh?: string;
  };

  address_city: {
    en: string;
    ar?: string;
    de?: string;
    ru?: string;
    zh?: string;
  };

  off_address: {
    en: string;
    ar?: string;
    de?: string;
    ru?: string;
    zh?: string;
  };

  slug: string;
  phone1: string;
  phone2?: string;
  direction: string;
  location: string;
  longitude: number;
  latitude: number;
  google_map?: string;
  img: string;
}

export const contactLocations: ContactLocation[] = [
  {
    id: 1,
  name: {
    en: "PSI Head Office",
    ar: "المكتب الرئيسي لـ PSI",
    de: "PSI Hauptbüro",
    ru: "Главный офис PSI",
    zh: "PSI 总部"
  },

  address: {
    en: "Al Reem Island, Abu Dhabi",
    ar: "جزيرة الريم، أبوظبي",
    de: "Al Reem Island, Abu Dhabi",
    ru: "Остров Аль-Рим, Абу-Даби",
    zh: "阿尔雷姆岛，阿布扎比"
  },

  address_community: {
    en: "Al Reem Island",
    ar: "جزيرة الريم",
    de: "Al Reem Island",
    ru: "Остров Аль-Рим",
    zh: "阿尔雷姆岛"
  },

  address_city: {
    en: "Abu Dhabi",
    ar: "أبوظبي",
    de: "Abu Dhabi",
    ru: "Абу-Даби",
    zh: "阿布扎比"
  },

  off_address: {
    en: "Office No. 4410 & 4411, Addax Tower Level 44, Al Reem Island, City of Lights, Abu Dhabi, United Arab Emirates",
    ar: "مكتب رقم 4410 و4411، برج أدكس، الطابق 44، جزيرة الريم، سيتي أوف لايتس، أبوظبي، الإمارات العربية المتحدة",
    de: "Büro Nr. 4410 & 4411, Addax Tower, Etage 44, Al Reem Island, City of Lights, Abu Dhabi, Vereinigte Arabische Emirate",
    ru: "Офис № 4410 и 4411, башня Addax, 44 этаж, остров Аль-Рим, City of Lights, Абу-Даби, ОАЭ",
    zh: "4410 和 4411 室，Addax Tower 44 层，阿尔雷姆岛，光之城，阿布扎比，阿拉伯联合酋长国"
  },

    slug: "main-branch",
    phone1: "600 548 200",
    phone2: "+971564094001",
    direction: "https://goo.gl/maps/LjKdHThYp57u2fka7",
    location: "https://goo.gl/maps/LjKdHThYp57u2fka7",
    longitude: 54.4030951693129,
    latitude: 24.499508550193866,
    google_map: "https://goo.gl/maps/LjKdHThYp57u2fka7",
    img: "/images/psi-headoffice.webp",
  },

  {
    id: 2,
  name: {
    en: "PSI Assets",
    ar: "أصول PSI",
    de: "PSI Vermögenswerte",
    ru: "Активы PSI",
    zh: "PSI 资产"
  },

  address: {
    en: "PSI Assets, Al Reem Island, Abu Dhabi",
    ar: "أصول PSI، جزيرة الريم، أبوظبي",
    de: "PSI Vermögenswerte, Al Reem Island, Abu Dhabi",
    ru: "Активы PSI, остров Аль-Рим, Абу-Даби",
    zh: "PSI 资产，阿尔雷姆岛，阿布扎比"
  },

  address_community: {
    en: "Al Reem Island",
    ar: "جزيرة الريم",
    de: "Al Reem Island",
    ru: "Остров Аль-Рим",
    zh: "阿尔雷姆岛"
  },

  address_city: {
    en: "Abu Dhabi",
    ar: "أبوظبي",
    de: "Abu Dhabi",
    ru: "Абу-Даби",
    zh: "阿布扎比"
  },

  off_address: {
    en: "1st Floor, Shams Boutik | Jazeerat Al Reem, Al Reem Island | Abu Dhabi, United Arab Emirates",
    ar: "الطابق الأول، شمس بوتيك | جزيرة الريم | أبوظبي، الإمارات العربية المتحدة",
    de: "1. Etage, Shams Boutik | Jazeerat Al Reem, Al Reem Island | Abu Dhabi, Vereinigte Arabische Emirate",
    ru: "1-й этаж, Shams Boutik | остров Аль-Рим | Абу-Даби, ОАЭ",
    zh: "一楼，Shams Boutik | 阿尔雷姆岛 | 阿布扎比，阿联酋"
  },

    slug: "psi-assets",
    phone1: "600 510 510",
    phone2: "+971564094001",
    direction:
      "https://www.google.com/maps/dir//20+Al+Reema+St+-+Jazeerat+Al+Reem+-+Abu+Dhabi/",
    location:
      "https://www.google.com/maps/place/20+Al+Reema+St+-+Jazeerat+Al+Reem+-+Abu+Dhabi/",
    longitude: 54.40789730524954,
    latitude: 24.49630487299215,
    img: "/images/contactus/psi-assets.webp",
  },

  {
    id: 3,
   name: {
    en: "Dubai Hills Branch",
    ar: "فرع دبي هيلز",
    de: "Dubai Hills Filiale",
    ru: "Филиал Dubai Hills",
    zh: "迪拜山分公司"
  },

  address: {
    en: "Business Park 3, Dubai Hills Estate",
    ar: "بيزنس بارك 3، دبي هيلز",
    de: "Business Park 3, Dubai Hills Estate",
    ru: "Business Park 3, Dubai Hills Estate",
    zh: "商业园区3，迪拜山庄"
  },

  address_community: {
    en: "Dubai Hills Estate",
    ar: "دبي هيلز",
    de: "Dubai Hills Estate",
    ru: "Dubai Hills Estate",
    zh: "迪拜山庄"
  },

  address_city: {
    en: "Dubai",
    ar: "دبي",
    de: "Dubai",
    ru: "Дубай",
    zh: "迪拜"
  },

  off_address: {
    en: "Office #104, Business Park 3, Dubai Hills Estate",
    ar: "مكتب رقم 104، بيزنس بارك 3، دبي هيلز",
    de: "Büro Nr. 104, Business Park 3, Dubai Hills Estate",
    ru: "Офис №104, Business Park 3, Dubai Hills Estate",
    zh: "104号办公室，商业园区3，迪拜山庄"
  },

    slug: "dubai-hills-branch",
    phone1: "04 508 8000",
    phone2: "04 508 8001",
    direction: "https://goo.gl/maps/PgpwzQo73vdYbmyZ6",
    location:
      "https://www.google.com/maps/place/Dubai+Hills+Estate+Business+Park+3/",
    longitude: 55.2402619,
    latitude: 25.1064621,
    img: "/images/contactus/dubai-hills-psi.webp",
  },

  {
    id: 4,
   name: {
  en: "Mamsha Branch",
  ar: "فرع ممشى السعديات",
  de: "Mamsha Filiale",
  ru: "Филиал Mamsha",
  zh: "Mamsha 分公司"
},

address: {
  en: "Saadiyat Island, Abu Dhabi",
  ar: "جزيرة السعديات، أبوظبي",
  de: "Saadiyat Island, Abu Dhabi",
  ru: "Остров Саадият, Абу-Даби",
  zh: "萨迪亚特岛，阿布扎比"
},

address_community: {
  en: "Saadiyat Island",
  ar: "جزيرة السعديات",
  de: "Saadiyat Island",
  ru: "Остров Саадият",
  zh: "萨迪亚特岛"
},

address_city: {
  en: "Abu Dhabi",
  ar: "أبوظبي",
  de: "Abu Dhabi",
  ru: "Абу-Даби",
  zh: "阿布扎比"
},

off_address: {
  en: "Mamsha Al Saadiyat, Building 9, Unit P3-R13, Abu Dhabi, United Arab Emirates",
  ar: "ممشى السعديات، مبنى 9، وحدة P3-R13، أبوظبي، الإمارات العربية المتحدة",
  de: "Mamsha Al Saadiyat, Gebäude 9, Einheit P3-R13, Abu Dhabi, Vereinigte Arabische Emirate",
  ru: "Mamsha Al Saadiyat, здание 9, блок P3-R13, Абу-Даби, ОАЭ",
  zh: "Mamsha Al Saadiyat，9号楼，P3-R13 单元，阿布扎比，阿联酋"
},

    slug: "mamsha-saadiyat-branch",
    phone1: "600 548 200",
    phone2: "02 205 2999",
    direction: "https://goo.gl/maps/BiUc5wedQMgxKCqs5",
    location:
      "https://www.google.ae/maps/place/Property+Shop+Investment+(PSI)+-+Mamsha+Branch/",
    longitude: 54.4048641,
    latitude: 24.5386169,
    img: "/images/contactus/mamsha-psi.png",
  },

  {
    id: 5,
   name: {
    en: "Waters Edge Branch",
    ar: "فرع ووترز إيدج",
    de: "Waters Edge Filiale",
    ru: "Филиал Waters Edge",
    zh: "Waters Edge 分公司"
  },

  address: {
    en: "Yas Island, Abu Dhabi",
    ar: "جزيرة ياس، أبوظبي",
    de: "Yas Island, Abu Dhabi",
    ru: "Остров Яс, Абу-Даби",
    zh: "亚斯岛，阿布扎比"
  },

  address_community: {
    en: "Yas Island",
    ar: "جزيرة ياس",
    de: "Yas Island",
    ru: "Остров Яс",
    zh: "亚斯岛"
  },

  address_city: {
    en: "Abu Dhabi",
    ar: "أبوظبي",
    de: "Abu Dhabi",
    ru: "Абу-Даби",
    zh: "阿布扎比"
  },

  off_address: {
    en: "Al Maha St, Yas Island, Abu Dhabi, United Arab Emirates",
    ar: "شارع المها، جزيرة ياس، أبوظبي، الإمارات العربية المتحدة",
    de: "Al Maha Straße, Yas Island, Abu Dhabi, Vereinigte Arabische Emirate",
    ru: "улица Аль-Маха, остров Яс, Абу-Даби, ОАЭ",
    zh: "Al Maha 街，亚斯岛，阿布扎比，阿联酋"
  },

    slug: "waters-edge-branch",
    phone1: "600 510 510",
    phone2: "+971564094001",
    direction:
      "https://www.google.com/maps/dir//Al+Maha+St+-+Yas+Island+-+Abu+Dhabi/",
    location:
      "https://www.google.com/maps/place/Property+Shop+Investment+(PSI)+Water's+Edge+Branch/",
    longitude: 54.614587,
    latitude: 24.4799716,
    img: "/images/contactus/waters-edge-psi.webp",
  },

  {
    id: 6,
  name: {
    en: "St. Regis Office",
    ar: "مكتب سانت ريجيس",
    de: "St. Regis Büro",
    ru: "Офис St. Regis",
    zh: "瑞吉办公室"
  },

  address: {
    en: "Saadiyat Island, Abu Dhabi",
    ar: "جزيرة السعديات، أبوظبي",
    de: "Saadiyat Island, Abu Dhabi",
    ru: "Остров Саадият, Абу-Даби",
    zh: "萨迪亚特岛，阿布扎比"
  },

  address_community: {
    en: "Saadiyat Island",
    ar: "جزيرة السعديات",
    de: "Saadiyat Island",
    ru: "Остров Саадият",
    zh: "萨迪亚特岛"
  },

  address_city: {
    en: "Abu Dhabi",
    ar: "أبوظبي",
    de: "Abu Dhabi",
    ru: "Абу-Даби",
    zh: "阿布扎比"
  },

  off_address: {
    en: "PSI St Regis, Saadiyat Island, Abu Dhabi, United Arab Emirates",
    ar: "PSI سانت ريجيس، جزيرة السعديات، أبوظبي، الإمارات العربية المتحدة",
    de: "PSI St Regis, Saadiyat Island, Abu Dhabi, Vereinigte Arabische Emirate",
    ru: "PSI St Regis, остров Саадият, Абу-Даби, ОАЭ",
    zh: "PSI St Regis，萨迪亚特岛，阿布扎比，阿联酋"
  },

    slug: "st-regis-office",
    phone1: "600 548 200",
    phone2: "02 205 2999",
    direction: "https://goo.gl/maps/BiUc5wedQMgxKCqs5",
    location:
      "https://www.google.ae/maps/place/Property+Shop+Investment+(PSI)+-+Mamsha+Branch/",
    longitude: 54.4048641,
    latitude: 24.5386169,
    img: "/images/contactus/mamsha-psi.png",
  },

  {
    id: 7,
name: {
    en: "Palm Jumeirah Branch",
    ar: "فرع نخلة جميرا",
    de: "Palm Jumeirah Filiale",
    ru: "Филиал Palm Jumeirah",
    zh: "棕榈朱美拉分公司"
  },

  address: {
    en: "Palm Jumeirah, Dubai",
    ar: "نخلة جميرا، دبي",
    de: "Palm Jumeirah, Dubai",
    ru: "Пальма Джумейра, Дубай",
    zh: "棕榈朱美拉，迪拜"
  },

  address_community: {
    en: "Palm Jumeirah",
    ar: "نخلة جميرا",
    de: "Palm Jumeirah",
    ru: "Пальма Джумейра",
    zh: "棕榈朱美拉"
  },

  address_city: {
    en: "Dubai",
    ar: "دبي",
    de: "Dubai",
    ru: "Дубай",
    zh: "迪拜"
  },

  off_address: {
    en: "Golden Mile Building 8, Palm Jumeirah, Dubai, United Arab Emirates",
    ar: "جولدن مايل، المبنى 8، نخلة جميرا، دبي، الإمارات العربية المتحدة",
    de: "Golden Mile Gebäude 8, Palm Jumeirah, Dubai, Vereinigte Arabische Emirate",
    ru: "Golden Mile, здание 8, Пальма Джумейра, Дубай, ОАЭ",
    zh: "Golden Mile 第8栋，棕榈朱美拉，迪拜，阿联酋"
  },

    slug: "palm-jumeirah-branch",
    phone1: "600 548 200",
    phone2: "02 205 2999",
    direction: "https://www.google.com/maps/dir//Golden+Mile+8/",
    location: "https://www.google.com/maps/place/Golden+Mile+8/",
    longitude: 55.14143045391955,
    latitude: 25.11119355668974,
    img: "/images/contactus/palm-psi.webp",
  },

  {
    id: 8,
 name: {
    en: "Conrad Etihad Towers",
    ar: "فندق كونراد أبراج الاتحاد",
    de: "Conrad Etihad Towers",
    ru: "Conrad Etihad Towers",
    zh: "康莱德阿提哈德塔酒店"
  },

  address: {
    en: "Al Bateen, Abu Dhabi",
    ar: "البطين، أبوظبي",
    de: "Al Bateen, Abu Dhabi",
    ru: "Аль-Батин, Абу-Даби",
    zh: "阿尔巴廷，阿布扎比"
  },

  address_community: {
    en: "Al Bateen",
    ar: "البطين",
    de: "Al Bateen",
    ru: "Аль-Батин",
    zh: "阿尔巴廷"
  },

  address_city: {
    en: "Abu Dhabi",
    ar: "أبوظبي",
    de: "Abu Dhabi",
    ru: "Абу-Даби",
    zh: "阿布扎比"
  },

  off_address: {
    en: "Conrad Abu Dhabi Etihad Towers, Corniche Rd, Abu Dhabi, United Arab Emirates",
    ar: "كونراد أبوظبي، أبراج الاتحاد، شارع الكورنيش، أبوظبي، الإمارات العربية المتحدة",
    de: "Conrad Abu Dhabi Etihad Towers, Corniche Straße, Abu Dhabi, Vereinigte Arabische Emirate",
    ru: "Conrad Abu Dhabi Etihad Towers, улица Корниш, Абу-Даби, ОАЭ",
    zh: "康莱德阿布扎比阿提哈德塔酒店，滨海路，阿布扎比，阿联酋"
  },

    slug: "conrad-abu-dhabi-etihad-towers",
    phone1: "02 205 2999",
    direction:
      "https://www.google.com/maps/dir//Conrad+Abu+Dhabi+Etihad+Towers/",
    location:
      "https://www.google.com/maps/place/Conrad+Abu+Dhabi+Etihad+Towers/",
    longitude: 54.3197303,
    latitude: 24.4584551,
    img: "/images/contactus/conrad-psi.webp",
  },

  {
    id: 9,
name: {
    en: "Benelux Branch",
    ar: "فرع بينلوكس",
    de: "Benelux Filiale",
    ru: "Филиал Benelux",
    zh: "Benelux 分公司"
  },

  address: {
    en: "Business Bay, Dubai",
    ar: "الخليج التجاري، دبي",
    de: "Business Bay, Dubai",
    ru: "Бизнес Бэй, Дубай",
    zh: "商业湾，迪拜"
  },

  address_community: {
    en: "Business Bay",
    ar: "الخليج التجاري",
    de: "Business Bay",
    ru: "Бизнес Бэй",
    zh: "商业湾"
  },

  address_city: {
    en: "Dubai",
    ar: "دبي",
    de: "Dubai",
    ru: "Дубай",
    zh: "迪拜"
  },

  off_address: {
    en: "Office 403, Sobha Sapphire, Business Bay, Dubai",
    ar: "مكتب 403، سوبها سافاير، الخليج التجاري، دبي",
    de: "Büro 403, Sobha Sapphire, Business Bay, Dubai",
    ru: "Офис 403, Sobha Sapphire, Бизнес Бэй, Дубай",
    zh: "403号办公室，Sobha Sapphire，商业湾，迪拜"
  },


    slug: "business-bay-branch",
    phone1: "04 323 0200",
    phone2: "050 812 0579",
    direction:
      "https://www.google.com/maps/dir//Fifty+One+Tower/",
    location:
      "https://www.google.ae/maps/place/Fifty+One+Tower/",
    longitude: 55.2822495,
    latitude: 25.1898642,
    img: "/images/contactus/bussiness-bay-psi.webp",
  },
];

export interface ContactLocation {
  id: number;

  name: string;
  name_ar?: string;

  address: string;
  address_ar?: string;

  address_community: string;
  address_community_ar?: string;

  address_city: string;
  address_city_ar?: string;

  off_address: string;
  off_address_ar?: string;

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
    name: "PSI Head Office",
    name_ar: "المكتب الرئيسي لـ PSI",

    address: "Al Reem Island, Abu Dhabi",
    address_ar: "جزيرة الريم، أبوظبي",

    address_community: "Al Reem Island",
    address_community_ar: "جزيرة الريم",

    address_city: "Abu Dhabi",
    address_city_ar: "أبوظبي",

    off_address:
      "Office No. 4410 & 4411, Addax Tower Level 44, Al Reem Island, City of Lights, Abu Dhabi, United Arab Emirates",
    off_address_ar:
      "مكتب رقم 4410 و4411، برج أدكس، الطابق 44، جزيرة الريم، سيتي أوف لايتس، أبوظبي، الإمارات العربية المتحدة",

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
    name: "PSI Assets",
    name_ar: "أصول PSI",

    address: "PSI Assets, Al Reem Island, Abu Dhabi",
    address_ar: "أصول PSI، جزيرة الريم، أبوظبي",

    address_community: "Al Reem Island",
    address_community_ar: "جزيرة الريم",

    address_city: "Abu Dhabi",
    address_city_ar: "أبوظبي",

    off_address:
      "1st Floor, Shams Boutik | Jazeerat Al Reem, Al Reem Island | Abu Dhabi, United Arab Emirates",
    off_address_ar:
      "الطابق الأول، شمس بوتيك | جزيرة الريم | أبوظبي، الإمارات العربية المتحدة",

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
    name: "Dubai Hills Branch",
    name_ar: "فرع دبي هيلز",

    address: "Business Park 3, Dubai Hills Estate",
    address_ar: "بيزنس بارك 3، دبي هيلز",

    address_community: "Dubai Hills Estate",
    address_community_ar: "دبي هيلز",

    address_city: "Dubai",
    address_city_ar: "دبي",

    off_address:
      "Office #104, Business Park 3, Dubai Hills Estate",
    off_address_ar:
      "مكتب رقم 104، بيزنس بارك 3، دبي هيلز",

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
    name: "Mamsha Branch",
    name_ar: "فرع ممشى السعديات",

    address: "Saadiyat Island, Abu Dhabi",
    address_ar: "جزيرة السعديات، أبوظبي",

    address_community: "Saadiyat Island",
    address_community_ar: "جزيرة السعديات",

    address_city: "Abu Dhabi",
    address_city_ar: "أبوظبي",

    off_address:
      "Mamsha Al Saadiyat, Building 9, Unit P3-R13, Abu Dhabi, United Arab Emirates",
    off_address_ar:
      "ممشى السعديات، مبنى 9، وحدة P3-R13، أبوظبي، الإمارات العربية المتحدة",

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
    name: "Waters Edge Branch",
    name_ar: "فرع ووترز إيدج",

    address: "Yas Island, Abu Dhabi",
    address_ar: "جزيرة ياس، أبوظبي",

    address_community: "Yas Island",
    address_community_ar: "جزيرة ياس",

    address_city: "Abu Dhabi",
    address_city_ar: "أبوظبي",

    off_address:
      "Al Maha St, Yas Island, Abu Dhabi, United Arab Emirates",
    off_address_ar:
      "شارع المها، جزيرة ياس، أبوظبي، الإمارات العربية المتحدة",

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
    name: "St. Regis Office",
    name_ar: "مكتب سانت ريجيس",

    address: "Saadiyat Island, Abu Dhabi",
    address_ar: "جزيرة السعديات، أبوظبي",

    address_community: "Saadiyat Island",
    address_community_ar: "جزيرة السعديات",

    address_city: "Abu Dhabi",
    address_city_ar: "أبوظبي",

    off_address:
      "PSI St Regis, Saadiyat Island, Abu Dhabi, United Arab Emirates",
    off_address_ar:
      "PSI سانت ريجيس، جزيرة السعديات، أبوظبي، الإمارات العربية المتحدة",

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
    name: "Palm Jumeirah Branch",
    name_ar: "فرع نخلة جميرا",

    address: "Palm Jumeirah, Dubai",
    address_ar: "نخلة جميرا، دبي",

    address_community: "Palm Jumeirah",
    address_community_ar: "نخلة جميرا",

    address_city: "Dubai",
    address_city_ar: "دبي",

    off_address:
      "Golden Mile Building 8, Palm Jumeirah, Dubai, United Arab Emirates",
    off_address_ar:
      "جولدن مايل، المبنى 8، نخلة جميرا، دبي، الإمارات العربية المتحدة",

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
    name: "Conrad Etihad Towers",
    name_ar: "فندق كونراد أبراج الاتحاد",

    address: "Al Bateen, Abu Dhabi",
    address_ar: "البطين، أبوظبي",

    address_community: "Al Bateen",
    address_community_ar: "البطين",

    address_city: "Abu Dhabi",
    address_city_ar: "أبوظبي",

    off_address:
      "Conrad Abu Dhabi Etihad Towers, Corniche Rd, Abu Dhabi, United Arab Emirates",
    off_address_ar:
      "كونراد أبوظبي، أبراج الاتحاد، شارع الكورنيش، أبوظبي، الإمارات العربية المتحدة",

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
    name: "Benelux Branch",
    name_ar: "فرع بينلوكس",

    address: "Business Bay, Dubai",
    address_ar: "الخليج التجاري، دبي",

    address_community: "Business Bay",
    address_community_ar: "الخليج التجاري",

    address_city: "Dubai",
    address_city_ar: "دبي",

    off_address:
      "Office 403, Sobha Sapphire, Business Bay, Dubai",
    off_address_ar:
      "مكتب 403، سوبها سافاير، الخليج التجاري، دبي",

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

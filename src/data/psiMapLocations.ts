
export interface psiMapLocation {
  id: number;
  name: string;
  address: string;
  address_community: string;
  address_city: string;
  off_address: string;
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

export const psiMapLocations: psiMapLocation[] = [
  {
    id: 1,
    name: 'PSI_Head_Office.name',
    address: 'PSI_Head_Office.address',
    address_community: 'PSI_Head_Office.address_community',
    address_city: 'Abu Dhabi',
    off_address: 'PSI_Head_Office.off_address',

    slug: "main-branch",
    phone1: "600 548 200",
    phone2: "02 205 2999",
    direction: "https://goo.gl/maps/LjKdHThYp57u2fka7",
    location: "https://goo.gl/maps/LjKdHThYp57u2fka7",
    longitude: 54.4030951693129,
    latitude: 24.499508550193866,
    google_map: "https://goo.gl/maps/LjKdHThYp57u2fka7",
    img: "/images/psi-headoffice.webp",
  },

  {
    id: 2,
    name: 'PSI_Assets.name',
    address: 'PSI_Assets.address',
    address_community: 'PSI_Assets.address_community',
    address_city: 'Abu Dhabi',
    off_address: 'PSI_Assets.off_address',

    slug: "psi-assets",
    phone1: "600 548 200",
    phone2: "02 205 2999",
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
    name: 'Dubai_Hills_Branch.name',
    address: 'Dubai_Hills_Branch.address',
    address_community: 'Dubai_Hills_Branch.address_community',
    address_city: 'Dubai',
    off_address: 'Dubai_Hills_Branch.off_address',

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
    name: 'Mamsha_Branch.name',
    address: 'Mamsha_Branch.address',
    address_community: 'Mamsha_Branch.address_community',
    address_city: 'Abu Dhabi',
    off_address: 'Mamsha_Branch.off_address',

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
    name: 'Waters_Edge_Branch.name',
    address: 'Waters_Edge_Branch.address',
    address_community: 'Waters_Edge_Branch.address_community',
    address_city: 'Abu Dhabi',
    off_address: 'Waters_Edge_Branch.off_address',

    slug: "waters-edge-branch",
    phone1: "600 548 200",
    phone2: "02 205 2999",
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
    name: 'St_Regis_Office.name',
    address: 'St_Regis_Office.address',
    address_community: 'St_Regis_Office.address_community',
    address_city: 'Abu Dhabi',
    off_address: 'St_Regis_Office.off_address',

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
    name: 'Palm_Jumeirah_Branch.name',
    address: 'Palm_Jumeirah_Branch.address',
    address_community: 'Palm_Jumeirah_Branch.address_community',
    address_city: 'Dubai',
    off_address: 'Palm_Jumeirah_Branch.off_address',

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
    name: 'Conrad_Etihad_Towers.name',
    address: 'Conrad_Etihad_Towers.address',
    address_community: 'Conrad_Etihad_Towers.address_community',
    address_city: 'Abu Dhabi',
    off_address: 'Conrad_Etihad_Towers.off_address',

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
    name: 'Benelux_Branch.name',
    address: 'Benelux_Branch.address',
    address_community: 'Benelux_Branch.address_community',
    address_city: 'Dubai',
    off_address: 'Benelux_Branch.off_address',

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
export interface ContactLocation {
  id: number;
  slug: string;

  nameKey: string;
  addressCommunityKey: string;
  addressCityKey: string;
  offAddressKey: string;

  phone1: string;
  phone2?: string;

  longitude: number;
  latitude: number;

  img: string;
}

export const contactLocations: ContactLocation[] = [
  {
    id: 1,
    slug: "main-branch",
    nameKey: "ContactPage.branches.main-branch.name",
    addressCommunityKey: "ContactPage.branches.main-branch.community",
    addressCityKey: "ContactPage.branches.main-branch.city",
    offAddressKey: "ContactPage.branches.main-branch.offAddress",
    phone1: "600 548 200",
    phone2: "02 205 2999",
    longitude: 54.4030951693129,
    latitude: 24.499508550193866,
    img: "/images/psi-headoffice.webp",
  },

  {
    id: 2,
    slug: "psi-assets",
    nameKey: "ContactPage.branches.psi-assets.name",
    addressCommunityKey: "ContactPage.branches.psi-assets.community",
    addressCityKey: "ContactPage.branches.psi-assets.city",
    offAddressKey: "ContactPage.branches.psi-assets.offAddress",
    phone1: "600 548 200",
    phone2: "02 205 2999",
    longitude: 54.40789730524954,
    latitude: 24.49630487299215,
    img: "/images/contactus/psi-assets.webp",
  },

  {
    id: 3,
    slug: "dubai-hills-branch",
    nameKey: "ContactPage.branches.dubai-hills-branch.name",
    addressCommunityKey: "ContactPage.branches.dubai-hills-branch.community",
    addressCityKey: "ContactPage.branches.dubai-hills-branch.city",
    offAddressKey: "ContactPage.branches.dubai-hills-branch.offAddress",
    phone1: "04 508 8000",
    phone2: "04 508 8001",
    longitude: 55.2402619,
    latitude: 25.1064621,
    img: "/images/contactus/dubai-hills-psi.webp",
  },

  {
    id: 4,
    slug: "mamsha-saadiyat-branch",
    nameKey: "ContactPage.branches.mamsha-saadiyat-branch.name",
    addressCommunityKey: "ContactPage.branches.mamsha-saadiyat-branch.community",
    addressCityKey: "ContactPage.branches.mamsha-saadiyat-branch.city",
    offAddressKey: "ContactPage.branches.mamsha-saadiyat-branch.offAddress",
    phone1: "600 548 200",
    phone2: "02 205 2999",
    longitude: 54.4048641,
    latitude: 24.5386169,
    img: "/images/contactus/mamsha-psi.webp",
  },

  {
    id: 5,
    slug: "waters-edge-branch",
    nameKey: "ContactPage.branches.waters-edge-branch.name",
    addressCommunityKey: "ContactPage.branches.waters-edge-branch.community",
    addressCityKey: "ContactPage.branches.waters-edge-branch.city",
    offAddressKey: "ContactPage.branches.waters-edge-branch.offAddress",
    phone1: "600 548 200",
    phone2: "02 205 2999",
    longitude: 54.614587,
    latitude: 24.4799716,
    img: "/images/contactus/waters-edge-psi.webp",
  },

  {
    id: 6,
    slug: "st-regis-office",
    nameKey: "ContactPage.branches.st-regis-office.name",
    addressCommunityKey: "ContactPage.branches.st-regis-office.community",
    addressCityKey: "ContactPage.branches.st-regis-office.city",
    offAddressKey: "ContactPage.branches.st-regis-office.offAddress",
    phone1: "600 548 200",
    phone2: "02 205 2999",
    longitude: 54.4048641,
    latitude: 24.5386169,
    img: "/images/contactus/mamsha-psi.webp",
  },

  {
    id: 7,
    slug: "palm-jumeirah-branch",
    nameKey: "ContactPage.branches.palm-jumeirah-branch.name",
    addressCommunityKey: "ContactPage.branches.palm-jumeirah-branch.community",
    addressCityKey: "ContactPage.branches.palm-jumeirah-branch.city",
    offAddressKey: "ContactPage.branches.palm-jumeirah-branch.offAddress",
    phone1: "600 548 200",
    phone2: "02 205 2999",
    longitude: 55.14143045391955,
    latitude: 25.11119355668974,
    img: "/images/contactus/palm-psi.webp",
  },

  {
    id: 8,
    slug: "conrad-abu-dhabi-etihad-towers",
    nameKey: "ContactPage.branches.conrad-abu-dhabi-etihad-towers.name",
    addressCommunityKey: "ContactPage.branches.conrad-abu-dhabi-etihad-towers.community",
    addressCityKey: "ContactPage.branches.conrad-abu-dhabi-etihad-towers.city",
    offAddressKey: "ContactPage.branches.conrad-abu-dhabi-etihad-towers.offAddress",
    phone1: "02 205 2999",
    longitude: 54.3197303,
    latitude: 24.4584551,
    img: "/images/contactus/conrad-psi.webp",
  },

  {
    id: 9,
    slug: "business-bay-branch",
    nameKey: "ContactPage.branches.business-bay-branch.name",
    addressCommunityKey: "ContactPage.branches.business-bay-branch.community",
    addressCityKey: "ContactPage.branches.business-bay-branch.city",
    offAddressKey: "ContactPage.branches.business-bay-branch.offAddress",
    phone1: "04 323 0200",
    phone2: "050 812 0579",
    longitude: 55.2822495,
    latitude: 25.1898642,
    img: "/images/contactus/bussiness-bay-psi.webp",
  },
];

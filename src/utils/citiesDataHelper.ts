
export const getCitiesData = (t_cities: any) => {
    return [
        {
            title: t_cities('abu_dhabi.title'),
            id: "26792",
            content: "#",
            image: '/images/gallery-1-new.webp',
            projects: [
                {
                    title: t_cities('abu_dhabi.al_reem_island'),
                    type: "APT | VI | TH | PH",
                    image: '/images/projects/al-reem-island-image.webp',
                    project_url: '/projects/abu-dhabi/al-reem-island',
                },
                {
                    title: t_cities('abu_dhabi.saadiyat_island'),
                    type: "APT | VI | TH | PH",
                    image: '/images/projects/saadiyat-island.webp',
                    project_url: '/projects/abu-dhabi/saadiyat-island',
                },
                {
                    title: t_cities('abu_dhabi.yas_island'),
                    type: "APT | VI | TH | PH",
                    image: '/images/projects/yas-island.webp',
                    project_url: '/projects/abu-dhabi/yas-island',
                },
                {
                    title: t_cities('abu_dhabi.al_raha_beach'),
                    type: "APT | VI | TH | PH",
                    image: '/images/projects/al-raha-beach-image.webp',
                    project_url: '/projects/abu-dhabi/al-raha-beach',
                },
            ],
        },
        {
            title: t_cities('dubai.title'),
            id: "26786",
            content: "#",
            image: '/images/gallery-2-new.webp',
            projects: [
                {
                    title: t_cities('dubai.palm_jumeirah'),
                    type: "APT | VI | TH | PH",
                    image: '/images/projects/palm-jumeriah.webp',
                    project_url: '/projects/dubai/the-palm-jumeirah',
                },
                {
                    title: t_cities('dubai.downtown_dubai'),
                    type: "APT | VI | TH | PH",
                    image: '/images/projects/dubai-downtown.webp',
                    project_url: '/projects/dubai/downtown-dubai',
                },
                {
                    title: t_cities('dubai.dubai_creek'),
                    type: "APT | VI | TH | PH",
                    image: '/images/projects/dubai-creek.webp',
                    project_url: '/projects/dubai/dubai-creek',
                },
                {
                    title: t_cities('dubai.town_square_dubai'),
                    type: "APT | VI | TH | PH",
                    image: '/images/projects/townsquare-dubai.webp',
                    project_url: '/projects/dubai/town-square-dubai',
                },
            ],
        },
        {
            title: t_cities('sharjah.title'),
            id: "26953",
            content: "#",
            image: '/images/gallery-3-new.webp',
            projects: [
                {
                    title: t_cities('sharjah.al_khan'),
                    type: "APT | VI | TH | PH",
                    image: '/images/projects/al-khan.webp',
                    project_url: '/projects/sharjah/al-khan',
                },
                {
                    title: t_cities('sharjah.sharjah_waterfront_city'),
                    type: "APT | VI | TH | PH",
                    image: '/images/projects/sharjah-waterfront.webp',
                    project_url: '/projects/sharjah/sharjah-waterfront-city',
                },
                {
                    title: t_cities('sharjah.aljada'),
                    type: "APT | VI | TH | PH",
                    image: '/images/projects/aljada.webp',
                    project_url: '/projects/sharjah/aljada',
                },
            ],
        },
    ];
};

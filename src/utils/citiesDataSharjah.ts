
export const getSharjahCitiesData = (t_cities: any) => {
    return [        
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

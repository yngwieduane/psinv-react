
export const getRAKCitiesData = (t_cities: any) => {
    return [        
        {
            title: t_cities('rak.title'),
            id: "26953",
            content: "#",
            image: '/images/gallery-3-new.webp',
            projects: [
                {
                    title: t_cities('rak.mina_al_arab'),
                    type: "APT | VI | TH | PH",
                    image: '/images/projects/mina-al-arab.webp',
                    project_url: '/projects/ras-al-khaimah/mina-al-arab',
                },
                {
                    title: t_cities('rak.al-marjan-island'),
                    type: "APT | VI ",
                    image: '/images/projects/al-marjan-island.webp',
                    project_url: '/projects/ras-al-khaimah/al-marjan-island',
                },
            ],
        },        
    ];
};

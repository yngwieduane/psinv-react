
export const getDubaiCitiesData = (t_cities: any) => {
    return [        
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
    ];
};

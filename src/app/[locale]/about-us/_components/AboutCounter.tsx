
'use client';
import { useEffect} from "react"

const AboutCounter: React.FC = () => {

    const AnimateCounter = (element: HTMLElement) => { 
            const countTo = parseInt(element.getAttribute("data-count") || "0");
            let current = 0;

            const interval = setInterval(() => {
                if (current < countTo) {
                    current += Math.ceil(countTo / 100);
                    element.textContent = current.toString();                                
                }
                else {
                    element.textContent = countTo.toString();
                    clearInterval(interval);
                }
            }, 30);
    }
    
    useEffect(() => {
        const counters = document.querySelectorAll(".data-count");
        const observer = new IntersectionObserver (
            (entries,observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const targert = entry.target as HTMLElement;
                        AnimateCounter(targert);
                        observer.unobserve(targert);
                    }
                });
            }, 
            { threshold: 0.5 } // Adjust visibility threshold
        );

        counters.forEach((counter) => {
            observer.observe(counter);
        });

        return () => {
            counters.forEach((counter) => {
                observer.unobserve(counter);
            });
        };
    }, []);  
    
    return null;
           
};

export default AboutCounter;
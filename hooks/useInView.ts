import React, { useEffect } from 'react';

export function useInView(ref: React.RefObject<HTMLElement>, options?: IntersectionObserverInit) {
    useEffect(() => {
        if (!ref.current) return;
        const root = ref.current;
        // Select elements directly inside the component, or all if we want to trigger them universally.
        // It's usually better to scope to the root.
        const targets = root.querySelectorAll<HTMLElement>('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    (entry.target as HTMLElement).classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, ...options });
        targets.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [ref, options]);
}

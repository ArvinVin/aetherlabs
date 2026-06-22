import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationProps {
  type?: 'fade-up' | 'stagger' | 'parallax';
  delay?: number;
  duration?: number;
  distance?: number;
  staggerAmount?: number;
}

export function useScrollAnimation({ 
  type = 'fade-up', 
  delay = 0, 
  duration = 0.8,
  distance = 50,
  staggerAmount = 0.2
}: ScrollAnimationProps = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const el = ref.current;

    if (type === 'fade-up') {
      gsap.fromTo(el,
        { 
          y: distance, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    } else if (type === 'stagger') {
      const children = el.children;
      gsap.fromTo(children,
        { 
          y: distance, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger: staggerAmount,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    } else if (type === 'parallax') {
      // For images within the container
      const image = el.querySelector('img');
      if (image) {
        gsap.to(image, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }
  }, { scope: ref, dependencies: [type, delay, duration, distance, staggerAmount] });

  return ref;
}

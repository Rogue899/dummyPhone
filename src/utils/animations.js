import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const animateWithGSAPTimeline = (timeline, rotationRef, rotationSate, firstTarget, secondTarget, animationProps) => {
   timeline.to(rotationRef.current.rotation, {
    y: rotationSate,
    duration: 1,
    ease: 'power1.inOut',
   })
   timeline.to(firstTarget,{
    ...animationProps,
    ease: 'power1.inOut'
    },'<');
    // '<' insert animation at the start of the prev animation
    timeline.to(secondTarget,{
        ...animationProps,
        ease: 'power1.inOut'
    },'<');
};

export const animateWithGSAP = (target, animationProps, scrollProps) => {
    gsap.to(target, {
        ...animationProps,
        scrollTrigger: {
            trigger: target,
            // toggleActions: onEnter, onLeave, enterBack, leaveBack
            // 4 distonct places scrollIn, comeBack, scrollDown, scrollUp again
            toggleActions: 'restart reverse restart reverse',
            // define the starting position of the scroll trigger
            // scroll psoition when the top of the trigger is 85% from the top of the viewport it will activate
            start: 'top 85%',
            ...scrollProps
        }
    });
};


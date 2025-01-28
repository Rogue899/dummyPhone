import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {heroVideo, smallHeroVideo} from "../utils";
import { useState } from "react";
import { useEffect } from "react";

const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(window.innerWidth >= 760 ? heroVideo : smallHeroVideo);

    const handleResize = () => {
        setVideoSrc(window.innerWidth >= 760 ? heroVideo : smallHeroVideo);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useGSAP(() => {
        gsap.to(".hero-title", {
            opacity: 1,
            delay: 2,
            ease: "power1.in",
        })
        gsap.to("#cta", {
            y: 0,
            opacity: 1,
            delay: 2,
            ease: "power1.in",
        })
    });

    return (
        <section className="w-full nav-height bg-black relative">
            <div className="h-5/6 w-full flex-center flex-col">
                <p className="hero-title">
                    IPhone 15 Pro
                </p>
                <div className="md:w-10/12 w-9/12">
                    <video className="pointer-events-none" autoPlay muted loop playsInline key={videoSrc}>
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                </div>
            </div>
            <div id="cta" className="flex flex-col items-center translate-y-20 opacity-0">
                <a href="#highlights" className="btn">Buy</a>
                <p className="font-normal text-xl">From $199/month or $999</p>
            </div>    
        </section>
    )
}

export default Hero;
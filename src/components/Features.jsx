import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react'
import { animateWithGSAP } from '../utils/animations';
import { explore1Img, explore2Img, exploreVideo } from '../utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const videoRef = useRef();
    useGSAP(()=>{
        // gsap.to('#exploreVideo', {
        //     scrollTrigger: {
        //       trigger: '#exploreVideo',
        //       toggleActions: 'play pause reverse restart',
        //       start: '10%, bottom',
        //     },
        //     onComplete: () => {
        //       videoRef.current.play();
        //     }
        //   });

        //   gsap.to('#exploreVideo', {
        //     scrollTrigger: {
        //       trigger: '#exploreVideo',
        //       toggleActions: 'play pause reverse restart',
        //       start: '90%, top',
        //     },
        //     onComplete: () => {
        //       videoRef.current.play();
        //     }
        //   });

        gsap.to('#exploreVideo', {
            scrollTrigger: {
                trigger: '#exploreVideo',
                toggleActions: 'play pause reverse restart',
                start: 'top bottom',
                onEnter: () => {
                    videoRef.current.currentTime = 0; // Restart the video
                    videoRef.current.play();
                },
                onLeave: () => {
                    videoRef.current.pause();
                },
                onEnterBack: () => {
                    videoRef.current.currentTime = 0; // Restart the video
                    videoRef.current.play();
                },
                onLeaveBack: () => {
                    videoRef.current.pause();
                }
            }
        });

        animateWithGSAP(
            '#features-title',
            { y: 0, opacity: 1}
        );
        animateWithGSAP(
            '.g_grow',
            { scale: 1, opacity: 1, ease: 'power1' },
            { scrub: 5.5 }
        );
        animateWithGSAP('.g_text', {y:0, opacity: 1, ease: 'power2.inOut',duration: 1});
    },[]);

    return (
    <section id="features" className="relative overflow-hidden h-full common-padding bg-zinc">
        <div className="screen-max-width">
            <div className="mb-12 w-full">
                <h1 id="features-title" className="section-heading">Explore the full story.</h1>
            </div>
            <div className="flex flex-col items-center justify-center overflow-hidden">
                <div className="sm:w-[70%] mt-32 mb-24 pl-24">
                    <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
                    <h2 className="text-5xl lg:text-7xl font-semibold">Forged in titanium.</h2>
                </div>

                <div className="flex-col flex-center sm:px-10">
                    <div className='relative h-[50vh] w-full flex items-center'>
                        <video id="exploreVideo" className='w-full h-full object-cover object-center' preload="none" autoPlay muted ref={videoRef}>
                            <source src={exploreVideo} type="video/mp4" />
                        </video>
                    </div>
                    {/* image container */}
                    <div className='flex flex-col w-full relative'>
                        <div className='feature-video-container'>
                            <div className='overflow-hidden flex-1 h-[50vh]'>
                                <img src={explore1Img} alt="titanium" className='feature-video g_grow' />
                            </div>
                            <div className="overflow-hidden flex-1 h-[50vh]">
                                <img src={explore2Img} alt="titanium 2" className="feature-video g_grow" />
                            </div>
                        </div>
                        <div className="feature-text-container">
                            <div className="flex-1 flex-center">
                                <p className='feature-text g_text'>
                                    iPhone 15 Pro is {' '}
                                    <span className='text-white'>
                                        the first iPhone to feature an aerospace-grade titanium design
                                    </span>,
                                    using the same alloy the spacecrafts use for missions to Mars
                                </p>
                            </div>

                            <div className='flex-1 flex-center'>
                                <p className='feature-text g_text'>
                                   Titanium has one of the best strength-to-weight ratios of any metal, making these our{' '}
                                    <span className='text-white'>
                                        lightest Pro models ever.
                                    </span>,
                                    You'll feel the difference in your hand.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features
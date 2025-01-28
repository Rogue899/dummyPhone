import { useRef } from "react";
import { hightlightsSlides } from "../constants";
import { useState } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { pauseImg, playImg, replayImg } from "../utils";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });

    const [loadedData, setLoadedData] = useState([]);

    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

    useGSAP(()=>{
        gsap.to('#slider', {
            // animate the slider to move the second video
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power1.inOut',
        });
        
        gsap.to('#video', {
            // once in view trigger
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none',
            },
            onComplete: () => {
                setVideo((prev) => ({ 
                    ...prev, 
                    startPlay: true,
                    isPlaying: true, 
                }));
            }
        });
    },[videoId, isEnd]);

    // for playing the video
    useEffect(() => {
        if(loadedData.length > 3){
            if(!isPlaying){
                videoRef.current[videoId].pause();
            } else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [videoId, startPlay, isPlaying, loadedData]);

    // for loading the video to trigger useEffect
    const handleLoadedMetaData = (i,e) => setLoadedData((prev) => [...prev, e]);

    // animate the progress bar of the video/animation to move the indicator
    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if(span[videoId]){
            let animation = gsap.to(span[videoId], {
                // options can be properties to animate like opacity... or specific functions like onUpdate
                onUpdate: () => {
                    const progress = Math.ceil(animation.progress() * 100);
                    if(progress !== currentProgress){
                        currentProgress = progress;
                    }
                    // get the container of the grey dot
                    gsap.to(videoDivRef.current[videoId], {
                        // mobile tablet laptop
                        width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw',
                    });
                    // animate the width of the grey dot
                    gsap.to(span[videoId], {
                        width: `${currentProgress}%`,
                        backgroundColor: 'white',
                    });
                },
                onComplete: () => {
                    if(isPlaying){
                        // bring back the grey dot (that has become a white bar at this point) to its original size
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px',
                        });
                        // bring back the grey dot to its original color
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf',
                        });
                    }
                }
            });

            if(videoId === 0){
                // restart the animation
                animation.restart();
            }

            const animUpdate = () => {
                if (videoRef.current[videoId]) {
                    // current time of the video / total duration of the video (how far have we come)
                    animation.progress( videoRef.current[videoId].currentTime /
                        hightlightsSlides[videoId].videoDuration);
                }
            }

            if(isPlaying){
                // ticker to update the progress bar
                gsap.ticker.add(animUpdate);
            } else {
                gsap.ticker.remove(animUpdate);
            }
        };
    }, [videoId, startPlay]);

    const handleProcess = (type, i) => {
        switch (type) {
            case "video-end":
              setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
              break;
      
            case "video-last":
              setVideo((pre) => ({ ...pre, isLastVideo: true }));
              break;
      
            case "video-reset":
              setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
              break;
      
            case "pause":
              setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
              break;
      
            case "play":
              setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
              break;
            
            case "start-new":
                setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
                break;
      
            default:
                return video;
        }
    }

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, index) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                            <video
                                id="video"
                                playsInline={true}
                                preload="auto"
                                muted
                                ref={(el) => (videoRef.current[index] = el)}
                                className={`${
                                    list.id === 2 && "translate-x-44"
                                } pointer-events-none`}
                                // onEnded to trigger the next video
                                onEnded={() =>
                                    index !== 3
                                    ? handleProcess("video-end", index)
                                    : handleProcess("video-last")
                                }
                                // onPlay to trigger the video to play
                                    onPlay={() =>
                                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                                }
                                // onLoadedMetadata to trigger the video to load
                                onLoadedMetadata={(e) => handleLoadedMetaData(index, e)}
                                >
                                <source src={list.video} type="video/mp4" />
                            </video>
                            </div>
                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map((text, index) => (
                                    <p key={index} className="md:text-2xl text-xl font-medium">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* progressBar and control buttons */}
            <div className="relative flex-center mt-10">
                <div className="py-5 px-7 bg-gray-300 backdrop-blur rounded-full flex-center">
                    {videoRef.current.map((_, index) => (
                        <span key={index} 
                        className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                        ref={(el) => videoDivRef.current[index] = el}>
                            <span className="absolute w-full h-full rounded-full"
                            ref={(el) => videoSpanRef.current[index] = el}
                            />
                        </span>
                    ))}
                </div>
                <button className="control-btn">
                    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} 
                    alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                    onClick={isLastVideo ? () => handleProcess('video-reset') : 
                    !isPlaying ? () => handleProcess('play') : 
                    () => handleProcess('pause')}
                    />
                </button>
            </div>
        </>
    )
}

export default VideoCarousel;
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ModelView from "./ModelView";
import { yellowImg } from "../utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGSAPTimeline } from "../utils/animations";

const Model = () => {
    const [size, setSize] = useState('small');
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro',
        price: '$1299',
        color: ['#8F8A81','#FFE789','#6F6C64'],
        storage: ['256GB','512GB','1TB'],
        img: yellowImg
    });

    // As this is a 3dModel it needs a camera to control the model view with camera controls
    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();
    
    // model
    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());

    //rotation
    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0);

    const tl = gsap.timeline();

    useEffect(() => {
        if(size === 'large'){
            animateWithGSAPTimeline(tl, small, smallRotation,
                '#view1', '#view2',{
                    // remove from view
                    transform: 'translateX(-100%)',
                    duration: 2,
                } );
        }
        if(size === 'small'){
            animateWithGSAPTimeline(tl, large, largeRotation,
                '#view2', '#view1',{
                    // remove from view
                    transform: 'translateX(0)',
                    duration: 2,
                } );    
        }
    }, [size]);

    useGSAP(() => {
        gsap.to('#heading', {
           y: 0,
           opacity: 1
        })
    }, []);

   return (
    <section id="model" className="common-padding">
       <div className="screen-max-width">
        <h1 id="heading" className="section-heading">Take a closer look.</h1>
        <div className="flex flex-col items-center mt-5">
            <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            {/* seperate logic of the model by rendering a diff component for the 3d phone model */}
               <ModelView 
                index={1} 
                groupRef={small} 
                gsapType="view1" 
                controlRef={cameraControlSmall}
                setRotationState={setSmallRotation}
                item={model}
                size={size}
               />
               <ModelView 
                index={2}
                groupRef={large}
                gsapType="view2"
                controlRef={cameraControlLarge}
                setRotationState={setLargeRotation}
                item={model}
                size={size}
                />
                <Canvas
                className="w-full h-full"
                style={{
                position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    overflow: 'hidden'
                }}
                eventSource={document.getElementById('root')}
                >
                    <View.Port />
                </Canvas>
            </div>
            <div className="mx-auto w-full">
                <p className="text-center text-sm font-light mb-5">{model.title}</p>
                <div className="flex-center">
                    <ul className="color-container">
                        {models.map((item, i) => (
                            <li key={i} className="w-6 h-6 cursor-pointer rounded-full mx-2"
                            style={{ backgroundColor: item.color[0] }} onClick={() => setModel(item)}>

                            </li>
                        ))}
                    </ul>
                        <button className="size-btn-container">
                        {sizes.map(({label, value}) => (
                            <span key={label}
                                className="size-btn cursor-pointer"
                                style={{backgroundColor: size === value ? 'white' : 'transparent',
                                    color: size === value ? 'black' : 'white'}}
                                onClick={() => setSize(value)}>
                                {label}
                            </span>
                        ))}
                    </button>
                </div>
            </div>
        </div>
       </div>
    </section>
   )
}
export default Model;
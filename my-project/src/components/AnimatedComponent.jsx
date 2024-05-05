// import React, { useRef, useEffect } from 'react';
// import { gsap } from 'gsap';

// const CircleTexts = () => {
//     const circleRefs = useRef([]);
//     circleRefs.current = new Array(6).fill(null).map((_, i) => circleRefs.current[i] || React.createRef());

//     useEffect(() => {
//         const handleKeyDown = () => {
//             circleRefs.current.forEach(ref => {
//                 gsap.to(ref.current, { scale: 1.5 });
//             });
//         };

//         const handleKeyUp = () => {
//             circleRefs.current.forEach(ref => {
//                 gsap.to(ref.current, { scale: 1 });
//             });
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         window.addEventListener('keyup', handleKeyUp);

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             window.removeEventListener('keyup', handleKeyUp);
//         };
//     }, []);

//     return (
//         <div>
//             {circleRefs.current.map((ref, index) => (
//                 <p
//                     key={index}
//                     ref={ref}
//                     style={{
//                         background: 'blue',
//                         borderRadius: '50%',
//                         width: '100px',
//                         height: '100px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: 'white',
//                         margin: '10px',
//                         transform: 'scale(1)'
//                     }}
//                 >
//                     Press a key
//                 </p>
//             ))}
//         </div>
//     );
// };
//--------------------------------------------------------------------------------------



import React, { useEffect, useRef } from 'react';
// import * as Tone from 'tone';
// import gsap from 'gsap';

// const Keyboard = () => {
//     // Define a mapping of keys to their corresponding frequencies
//     const keyMap = {
//         'a': 'C4',
//         'w': 'C#4',
//         's': 'D4',
//         'e': 'D#4',
//         'd': 'E4',
//         'f': 'F4',
//         't': 'F#4',
//         'j': 'G4',
//         'i': 'G#4',
//         'k': 'A4',
//         'o': 'A#4',
//         'l': 'B4',
//         ';': 'C5',
//     };

//     // Object to store refs for each key
//     const keyRefs = {
//         'a': useRef(null),
//         'w': useRef(null),
//         's': useRef(null),
//         'e': useRef(null),
//         'd': useRef(null),
//         'f': useRef(null),
//         't': useRef(null),
//         'j': useRef(null),
//         'i': useRef(null),
//         'k': useRef(null),
//         'o': useRef(null),
//         'l': useRef(null),
//         ';': useRef(null),
//     };

//     useEffect(() => {
//         const animateElement = (element, setScale, bgs) => {
//             gsap.to(element, { scale: setScale, background: bgs });
//         };

//         const synth = new Tone.Synth().toDestination();

//         const handleKeyDown = (event) => {
//             const key = event.key.toLowerCase();
//             const note = keyMap[key];
//             const element = keyRefs[key].current;

//             if (note) {
//                 synth.triggerAttack(note);
//                 if (element) {
//                     animateElement(element, 1.25, "red"); // Adjust the speed here
//                 }
//             }
//         };

//         const handleKeyUp = (event) => {
//             const key = event.key.toLowerCase();
//             const note = keyMap[key];
//             const element = keyRefs[key].current;

//             if (note) {
//                 synth.triggerRelease();
//                 if (element) {
//                     animateElement(element, 1, "#2997ff");
//                 }
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         window.addEventListener('keyup', handleKeyUp);

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             window.removeEventListener('keyup', handleKeyUp);
//         };
//     }, []); // Include keyDownTime in dependencies array

//     return (
//         <div className='common-padding'>
//             <div className='flex-center'>
//                 <p className='hiw-text'>Press keys (A to K) to play sounds</p>
//             </div>
//             <div className='px-10'>
//                 <div className='hiw-text-container'>
//                     <div className='hiw-text-container my-12 ml-16 px-4'>
//                         <p id='w' ref={keyRefs['w']} className='hiw-bigtext bg-size ml-10 px-10 py-10 bg-blue'>W</p>
//                         <p id='e' ref={keyRefs['e']} className='hiw-bigtext bg-size ml-10 px-10 py-10 bg-blue'>E</p>
//                     </div>
//                     <div className='hiw-text-container my-12 mr-16 px-4'>
//                         <p id='t' ref={keyRefs['t']} className='hiw-bigtext bg-size mr-10 px-10 py-10 bg-blue'>T</p>
//                         <p id='i' ref={keyRefs['i']} className='hiw-bigtext bg-size mr-10 px-10 py-10 bg-blue'>I</p>
//                         <p id='o' ref={keyRefs['o']} className='hiw-bigtext bg-size mr-10 px-10 py-10 bg-blue'>O</p>
//                     </div>
//                 </div>
//                 <div className='hiw-text-container my-10'>
//                     <p id='a' ref={keyRefs['a']} className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>A</p>
//                     <p id='s' ref={keyRefs['s']} className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>S</p>
//                     <p id='d' ref={keyRefs['d']} className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>D</p>
//                     <p id='f' ref={keyRefs['f']} className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>F</p>
//                     <p id='j' ref={keyRefs['j']} className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>J</p>
//                     <p id='k' ref={keyRefs['k']} className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>K</p>
//                     <p id='l' ref={keyRefs['l']} className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>L</p>
//                     <p id='semi' ref={keyRefs[';']} className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>:</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Keyboard;

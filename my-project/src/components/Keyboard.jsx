
import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import gsap from 'gsap';

const Keyboard = () => {
    const keyMap = {
        key1: {
            'a': 'C1',
            'w': 'C#1',
            's': 'D1',
            'e': 'D#1',
            'd': 'E1',
            'f': 'F1',
            't': 'F#1',
            'j': 'G1',
            'i': 'G#1',
            'k': 'A1',
            'o': 'A#1',
            'l': 'B1',
            ';': 'C2',
        },
        key2: {
            'a': 'C2',
            'w': 'C#2',
            's': 'D2',
            'e': 'D#2',
            'd': 'E2',
            'f': 'F2',
            't': 'F#2',
            'j': 'G2',
            'i': 'G#2',
            'k': 'A2',
            'o': 'A#2',
            'l': 'B2',
            ';': 'C3',
        },
        key3: {
            'a': 'C3',
            'w': 'C#3',
            's': 'D3',
            'e': 'D#3',
            'd': 'E3',
            'f': 'F3',
            't': 'F#3',
            'j': 'G3',
            'i': 'G#3',
            'k': 'A3',
            'o': 'A#3',
            'l': 'B3',
            ';': 'C3',
        },

        key4: {
            'a': 'C4',
            'w': 'C#4',
            's': 'D4',
            'e': 'D#4',
            'd': 'E4',
            'f': 'F4',
            't': 'F#4',
            'j': 'G4',
            'i': 'G#4',
            'k': 'A4',
            'o': 'A#4',
            'l': 'B4',
            ';': 'C5',
        },
        key5: {
            'a': 'C5',
            'w': 'C#5',
            's': 'D5',
            'e': 'D#5',
            'd': 'E5',
            'f': 'F5',
            't': 'F#5',
            'j': 'G5',
            'i': 'G#5',
            'k': 'A5',
            'o': 'A#5',
            'l': 'B5',
            ';': 'C6',
        },
        key6: {
            'a': 'C6',
            'w': 'C#6',
            's': 'D6',
            'e': 'D#6',
            'd': 'E6',
            'f': 'F6',
            't': 'F#6',
            'j': 'G6',
            'i': 'G#6',
            'k': 'A6',
            'o': 'A#6',
            'l': 'B6',
            ';': 'C7',
        },
        key7: {
            'a': 'C7',
            'w': 'C#7',
            's': 'D7',
            'e': 'D#7',
            'd': 'E7',
            'f': 'F7',
            't': 'F#7',
            'j': 'G7',
            'i': 'G#7',
            'k': 'A7',
            'o': 'A#7',
            'l': 'B7',
            ';': 'C8',
        },
        key8: {
            'a': 'C8',
            'w': 'C#8',
            's': 'D8',
            'e': 'D#8',
            'd': 'E8',
            'f': 'F8',
            't': 'F#8',
            'j': 'G8',
            'i': 'G#8',
            'k': 'A8',
            'o': 'A#8',
            'l': 'B8',
            ';': 'C9',
        },

    };
    const keyMap2 = [keyMap.key1, keyMap.key2, keyMap.key3, keyMap.key4, keyMap.key5, keyMap.key6, keyMap.key7, keyMap.key8];

    const synth = new Tone.PolySynth({
        oscillator: { type: 'amsawtooth' },
        envelope: {
            attack: 0.4, // 음이 발생하는 시간
            decay: 0.1, // 음이 사라지는 시간
            sustain: 0.8, // 음이 지속되는 시간
            release: 0.3 /// 음이 사라지는 시간
        },
        maxPolyphony: 8 // 동시에 연주할 수 있는 음의 개수

    }).toDestination(); // 여러 음을 동시에 연주할 수 있는 PolySynth 객체 생성


    const pressedTimeRef = useRef({});
    const [keyLevel, setKeyLevel] = useState(4);


    const animateKeyPress = (element) => {
        gsap.to(element, { scale: 1.5, background: 'red' });
    };

    const animateKeyRelease = (element) => {
        gsap.to(element, { scale: 1, background: '#2997ff' });
    };


    useEffect(() => {
        const plus = (e) => {
            const key = e.key.toLowerCase();

            if (key === 'r') {

                if (Object.values(pressedTimeRef.current).length === 0) {
                    setKeyLevel(prevCount => prevCount === 7 ? 7 : prevCount + 1);
                } else {
                    return false;
                }
            }

        };
        const subtract = (e) => {
            const key = e.key.toLowerCase();
            if (key === 'q') {
                if (Object.values(pressedTimeRef.current).length === 0) {
                    setKeyLevel(prevCount => prevCount === 0 ? 0 : prevCount - 1);
                } else {
                    return false;
                }
            }
        };

        const handleKeyDown = (event) => {
            const key = event.key.toLowerCase();
            const note = keyMap2[keyLevel][key];
            const element = document.getElementById(key);
            const now = Tone.now();
            // 키가 눌려져 있는지 확인하고, 노트가 있는지 확인.

            if (!pressedTimeRef.current[key] && note) {
                pressedTimeRef.current[key] = now;// 키가 처음 눌렸을 때 시간을 기록
                synth.triggerAttack(note);
                if (element) {
                    animateKeyPress(element);
                }
            }
        };

        const handleKeyUp = (event) => {
            const key = event.key.toLowerCase();
            const note = keyMap2[keyLevel][key];
            const element = document.getElementById(key);
            const now2 = Tone.now();
            const pressedTime = now2 - pressedTimeRef.current[key]; // 키를 누르고 뗄 때 시간을 계산
            if (note && pressedTime !== undefined) {
                synth.triggerRelease(note);
                if (element) {
                    animateKeyRelease(element);
                }
                delete pressedTimeRef.current[key]; // 키를 뗐을 때 시간을 삭제
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('keypress', plus);
        window.addEventListener('keypress', subtract);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('keypress', plus);
            window.removeEventListener('keypress', subtract);
        };
    }, [keyLevel]);

    return (
        <div className='common-padding'>
            <div className='flex-center'>
                <p className='hiw-text'>Press keys (A to :) to play sounds</p>
            </div>
            <div className='flex-center py-5 '>
                <div id='plus' className='hiw-bigtext px-5 mx-5'>-</div>
                <div id='count' className='hiw-bigtext px-5 mx-5'>{keyLevel}</div>
                <div id='sub' className='hiw-bigtext px-5 mx-5'>+</div>
            </div>

            <div className='px-10'>
                <div className='hiw-text-container'>
                    <div className='hiw-text-container my-12 ml-16 px-4'>
                        <p id='w' className='hiw-bigtext bg-size ml-10 px-10 py-10 bg-blue'>W</p>
                        <p id='e' className='hiw-bigtext bg-size ml-10 px-10 py-10 bg-blue'>E</p>
                    </div>
                    <div className='hiw-text-container my-12 mr-16 px-4'>
                        <p id='t' className='hiw-bigtext bg-size mr-10 px-10 py-10 bg-blue'>T</p>
                        <p id='i' className='hiw-bigtext bg-size mr-10 px-10 py-10 bg-blue'>I</p>
                        <p id='o' className='hiw-bigtext bg-size mr-10 px-10 py-10 bg-blue'>O</p>
                    </div>
                </div>
                <div className='hiw-text-container my-10'>
                    <p id='a' className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>A</p>
                    <p id='s' className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>S</p>
                    <p id='d' className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>D</p>
                    <p id='f' className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>F</p>
                    <p id='j' className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>J</p>
                    <p id='k' className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>K</p>
                    <p id='l' className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>L</p>
                    <p id=';' className='hiw-bigtext  bg-size mr-10 px-10 py-10 bg-blue'>:</p>
                </div>
            </div>
        </div>
    );
};

export default Keyboard;


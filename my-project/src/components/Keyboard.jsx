
import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import gsap from 'gsap';
import { keyMaps } from '../constants/KeyMaps';

const Keyboard = () => {
    const keyMap = keyMaps;
    const keyMap2 = [keyMap.key1, keyMap.key2, keyMap.key3, keyMap.key4, keyMap.key5, keyMap.key6, keyMap.key7, keyMap.key8];

    const synth = new Tone.PolySynth({
        volume: 2.999999999999996,
        detune: 1200,
        portamento: 0,
        oscillator: {
            partialCount: 0,
            partials: [],
            phase: 0,
            type: 'triangle'
        },
        envelope: {
            // attack: 0.4, // 음이 발생하는 시간
            // decay: 0.1, // 음이 사라지는 시간
            // sustain: 0.8, // 음이 지속되는 시간
            // release: 0.3 /// 음이 사라지는 시간
            attack: 0.032,
            attackCurve: "linear",
            decay: 0.1,
            decayCurve: "exponential",
            release: 1,
            releaseCurve: "exponential",
            sustain: 0.3
        },
        maxPolyphony: 30 // 동시에 연주할 수 있는 음의 개수

    }).toDestination(); // 여러 음을 동시에 연주할 수 있는 PolySynth 객체 생성

    const pressedTimeRef = useRef({}); // 키를 누르고 뗀 시간을 기록하는 객체
    const [keyLevel, setKeyLevel] = useState(4); // 톤을 조절하는 변수 (0~7)
    const [detuneLevel, setDetuneLevel] = useState(-1200); // 톤을 조절하는 변수 (0~7)

    const animateKeyPress = (element) => {
        gsap.to(element, { scale: 1.5, background: 'red' });
    };
    const animateKeyRelease = (element) => {
        if (!element) return;
        switch (element.id) {
            case 'w':
            case 'e':
            case 't':
            case 'i':
            case 'o': {
                gsap.to(element, { scale: 1, background: '#000' });
                break;
            }
            default:
                gsap.to(element, { scale: 1, background: '#fff' });
        }
    };

    const DetuneChange = (event) => {
        // 입력된 값을 숫자로 변환하여 상태를 업데이트합니다.
        // 'e'이거 입력되는거 방지 아주 ㅈ같은거 이거 때문에 2시간 날렸다.

        const value = Number(event.target.value); // 'e'가 입력되면 NaN이 반환됩니다.
        console.log('value', value);


        if (Number.isNaN(value)) return;  // 숫자가 아닌 경우 함수를 종료합니다.
        if (value === 0) return;      // 0인 경우 함수를 종료합니다.
        setDetuneLevel(parseInt(value));
    };

    useEffect(() => {
        // detuneLevel이 변경될 때마다 호출됩니다.
        if (!detuneLevel) {
            return;
        } else {
            synth.set({ detune: detuneLevel });
        }

    }, [synth, detuneLevel]);


    useEffect(() => {

        const plus = (e) => { // 톤을 올리는 함수
            const key = e.key.toLowerCase();
            if (key === 'r') {
                if (Object.values(pressedTimeRef.current).length === 0) {
                    setKeyLevel(prevCount => prevCount === 7 ? 7 : prevCount + 1);
                } else {
                    return false;
                }
            }

        };
        const subtract = (e) => {   // 톤을 내리는 함수
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
            console.log('key--------', key);
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
    }, [synth, keyLevel]);
    const hendle_Detune_Up = () => {
        setDetuneLevel(prevCount => prevCount + 100);
    };
    const hendle_Detune_Down = () => {
        setDetuneLevel(prevCount => prevCount - 100);
    };

    return (
        <div className='common-padding'>
            <div className='flex-col flex-center  '>
                <p className='hiw-text'>Press keys (A to :) to play sounds</p>
                <p className='hiw-text'>Press keys (Q or R) down or up</p>
            </div>
            <div className='w-full '>
                <div className='flex-center py-5 '>
                    <div id='plus' className='hiw-bigtext px-5 mx-5'>-</div>
                    <div id='count' className='hiw-bigtext px-5 mx-5'>{keyLevel}</div>
                    <div id='sub' className='hiw-bigtext px-5 mx-5'>+</div>
                </div>
                <div className='flex justify-end'>
                    <div className='hiw-text'>detune: </div>
                    <div className='text-black text-xl font-normal md:font-semibold bg-blue border-x-4 border-y-4 border-stone-800 w-20 flex items-center justify-end'
                        onChange={DetuneChange}
                    >{detuneLevel}</div>
                    <div>
                        <div id='detuneDown' className='hiw-text cursor-pointer flex-center' onClick={hendle_Detune_Up}>+</div>
                        <div id='detuneUp' className='hiw-text cursor-pointer flex-center' onClick={hendle_Detune_Down}>-</div>
                    </div>

                </div>
            </div>

            <div className='w-full  flex-center items-center justify-center'>
                <div className='flex relative'>
                    <p id='a' className='z-1 piano-white'>A</p>
                    <p id='s' className='z-1 piano-white'>S</p>
                    <p id='d' className='z-1 piano-white'>D</p>
                    <p id='f' className='z-1 piano-white'>F</p>
                    <p id='j' className='z-1 piano-white'>J</p>
                    <p id='k' className='z-1 piano-white'>K</p>
                    <p id='l' className='z-1 piano-white'>L</p>
                    <p id=';' className='z-1 piano-white'>:</p>
                    <p id='w' className='piano-black' style={{ marginLeft: '66px' }} >W</p>
                    <p id='e' className='piano-black' style={{ marginLeft: '166px' }}>E</p>
                    <p id='t' className='piano-black' style={{ marginLeft: '366px' }}>T</p>
                    <p id='i' className='piano-black ' style={{ marginLeft: '466px' }}>I</p>
                    <p id='o' className='piano-black ' style={{ marginLeft: '566px' }}>O</p>
                </div>
            </div>
        </div >
    );
};

export default Keyboard;


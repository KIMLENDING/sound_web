import React, { useState, useEffect, useRef } from "react";
import * as Tone from 'tone';

const Home = () => {
    // 버튼 클릭 여부를 추적하는 상태
    const [isPlaying, setIsPlaying] = useState(false);
    const analRef = useRef(null);
    const [analScale, setAnalScale] = useState(1); // 초기 스케일 값 설정

    useEffect(() => {
        // 소리를 출력하는 함수
        const playLoop = () => {
            // Tone.js를 사용해 소리를 출력
            const effect = new Tone.Reverb(3).toDestination()
            const effect2 = new Tone.FrequencyShifter(5).toDestination()

            var anal = new Tone.Analyser("waveform", 1024)
            // 음악 악기 정의
            const synth = new Tone.MembraneSynth().toDestination();
            const hat = new Tone.MetalSynth({
                envelope: {
                    attack: 0.03,
                    decay: 0.1,
                    release: 0.3
                }
            }).toDestination()

            const bass = new Tone.FMSynth({

                oscillator: { type: 'amsawtooth' },
                envelope: {
                    attack: 0.01,
                    decay: 0.1,
                    sustain: 0.8,
                    release: 0.3
                }
            }).toDestination()

            const melody = new Tone.MonoSynth().toDestination()
            melody.set({
                volume: -4,
                oscillator: { type: 'sawtooth' },    // 파형
                envelope: {         // 음표의 음색을 결정하는 속성
                    attack: 0.1,    // 공격시간
                    decay: 0.1,     // 감쇠시간
                    //sustain: 0.1,       // 지속시간
                    release: 0.1    // 릴리스시간
                }
            }).connect(effect).fan(anal)

            const high = new Tone.MetalSynth().toDestination()
            high.set({
                volume: -10,    // 음량
                frequency: 200,     // 주파수
                oscillator: { type: 'triangle' },
                envelope: {
                    attack: 0.03,
                    decay: 0.1,
                    release: 0.3
                }
            }).connect(effect2)
            const draw = () => {
                document.querySelector("#anal").style.transform =
                    'scale(' + (anal.getValue()[0] * 4) + ')';
                requestAnimationFrame(draw);
            }
            requestAnimationFrame(draw)


            // 음악 루프 정의
            const loop = new Tone.Loop((time) => {
                synth.triggerAttackRelease("C1", "8n", time)
                synth.triggerAttackRelease("C1", "8n", time + 0.5)
                synth.triggerAttackRelease("C1", "8n", time + 1)
                synth.triggerAttackRelease("C1", "8n", time + 1.5)
                hat.triggerAttackRelease("C1", "8n", time + 1.7)
                hat.triggerAttackRelease("C1", "8n", time + 1.8)
            }, 2);
            const loop2 = new Tone.Loop((time) => {
                bass.triggerAttackRelease("C1", "8n", time)
                bass.triggerAttackRelease("C2", "8n", time + 0.4)
                bass.triggerAttackRelease("C1", "8n", time + 0.8)
                bass.triggerAttackRelease("C2", "8n", time + 1.2)
                bass.triggerAttackRelease("C1", "8n", time + 1.6)

            }, 2);

            const loop3 = new Tone.Loop((time) => {
                // 멜로디를 재생합니다.
                let currentTime = time;
                const notes = ["C4", "D#4", "F4", "G4", "F4", "G4", "A#4", "A4", "G4", "A#4", "A4", "G4", "F4", "G4", "F4", "E4"];
                // 각 음표를 반복하여 연주합니다.
                for (let i = 0; i < notes.length; i++) {
                    const note = notes[i];
                    // 음표를 연주합니다.
                    melody.triggerAttackRelease(note, "8n", currentTime);
                    // 다음 음표의 시작 시간을 계산합니다.
                    const duration = Tone.Time("8n").toSeconds();
                    currentTime += duration;
                }
            }, 2);




            const loop4 = new Tone.Loop((time) => {
                // 멜로디를 재생합니다.
                let currentTime = time;
                const notes = ["C6", "D#6", "F6", "G6", "F6", "G6", "A#6", "A6", "G6", "A#6", "A6", "G6", "F6", "G6", "F6", "E6"];
                // 각 음표를 반복하여 연주합니다.
                for (let i = 0; i < notes.length; i++) {
                    const note = notes[i];
                    // 음표를 연주합니다.
                    high.triggerAttackRelease(note, "8n", currentTime);
                    // 다음 음표의 시작 시간을 계산합니다.
                    const duration = Tone.Time("16n").toSeconds();
                    currentTime += duration;
                }
            }, 2);



            // 루프 시작
            loop.start(0);
            loop2.start(0);
            loop3.start(0);
            loop4.start(0);
            // 루프 반복 설정
            loop.iterations = Infinity;
            loop2.iterations = Infinity;
            loop3.iterations = Infinity;
            loop4.iterations = Infinity;

            // Tone.Transport 시작
            Tone.Transport.start();
        };

        // 버튼 클릭 여부에 따라 루프 실행 또는 정지
        if (isPlaying) {
            playLoop();
        } else {
            Tone.Transport.stop();
        }

        // 컴포넌트가 언마운트되거나 상태가 변경될 때 트랜스포트 정지
        return () => {
            Tone.Transport.stop();
        }
    }, [isPlaying]);

    return (
        <section id="home" className="text-white">
            <div className="container mx-auto h-auto">
                <div className=" flex flex-col items-center justify-center my-20">
                    <h1 className="text-5xl font-bold mb-4">Welcome to My Music App</h1>
                    <p className="text-xl">Listen to your favorite music</p>
                </div>
                <div id="anal" className="flex items-center justify-center text-white my-40">
                    <h1 className="flex items-center justify-center text-5xl font-bold w-24 h-24 bg-white rounded-full " ref={analRef}>🎵</h1>
                </div>
                <div className="flex items-center justify-center my-20">
                    <button className=" bg-blue hover:bg-sky-300 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? "Stop" : "Play"}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Home;

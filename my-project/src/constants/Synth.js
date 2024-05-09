import * as Tone from 'tone';
export const synth = new Tone.PolySynth({
    oscillator: { type: 'amsawtooth' },
    envelope: {
        attack: 0.4, // 음이 발생하는 시간
        decay: 0.1, // 음이 사라지는 시간
        sustain: 0.8, // 음이 지속되는 시간
        release: 0.3 /// 음이 사라지는 시간
    },
    maxPolyphony: 30 // 동시에 연주할 수 있는 음의 개수

}).toDestination(); // 여러 음을 동시에 연주할 수 있는 PolySynth 객체 생성
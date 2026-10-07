// Web Audio API Synthesized Supercar Engine Sound
class EngineAudioController {
  constructor() {
    this.ctx = null;
    this.osc1 = null;
    this.osc2 = null;
    this.filter = null;
    this.gainNode = null;
    this.noiseGain = null;
    this.noiseNode = null;
    this.isPlaying = false;
    this.targetPitch = 55;
    this.currentPitch = 55;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    // Primary engine oscillator (V8 low-end roar)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime);

    // Sub oscillator for deep rumble
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(27.5, this.ctx.currentTime);

    // Filter for exhaust character
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(280, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    // Master gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);

    // Connect oscillators to filter then gain
    this.osc1.connect(this.filter);
    this.osc2.connect(this.filter);
    this.filter.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    this.osc1.start();
    this.osc2.start();
  }

  start() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.3);
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);
    }
  }

  updateVelocity(velocityKmh) {
    if (!this.isPlaying || !this.ctx || !this.gainNode) return;
    
    // Base idle pitch around 45Hz, redline up to 180Hz
    const normalized = Math.min(Math.max(velocityKmh / 320, 0), 1);
    const targetFreq = 45 + normalized * 135;
    const filterFreq = 220 + normalized * 1200;
    const targetVolume = 0.08 + normalized * 0.16;

    const time = this.ctx.currentTime + 0.05;
    this.osc1.frequency.setTargetAtTime(targetFreq, time, 0.06);
    this.osc2.frequency.setTargetAtTime(targetFreq * 0.5, time, 0.06);
    this.filter.frequency.setTargetAtTime(filterFreq, time, 0.06);
    this.gainNode.gain.setTargetAtTime(targetVolume, time, 0.06);
  }
}

export const engineAudio = new EngineAudioController();

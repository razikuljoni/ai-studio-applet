// Web Audio Engine for Substrata Record Label
// Generates realistic analog vinyl needle drop, delicate surface noise, warm harmonic sub-drones and filter sweeps

class VinylAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentReleaseId: string | null = null;

  // Nodes
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;

  private listeners: Set<(isPlaying: boolean, releaseId: string | null) => void> = new Set();

  public subscribe(cb: (isPlaying: boolean, releaseId: string | null) => void) {
    this.listeners.add(cb);
    cb(this.isPlaying, this.currentReleaseId);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying, this.currentReleaseId));
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Create subtle vinyl surface noise and dust crackles
  private createVinylNoise(ctx: AudioContext): AudioBuffer {
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink / brown filtered noise
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];

      // Occasional gentle microscopic vinyl pop / dust click
      if (Math.random() < 0.0004) {
        output[i] += (Math.random() * 2 - 1) * 0.45;
      }
    }
    return buffer;
  }

  public play(releaseId: string, spec: { baseFreq: number; subFreq: number; filterFreq: number; noiseLevel: number }) {
    try {
      this.initContext();
      if (!this.ctx) return;

      this.stop();

      const now = this.ctx.currentTime;

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, now);
      // Fade in smoothly like a needle dropping on velvet vinyl groove
      this.masterGain.gain.exponentialRampToValueAtTime(0.28, now + 1.2);
      this.masterGain.connect(this.ctx.destination);

      // Main Filter
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(spec.filterFreq, now);
      this.filter.Q.setValueAtTime(2.5, now);
      this.filter.connect(this.masterGain);

      // Low frequency modulation (gentle tape flutter / breathing)
      this.lfo = this.ctx.createOscillator();
      this.lfo.type = 'sine';
      this.lfo.frequency.setValueAtTime(0.18, now);

      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(60, now);
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filter.frequency);
      this.lfo.start();

      // Primary warm analog oscillator (warm triangle / sine blend)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'triangle';
      this.droneOsc1.frequency.setValueAtTime(spec.baseFreq, now);
      this.droneOsc1.connect(this.filter);
      this.droneOsc1.start();

      // Secondary slightly detuned harmonic for rich spatial depth
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(spec.baseFreq * 1.503, now); // perfect fifth + slight beating
      const osc2Gain = this.ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.35, now);
      this.droneOsc2.connect(osc2Gain);
      osc2Gain.connect(this.filter);
      this.droneOsc2.start();

      // Deep sub-bass somatic layer
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(spec.subFreq, now);
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.5, now);
      this.subOsc.connect(subGain);
      subGain.connect(this.masterGain);
      this.subOsc.start();

      // Vinyl groove noise layer
      const noiseBuffer = this.createVinylNoise(this.ctx);
      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      this.noiseGain = this.ctx.createGain();
      this.noiseGain.gain.setValueAtTime(spec.noiseLevel * 0.4, now);

      // Gentle high-shelf for vinyl warmth
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1400, now);
      noiseFilter.Q.setValueAtTime(0.8, now);

      this.noiseNode.connect(noiseFilter);
      noiseFilter.connect(this.noiseGain);
      this.noiseGain.connect(this.masterGain);
      this.noiseNode.start();

      this.isPlaying = true;
      this.currentReleaseId = releaseId;
      this.notify();
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public stop() {
    if (!this.isPlaying && !this.masterGain) return;

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      setTimeout(() => {
        try {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.subOsc?.stop();
          this.noiseNode?.stop();
          this.lfo?.stop();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.disconnect();
          this.subOsc?.disconnect();
          this.noiseNode?.disconnect();
          this.filter?.disconnect();
        } catch {
          // ignore
        }
      }, 550);
    }

    this.isPlaying = false;
    this.currentReleaseId = null;
    this.notify();
  }

  public toggle(releaseId: string, spec: { baseFreq: number; subFreq: number; filterFreq: number; noiseLevel: number }) {
    if (this.isPlaying && this.currentReleaseId === releaseId) {
      this.stop();
    } else {
      this.play(releaseId, spec);
    }
  }

  public getStatus() {
    return { isPlaying: this.isPlaying, currentReleaseId: this.currentReleaseId };
  }
}

export const audioEngine = typeof window !== 'undefined' ? new VinylAudioEngine() : (null as unknown as VinylAudioEngine);

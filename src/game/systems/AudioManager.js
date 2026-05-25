class AudioManager {
  constructor() {
    this.muted = false;
    this.context = null;
  }

  getContext() {
    if (!this.context && typeof window !== "undefined") {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = AudioContext ? new AudioContext() : null;
    }
    return this.context;
  }

  setMuted(value) {
    this.muted = value;
  }

  playTone({ frequency = 440, duration = 0.16, type = "sine", gain = 0.04 } = {}) {
    if (this.muted) return;
    const context = this.getContext();
    if (!context) return;

    const oscillator = context.createOscillator();
    const volume = context.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    volume.gain.value = gain;
    oscillator.connect(volume);
    volume.connect(context.destination);
    oscillator.start();
    volume.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
    oscillator.stop(context.currentTime + duration);
  }

  button() {
    this.playTone({ frequency: 620, duration: 0.08, type: "triangle" });
  }

  reward() {
    [523, 659, 784].forEach((frequency, index) => {
      window.setTimeout(() => this.playTone({ frequency, duration: 0.12, type: "triangle" }), index * 85);
    });
  }

  monster() {
    this.playTone({ frequency: 260, duration: 0.12, type: "sawtooth", gain: 0.025 });
  }
}

export const audioManager = new AudioManager();

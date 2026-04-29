// Web Audio API sound effects — no external files needed
export function playScoreReveal() {
  try {
    const ctx = new AudioContext();

    // Dramatic ascending chime
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);

    // Second harmonic for richness
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(600, ctx.currentTime + 0.05);
    osc2.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.2);

    gain2.gain.setValueAtTime(0.15, ctx.currentTime + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    osc2.start(ctx.currentTime + 0.05);
    osc2.stop(ctx.currentTime + 0.4);

    // Cleanup
    setTimeout(() => ctx.close(), 1000);
  } catch {
    // Silently fail if audio not available
  }
}

export function playHighScore() {
  try {
    const ctx = new AudioContext();
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6 — triumphant arpeggio

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.value = freq;

      const startTime = ctx.currentTime + i * 0.1;
      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });

    setTimeout(() => ctx.close(), 2000);
  } catch {
    // Silently fail
  }
}

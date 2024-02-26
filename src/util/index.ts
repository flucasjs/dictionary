export async function playAudioFile(audioUrl: string) {
  if (!audioUrl) return;

  const audioContext = new AudioContext();
  const audio = await fetch(audioUrl)
    .then(data => data.arrayBuffer())
    .then(arrayBufer => audioContext.decodeAudioData(arrayBufer));
  const audioSource = audioContext.createBufferSource();
  audioSource.buffer = audio;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.65;
  audioSource.connect(gainNode);

  gainNode.connect(audioContext.destination);
  audioSource.start(audioContext.currentTime);
}


export function pluralize(word: string, suffix: string, condition: boolean): string {
  return condition ? word + suffix : word;
}
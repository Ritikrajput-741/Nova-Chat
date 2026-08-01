import sendSound from "@/assets/sounds/mixkit-long-pop-2358.wav";
import receiveSound from "@/assets/sounds/mixkit-message-pop-alert-2354.mp3";

const sendAudio = new Audio(sendSound);
const receiveAudio = new Audio(receiveSound);

sendAudio.preload = "auto";
receiveAudio.preload = "auto";

export const playSendSound = () => {
  sendAudio.currentTime = 0;
  sendAudio.play().catch(() => {});
};

export const playReceiveSound = () => {
  receiveAudio.currentTime = 0;
  receiveAudio.play().catch(() => {});
};

import { SetRecorder } from '../../types/recorder';

export async function startRecording(setRecorderState: SetRecorder) {
  try {
    console.info('startRecording');
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    setRecorderState((prevState) => {
      return {
        ...prevState,
        initRecording: true,
        mediaStream: stream,
      };
    });
  } catch (err) {
    // permission denied
    if (err instanceof DOMException) {
      const errorMessage =
        "You have rejected the microphone and photo permission, and please follow 'Permission Granting Document' to manually grant permissions.";
      alert(errorMessage);
    }
    console.error(err);
  }
}

export const saveRecording = (recorder: any) => {
  console.info('saveRecording recorder.state:', recorder.state);
  try {
    if (recorder.state !== 'inactive') recorder.stop();
  } catch (err) {
    console.error(err);
  }
};

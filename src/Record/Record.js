import React, { useRef, useState } from "react";
import RecordRTC from "recordrtc";

const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [transcript, setTranscript] = useState("");

  const refRecorder = useRef();

  const startRecording = () => {
    setLoading(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        refRecorder.current = RecordRTC(stream, { type: "audio" });
        refRecorder.current.startRecording();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };
  // console.log(refRecorder.current);

  const stopRecording = () => {
    setLoading(false);
    if (refRecorder.current) {
      refRecorder.current.stopRecording(() => {
        const blob = refRecorder.current.getBlob();
        setRecordedBlob(blob);
        setIsRecording(false);
      });
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        Bắt đầu Ghi âm
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Dừng Ghi âm
      </button>
      {recordedBlob && (
        <audio controls src={URL.createObjectURL(recordedBlob)} />
      )}
      {loading && <p>recording...</p>}
      {/* <p>transcript: {transcript}</p> */}
    </div>
  );
};

export default Record;

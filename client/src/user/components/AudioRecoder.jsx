import AudioAnalyser from "react-audio-analyser";
import React from "react";

import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import StopIcon from "@material-ui/icons/Stop";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const Recorder = (props) => {
  const [status, setStatus] = React.useState("");
  const [audioSrc, setAudioSrc] = React.useState(null);
  const [duration, setDuration] = React.useState(0);
  const [placeholder, setPlaceholder] = React.useState("0");

  React.useEffect(() => {
    if (duration > 10) {
      console.log("Duration Exceeded");
    }
    if (Math.floor((duration % 60) / 10) > 0) {
      setPlaceholder("");
    } else {
      setPlaceholder("0");
    }
  }, [duration]);

  const controlAudio = (status) => {
    setStatus(status);
  };

  const classes = useStyles();
  const audioProps = {
    audioType: "audio/wav",
    // audioOptions: {sampleRate: 30000}, //
    status,
    audioSrc,
    timeslice: 1000, // timeslice（https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Parameters）
    startCallback: (e) => {
      console.log("succ start", e);
    },
    pauseCallback: (e) => {
      console.log("succ pause", e);
    },
    stopCallback: (e) => {
      setAudioSrc(window.URL.createObjectURL(e));
      props.setAudioBlob(window.URL.createObjectURL(e));
      console.log("Duration", duration);
      setDuration(0);
      console.log("succ stop", e);
    },
    onRecordCallback: (e) => {
      console.log("recording", e);
      setDuration(duration + 1);
    },
    errorCallback: (err) => {
      console.log("error", err);
    },
  };
  return (
    <div style={{ alignItems: "center", alignContent: "center" }}>
      <AudioAnalyser
        {...audioProps}
        width={
          window.innerWidth > 991
            ? window.innerWidth * 0.35
            : window.innerWidth * 0.75
        }
        backgroundColor="#FFFFFF"
        strokeColor="#000000"
      ></AudioAnalyser>
      <div className={classes.buttons}>
        {status !== "recording" && (
          <Button
            onClick={() => controlAudio("recording")}
            startIcon={<PlayArrowIcon />}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {duration === 0
              ? "START "
              : "RESUME " +
                Math.floor(duration / 60) +
                ":" +
                placeholder +
                (duration % 60)}
          </Button>
        )}
        {status === "recording" && (
          <Button
            onClick={() => controlAudio("paused")}
            startIcon={<PauseIcon />}
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            {"REC " +
              Math.floor(duration / 60) +
              ":" +
              placeholder +
              (duration % 60)}
          </Button>
        )}

        <Button
          onClick={() => controlAudio("inactive")}
          startIcon={<StopIcon />}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          STOP
        </Button>
      </div>
    </div>
  );
};

export default Recorder;

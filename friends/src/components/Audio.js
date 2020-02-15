import ReactAudioPlayer from "react-audio-player";
import React from "react";
import ThemeSong from "../funs/F.R.I.E.N.D.S - Opening Season 4.mp3";

const Audio = () => {
  return (
    <div>
      <ReactAudioPlayer src={ThemeSong} autoPlay controls />
    </div>
  );
};

export default Audio;

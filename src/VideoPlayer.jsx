import React, { useState, useRef } from "react";
import videoContent240p from "./assets/nature.mp4";
import videoContent480p from "./assets/nature(2).mp4";
import videoContent720p from "./assets/nature(3).mp4";
import videoContent1080p from "./assets/nature(4).mp4";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp, faVolumeMute, faStepForward, faStepBackward, faCog } from '@fortawesome/free-solid-svg-icons';

const VideoPlayer = () => {
    const videoRef = useRef(null); 
    const [isPlaying, setPlaying] = useState(false);
    const [isMuted, setMuted] = useState(false);
    const [selectedQuality, setSelectedQuality] = useState("720p");
    const [showDropdown, setShowDropdown] = useState(false);

    const videoSources = {
        '240p': videoContent240p,
        '480p': videoContent480p,
        '720p': videoContent720p,
        '1080p': videoContent1080p,
    };

    const playPauseHandler = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setPlaying(true);
        } else {
            videoRef.current.pause();
            setPlaying(false);
        }
    };

    const handleSeekForward = () => {
        videoRef.current.currentTime += 10;
    };

    const handleSeekBackward = () => {
        videoRef.current.currentTime -= 10;
    };

    const toggleMute = () => {
        setMuted(!isMuted);
        videoRef.current.volume = isMuted ? 1 : 0;
    };

    const volumeChangeHandler = (event) => {
        videoRef.current.volume = event.target.value / 100;
        setMuted(event.target.value === '0');
    };

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleQualityChange = (quality) => {
        const isCurrentlyPlaying = !videoRef.current.paused;
        const currentTime = videoRef.current.currentTime;

        setSelectedQuality(quality); 
        videoRef.current.pause(); 
        videoRef.current.src = videoSources[quality];
        videoRef.current.load();
        videoRef.current.onloadeddata = () => {
            videoRef.current.currentTime = currentTime;
            if (isCurrentlyPlaying) {
                videoRef.current.play();
                setPlaying(true);
            }
        };
        setShowDropdown(false); 
    };

    return (
        <Container className="my-4">
            <video ref={videoRef} className="mb-3" width="90%">
                <source src={videoSources[selectedQuality]} type="video/mp4" />
            </video>

            <div className="d-flex justify-content-center align-items-center">
                <Button
                    variant={isPlaying ? "secondary" : "success"}
                    className="mx-1"
                    onClick={playPauseHandler}>
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </Button>
                
                <Button
                    variant="info"
                    className="mx-1"
                    onClick={handleSeekBackward}>
                    <FontAwesomeIcon icon={faStepBackward} />
                </Button>

                <Button
                    variant="info"
                    className="mx-1"
                    onClick={handleSeekForward}>
                    <FontAwesomeIcon icon={faStepForward} />
                </Button>

                <Button
                    variant="primary"
                    className="mx-1"
                    onClick={toggleMute}>
                    <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
                </Button>

                <Form.Range
                    min="0"
                    max="100"
                    onChange={volumeChangeHandler}
                    className="mx-2"
                    style={{ width: "25%" }}
                />

                {/* Settings Button with Inline Styling */}
                <div style={{ position: "relative", display: "inline-block" }}>
                    <Button
                        onClick={toggleDropdown}
                        style={{
                            background: "none",
                            border: "none",
                            color: "black",
                            padding: 0,
                            margin: "0 10px",
                            cursor: "pointer",
                        }}
                    >
                        <FontAwesomeIcon icon={faCog} style={{ fontSize: "24px" }} />
                    </Button>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div
                            style={{
                                position: "absolute",
                                top: "40px",
                                left: "-20px",
                                backgroundColor: "#333",
                                color: "#fff",
                                padding: "5px 0",
                                borderRadius: "5px",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                                zIndex: 1,
                                fontSize: "14px",
                                textAlign: "center",
                            }}
                        >
                            {Object.keys(videoSources).map((quality) => (
                                <div
                                    key={quality}
                                    onClick={() => handleQualityChange(quality)}
                                    style={{
                                        padding: "8px 30px", // Slightly wider padding
                                        cursor: "pointer",
                                        backgroundColor:
                                            selectedQuality === quality ? "#444" : "transparent",
                                    }}
                                >
                                    {quality}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default VideoPlayer;

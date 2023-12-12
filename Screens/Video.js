import React from "react";
const Video=()=>{
    const [isPlaying, setIsPlaying] = React.useState(false);  
    const [isMuted, setIsMuted] = React.useState(false);  

    const togglePlaying = () => {};  

    return (  
        <View>  
            <Video
                  source={{ url: 'https://amplepoints.com/images/HowItWork.mp4'}}  
                paused={!isPlaying}  
                controls={true}  
                style={styles.backgroundVideo}  
                muted={isMuted}  
            />  
            <Button
                onPress={() => setIsPlaying(p => !p)}  
                title={isPlaying ? 'Stop' : 'Play'}  
            />  
            <Button
                onPress={() => setIsMuted(m => !m)}  
                title={isMuted ? 'Unmute' : 'Mute'}  
            />  
        </View> 
    )
}
export default Video;
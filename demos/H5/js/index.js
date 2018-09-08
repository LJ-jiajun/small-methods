var googleAudioOnOff = true;
var body = $("body");
var aud = $('#audio')[0];
var play = $('#play');

body.click(function(){
	audioAutoPlay();
	googleAudioOnOff = false;
});

play.click(audioPlay);

function audioAutoPlay(){
	if(googleAudioOnOff){
		aud = document.getElementById('audio');
    	aud.play();
	}
}

function audioPlay(){
    if(aud.paused){
        aud.play();
        //play.value="播放";
	}else{
        aud.pause();
       // play.value="暂停";
	}
}

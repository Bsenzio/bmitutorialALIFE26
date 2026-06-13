const bgm =
    document.getElementById("bgm");

const trackScroll =
    document.querySelector(".track-scroll");

const playBtn =
    document.getElementById("playTrack");

const tracks = [

    {
        name:"BCI Retro Theme",
        file:"assets/audio/bgm/track01.mp3"
    },

    {
        name:"Neural Dreams",
        file:"assets/audio/bgm/track02.mp3"
    },

    {
        name:"Artificial Life",
        file:"assets/audio/bgm/track03.mp3"
    },

    {
        name:"B-wave Runner",
        file:"assets/audio/bgm/track04.mp3"
    },

    {
        name:"Digital Ecology",
        file:"assets/audio/bgm/track05.mp3"
    }

];

let currentTrack = 0;

bgm.volume = 0.05;

function loadTrack(index){

    currentTrack = index;

    bgm.src = tracks[currentTrack].file;

    const title =
        " ★ " +
        tracks[currentTrack].name +
        " ★ ";

    document.getElementById("trackText1").textContent = title;
    document.getElementById("trackText2").textContent = title;
    document.getElementById("trackText3").textContent = title;
    document.getElementById("trackText4").textContent = title;
}

loadTrack(0);

bgm.addEventListener("play", () => {

    playBtn.textContent = "❚❚";

    trackScroll.classList.add(
        "playing"
    );

});

bgm.addEventListener("pause", () => {

    playBtn.textContent = "▶";

    trackScroll.classList.remove(
        "playing"
    );

});

playBtn.addEventListener("click", () => {

    if (bgm.paused){

        bgm.play();

    }else{

        bgm.pause();

    }

});

document
.getElementById("stopTrack")
.addEventListener("click", () => {

    bgm.pause();

    bgm.currentTime = 0;

});

document
.getElementById("nextTrack")
.addEventListener("click", () => {

    currentTrack =
        (currentTrack + 1)
        % tracks.length;

    loadTrack(currentTrack);

    bgm.play();

});

document
.getElementById("prevTrack")
.addEventListener("click", () => {

    currentTrack =
        (currentTrack - 1 + tracks.length)
        % tracks.length;

    loadTrack(currentTrack);

    bgm.play();

});

bgm.addEventListener("ended", () => {

    currentTrack =
        (currentTrack + 1)
        % tracks.length;

    loadTrack(currentTrack);

    bgm.play();

});

const sfxClick =
    document.getElementById("sfxClick");

const sfxHover =
    document.getElementById("sfxHover");

sfxClick.volume = 0.35;
sfxHover.volume = 0.15;

function playClick(){

    sfxClick.currentTime = 0;
    sfxClick.play();
}

function playHover(){

    sfxHover.currentTime = 0;
    sfxHover.play();
}

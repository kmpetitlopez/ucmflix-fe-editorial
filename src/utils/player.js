import shaka from 'shaka-player/dist/shaka-player.compiled.js'

export default {
    initPlayer(videoURl) {
        const video = document.getElementById('video'),
            player = new shaka.Player(video);

        window.player = player;
        player.load(videoURl); 
    }
}
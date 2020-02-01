document.addEventListener('DOMContentLoaded', () => {
	const source = 'https://live-t2.clipmyhorse.tv/live/smil:adaptive.smil/playlist.m3u8?Lf5jdJR5w1kKmOLmHjWqFIR89haQCa_-FvZSgi-JyLanLCcAg_v4KbNjyhQtQKSJ';
	const video = document.querySelector('video');
	
	// For more options see: https://github.com/sampotts/plyr/#options
	// captions.update is required for captions to work with hls.js
	const player = new Plyr(video, {autoplay: true, resetOnEnd: true, ratio: '16:9'});
	
	if (!Hls.isSupported()) {
		video.src = source;
	} else {
		// For more Hls.js options, see https://github.com/dailymotion/hls.js
		const hls = new Hls();
		hls.loadSource(source);
		hls.attachMedia(video);
		window.hls = hls;
		
		// Handle changing captions
		player.on('languagechange', () => {
			// Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
			setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
		});
	}
	
	// Expose player so it can be used from the console
	window.player = player;
});

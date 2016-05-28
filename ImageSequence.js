(function(global) {

function ImageSequence(options) {
	this.opts = _.clone(options || {});
	this.sequence = _.clone(this.opts.sequence || []);
	this.element = this.opts.element || document.createElement('div');
	this.folder = this.opts.folder || './';
	this.fileName = this.opts.fileName || '###';
	this.fileType = this.opts.fileType || 'png';
	this.fps = this.opts.fps || 30;
	this.onDraw = this.opts.onDraw || null;
	this.playing = false;
	this.loading = false;
	this.frame = 0;
	this.anim = null;
	this.holding = false;
	this.holdTo = -1;
	this.preloadElements = [];
	this.allFrames = [];
	this.preloadElements.total = 0;
	if(this.sequence.length > 0) {
		this.convertSequence();
		this.load();
	}
}

ImageSequence.prototype.convertSequence = function convertSequence() {
	var newSequence = this.sequence.map(section => {
				if(Array.isArray(section) || typeof section === 'number') {
					section = {
							frames: section
						};
				}
				if(!('hold' in section) || typeof section.hold !== 'number' ||
						section.hold == 0) {
					section.hold = false;
				}
				if(typeof section.frames === 'number') {
					section.frames = [ section.frames ];
				}
				else if(section.frames.length === 0) {
					return section;
				}
				else if(section.frames.length === 2) {
					section.frames = fillFrames(section.frames);
				}
				section.frames = section.frames.map(frame =>
						formFile(this, section, frame));
				section.frames = section.frames.map(frame =>
						({ url: frame, hold: false }));
				section.frames[section.frames.length-1].hold = section.hold;
				return section;
			});
	this.sequence = newSequence;
};

ImageSequence.prototype._imageLoaded = function _imageLoaded() {
	this.preloadElements.total += 1;
	if(this.preloadElements.total >= this.allFrames.length) {
		console.log('Done loading');
		this.play();
	}
};

ImageSequence.prototype.load = function load() {
	var allFrames = _.concat.apply(_, _.map(this.sequence, 'frames'));
	this.allFrames = allFrames;
	this.preloadElements.total = 0;
	allFrames.map(file => {
			var img = new Image();
			img.onload = this._imageLoaded.bind(this);
			img.src = file.url;
			this.preloadElements.push(img);
		});
};

ImageSequence.prototype.draw = function draw() {
	var now = Date.now();
	clearTimeout(this.anim);
	if(this.holding) {
		if(this.holdTo > now) {
			this.anim = setTimeout(this.draw.bind(this), this.holdTo - now);
			return false;
		}
		else {
			this.holdOff();
		}
	}
	var frame = this.allFrames[this.frame%this.allFrames.length];
	if(frame.hold) {
		this.hold(frame.hold);
	}
	this.element.style.backgroundImage = `url(${frame.url})`;
	this.frame++;
	this.anim = setTimeout(this.draw.bind(this), 1000/this.fps);
	if(this.onDraw) {
		this.onDraw(this, frame);
	}
};

ImageSequence.prototype.play = function play(frameOffset) {
	this.playing = true;
	if(frameOffset !== undefined) {
		this.frame = frameOffset;
	}
	clearTimeout(this.anim);
	this.draw();
};

ImageSequence.prototype.pause = function pause() {
	clearTimeout(this.anim);
	this.playing = false;
};

ImageSequence.prototype.hold = function hold(time) {
	this.holding = true;
	if(time === undefined) {
		time = 0;
	}
	else if(typeof time !== 'number') {
		time = +time;
	}
	if(_.isNaN(time)) {
		time = 0;
	}
	this.holdTo = Date.now() + time;
};

ImageSequence.prototype.holdOff = function holdOff() {
	this.holding = false;
};

global.ImageSequence = ImageSequence;

})(window);

var sequence = new ImageSequence({
		element: document.getElementById('display'), // The "#display" element
		fps: 30, // 30 frames a second maximum but not gartunteed
		folder: '../images/RotatingCube/', // A folder path, relative or otherwise
		fileName: 'frame####', // The names of the file where "#" is a number (padded left with 0's)
		fileType: 'png', // The file extension of the images: (folder/file. -->png<--)
		sequence: [
				[ 0, 29 ], // A basic list of frames without any holds
				[ 28, 1 ],
				[ 0, 15 ],
				[ 14, 4 ],
				[ 5, 23 ],
				[ 22, 1 ],
				// This creates a 126 frame sequence like this:
				/*
					|
					V
			   ..., 0,  1,  2, ...,
	    .., 27, 28, 29, 28, 27, ..,
	   ..., 2,  1,  0,  1,  2, ...,
	    .., 13, 14, 15, 14, 13, ..,
	   ..., 6,  5,  4,  5,  6, ...,
	    .., 21, 22, 23, 22, 21, ..,
	   ..., 3,  2,  1, ...
					^
					|
				*/
			],
		onDraw: (sequence, frame) => { // Called on every frame
				// sequence is the sequence object
				// frame is the current frame object
			}
	});

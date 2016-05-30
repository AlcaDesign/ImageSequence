# ImageSequence

## Example

Full examples are available in the "examples" folder. Run `npm install` first because ImageSequence requires lodash right now.

[Here is the "basic" example on jdfiddle.](https://jsfiddle.net/q0jwnvcn/)

```javascript

// Mostly defaults:

new ImageSequence({
		sequence: [ // Empty by default
				{
						frames: [ 0 ],
						hold: false
					},
				[ 0 ] // Shorthand for the previous object
			],
		element: document.getElementById('display'),
		folder: './',
		fileName: '###',
		fileType: 'png',
		fps: 30,
		onDraw: null
	});

```



## API

### Instance Options

A object containing some of the following:

#### sequence `array`

The sequence array.

#### element `DOM Instance`

The DOM element to change the background of.

#### folder `string`

The folder for all frames.

#### fileName `string`

The file name pattern for all frames.

#### fileType `string`

The file type for all frames.

#### fps `number`

The FPS for all frames.

#### onDraw `function`

A function that gets called when a frame is "drawn" to the DOM element.



### Properties

#### .opts `object`

The originally passed options object.

#### .sequence `array`

The sequence array.

#### .element `DOM instance`

The DOM element to change the background of.

#### .folder `string`

The folder for all frames.

#### .fileName `string`

The file name pattern for all frames.

#### .fileType `string`

The file type for all frames.

#### .fps `number`

The FPS for all frames.

#### .onDraw `function` or `null`

A function that gets called when a frame is "drawn" to the DOM element.

#### .playing `boolean`

`true` if currently playing which includes while holding.

#### .loading `boolean`

`true` if the sequence images are being loaded.

#### .frame `number`

The current frame number. (Needs to be moduloed by `.allFrames.length`)

#### .anim `number` or `null`

The current timeout id.

#### .holding `boolean`

`true` if the animation is currently holding on a frame.

#### .holdTo `number`

Timestamp that the animation is holding to.

#### .preloadElements `array`

The `Image` instances for all the frames.

#### .preloadElements.total `number`

The total number of frames that have loaded

#### .allFrames `array`

An array containing all of the full formatted frames.



### Instance Methods

#### .draw()

"Draw" the next frame of the animation. Loops to the next frame when `playing` is true.

#### .play([`int` frameOffset])

Starts the draw loop and lets it continue. `frameOffset` can be used to set the frame that needs to be drawn. (Good for restarting the animation or jumping ahead)

#### .pause()

Pause the animation until `play` is called again.

#### .hold(`number` time)

Hold on a frame until `time` milliseconds has passed.

#### .holdOff()

Stop holding the animation. (Does not automatically `start` the animation back up)

#### .load()

Load the sequence frames.

#### .convertSequence()

Convert the input sequence to a fully formatted version.

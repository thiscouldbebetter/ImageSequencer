
class Run
{
	constructor
	(
		animation,
		canvasCelSource,
		canvasToRenderTo
	)
	{
		this.animation = animation;
		this.canvasCelSource = canvasCelSource;
		this.canvasToRenderTo = canvasToRenderTo;

		var animationSize = this.animation.sizeInPixels;
		this.canvasToRenderTo.width = animationSize.x;
		this.canvasToRenderTo.height = animationSize.y;

		this.framesSoFar = 0;
	}

	frameAdvance()
	{
		this.framesSoFar++;
	}

	frameCurrentAsCel()
	{
		var animation = this.animation;

		var timingsActive = animation.timings.filter
		(
			x => x.isActiveAtFrameIndex(this.framesSoFar)
		);

		var celsToCombine = [];

		for (var t = 0; t < timingsActive.length; t++)
		{
			var timing = timingsActive[t];
			var sequence =
				animation.sequenceById(timing.sequenceId);
			var framesIntoSequenceSoFar =
				this.framesSoFar - timing.startTimeInFrames;
			var sequenceDurationTotal =
				sequence.durationInFrames();
			if (framesIntoSequenceSoFar >= sequenceDurationTotal)
			{
				framesIntoSequenceSoFar =
					framesIntoSequenceSoFar % sequence.durationInFrames();
			}
			var groupIdAndCelId =
				sequence.groupIdAndCelIdAtFrame(framesIntoSequenceSoFar);
			var groupId = groupIdAndCelId[0];
			var celId = groupIdAndCelId[1];
			var celGroup = animation.celGroupById(groupId);
			var cel = celGroup.celById(celId);
			celsToCombine.push(cel);
		}

		var celCombined = Cel.fromCels(celsToCombine);

		return celCombined;
	}

	start()
	{
		this.graphicsToRenderTo =
			this.canvasToRenderTo.getContext("2d");

		if (this.canvasCelSource == null)
		{
			this.graphicsToRenderTo.fillText
			(
				"Error: No cel source.", 0, 10
			);
		}
		else
		{
			this.sequenceIndexCurrent = 0;
			this.celIndexCurrent = 0;

			var millisecondsPerCel =
				Math.round(1000 / this.animation.framesPerSecond);

			this.timer = setInterval
			(
				this.timer_Ticked.bind(this),
				millisecondsPerCel
			);
		}
	}

	timer_Ticked()
	{
		var animationSize = this.animation.sizeInPixels;

		this.graphicsToRenderTo.clearRect
		(
			0, 0, animationSize.x, animationSize.y
		);

		var frameCurrent = this.frameCurrentAsCel();
		var layers = frameCurrent.layers;

		for (var i = 0; i < layers.length; i++)
		{
			var layer = layers[i];

			this.timer_Ticked_DrawLayer(layer);
		}

		this.frameAdvance();
	}

	timer_Ticked_DrawLayer(layer)
	{
		var layerBounds = layer.boundsWithinSourceImage;
		var layerPos = layerBounds.pos;
		var layerSize = layerBounds.size;
		var layerOffsetToDrawAt =
			layer.offsetToDrawAt || Coords.Instances().Zeroes;

		this.graphicsToRenderTo.drawImage
		(
			this.canvasCelSource,
			layerPos.x, layerPos.y, // sourceOffset
			layerSize.x, layerSize.y, // sourceSize
			layerOffsetToDrawAt.x, layerOffsetToDrawAt.y, // destinationOffset
			layerSize.x, layerSize.y // destinationSize
		);
	}
}


class TimingSpacing
{
	constructor
	(
		startTimeInFrames,
		sequenceId,
		durationOfIterationInFrames,
		offsetToDrawAt,
		timesToIterate
	)
	{
		this.startTimeInFrames = startTimeInFrames;
		this.sequenceId = sequenceId;
		this.durationOfIterationInFrames = durationOfIterationInFrames;
		this.offsetToDrawAt = offsetToDrawAt;
		this.timesToIterate = timesToIterate;
	}

	static fromStartTimeAndSequenceId
	(
		startTimeInFrames, sequenceId
	)
	{
		return new TimingSpacing
		(
			startTimeInFrames, sequenceId,
			null, null, null
		)
	}

	static manyFromSequencesSequential
	(
		sequencesToRunInSequence
	)
	{
		var returnValues = [];
		var framesSoFar = 0;
		for (var i = 0; i < sequencesToRunInSequence.length; i++)
		{
			var sequence = sequencesToRunInSequence[i];

			var timingSpacing = new TimingSpacing
			(
				framesSoFar, sequence.id, sequence.durationInFrames(), null, 1 // timesToIterate
			);
			returnValues.push(timingSpacing);

			var sequenceDuration = sequence.durationInFrames();
			framesSoFar += sequenceDuration;
		}

		return returnValues;
	}

	durationOfAllIterationsInFrames()
	{
		var returnValue =
		(
			(
				this.durationOfIterationInFrames == null
				|| this.timesToIterate == null
			)
			? null
			: this.timesToIterate * this.durationOfIterationInFrames
		);

		return returnValue;
	}

	endTimeInFrames()
	{
		var durationOfAllIterations =
			this.durationOfAllIterationsInFrames();

		var returnValue =
		(
			durationOfAllIterations == null
			? null
			: this.startTimeInFrames + durationOfAllIterations
		);

		return returnValue;
	}

	isActiveAtFrameIndex(frameIndex)
	{
		var endTimeInFrames = this.endTimeInFrames();
		var returnValue =
		(
			this.startTimeInFrames <= frameIndex
			&&
			(
				endTimeInFrames == null 
				|| endTimeInFrames >= frameIndex
			)
		);
		return returnValue;
	}

	// String.

	static fromString(timingSpacingAsString)
	{
		var isDurationSpecified =
			timingSpacingAsString.indexOf("+") > 0;

		var isOffsetSpecified =
			timingSpacingAsString.indexOf("@") > 0;

		var istimesToIterateSpecified =
			timingSpacingAsString.indexOf("*") > 0;

		var offsetEndDelimiter =
		(
			istimesToIterateSpecified ? "*": " "
		);

		var durationEndDelimiter = 
		(
			isOffsetSpecified ? "@" : offsetEndDelimiter
		);

		var sequenceIdEndDelimiter =
		(
			isDurationSpecified ? "+" : durationEndDelimiter
		);

		var startTimeInFrames = parseInt
		(
			timingSpacingAsString.split(":")[0]
		);

		var sequenceId = timingSpacingAsString.split
		(
			":"
		)[1].split(sequenceIdEndDelimiter)[0].trim();

		if (isDurationSpecified)
		{
			var durationOfIterationInFrames = parseInt
			(
				timingSpacingAsString.split("+")[1].split
				(
					durationEndDelimiter
				)[0].trim()
			);
		}

		var offsetToDrawAt =
		(
			isOffsetSpecified
			? Coords.fromString
			(
				timingSpacingAsString.split("@")[1].split
				(
					offsetEndDelimiter
				)[0].trim()
			)
			: null
		);

		var timesToIterate =
		(
			istimesToIterateSpecified
			? parseInt
			(
				timingSpacingAsString.split("*")[1].trim()
			)
			: null
		);

		return new TimingSpacing
		(
			startTimeInFrames,
			sequenceId,
			durationOfIterationInFrames,
			offsetToDrawAt,
			timesToIterate
		);
	}

	toString()
	{
		var returnValue =
			this.startTimeInFrames
			+ ":" + this.sequenceId;

		if (this.durationOfIterationInFrames != null)
		{
			returnValue += " + " + this.durationOfIterationInFrames;
		}

		if (this.offsetToDrawAt != null)
		{
			returnValue += " @ " + this.offsetToDrawAt.toString();
		}

		if (this.timesToIterate != null)
		{
			returnValue += " * " + this.timesToIterate
		}

		return returnValue;
	}
}

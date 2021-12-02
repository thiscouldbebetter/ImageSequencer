
class Sequence
{
	constructor(id, celIdsWithDurations)
	{
		this.id = id;
		this.celIdsWithDurations = celIdsWithDurations;
	}

	celIdAtFrame(frameIndex)
	{
		var celIdToReturn;

		var framesSoFar = 0;
		for (var i = 0; i < this.celIdsWithDurations.length; i++)
		{
			var celIdWithDuration = this.celIdsWithDurations[i];

			celIdToReturn = celIdWithDuration.celId;

			framesSoFar += celIdWithDuration.durationInFrames;

			if (framesSoFar >= frameIndex)
			{
				break;
			}
		}

		return celIdToReturn;
	}

	durationInFrames()
	{
		if (this._durationInFrames == null)
		{
			var durationInFramesSoFar = 0;
			this.celIdsWithDurations.forEach
			(
				x => durationInFramesSoFar += x.durationInFrames
			);
			this._durationInFrames = durationInFramesSoFar;
		}
		return this._durationInFrames;
	}

	// String.

	static fromString(sequenceAsString)
	{
		var parts = sequenceAsString.split(":").map(x => x.trim());
		var id = parts[0];
		var celIdsWithDurationsAsStrings =
			parts[1].split(',').map(x => x.trim());
		var celIdsWithDurations =
			celIdsWithDurationsAsStrings.map
			(
				x => CelIdWithDuration.fromString(x)
			);

		var returnSequence = new Sequence
		(
			id, celIdsWithDurations
		);

		return returnSequence;
	}

	toString()
	{
		var returnValue =
			this.id + ": "
			+ this.celIdsWithDurations.map
			(
				x => x.toString()
			).join(", ");

		return returnValue;
	}
}

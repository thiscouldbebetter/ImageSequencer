
class Sequence
{
	constructor(id, celIdsWithDurations)
	{
		this.id = id;
		this.celIdsWithDurations = celIdsWithDurations;
	}

	groupIdAndCelIdAtFrame(frameIndex)
	{
		var groupIdToReturn;
		var celIdToReturn;

		var framesSoFar = 0;
		for (var i = 0; i < this.celIdsWithDurations.length; i++)
		{
			var celIdWithDuration = this.celIdsWithDurations[i];

			groupIdToReturn = celIdWithDuration.groupId;
			celIdToReturn = celIdWithDuration.celId;

			framesSoFar += celIdWithDuration.durationInFrames;

			if (framesSoFar >= frameIndex)
			{
				break;
			}
		}

		return [ groupIdToReturn, celIdToReturn];
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
		var parts = sequenceAsString.split("\n").map(x => x.trim());
		var id = parts[0].split(":").join("");

		var celIdsWithDurationsAsStrings = parts.slice(1);

		var celIdsWithDurations = celIdsWithDurationsAsStrings.map
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
		var cellIdsWithDurationsAsStrings =
			this.celIdsWithDurations.map(x => x.toString());

		var cellIdsWithDurationsAsString =
			cellIdsWithDurationsAsStrings.join("\n\t");

		var returnValue =
			this.id + ":\n\t" + cellIdsWithDurationsAsString;

		return returnValue;
	}
}


class CelIdWithDuration
{
	constructor(groupId, celId, durationInFrames)
	{
		this.groupId = groupId;
		this.celId = celId;
		this.durationInFrames = durationInFrames;
	}

	static fromGroupId(groupId)
	{
		return new CelIdWithDuration
		(
			groupId, 0, 1 // durationInFrames
		);
	}

	static fromGroupIdAndCelId(groupId, celId)
	{
		return new CelIdWithDuration
		(
			groupId, celId, 1 // durationInFrames
		);
	}

	// Strings.

	static fromString(celIdWithDurationAsString)
	{
		var parts = celIdWithDurationAsString.split(" ").map(x => x.trim());

		var groupId = parts[0];
		var atSign = parts[1];
		if (atSign != "@")
		{
			throw new Error("Invalid format!");
		}
		var celId = parts[2];

		var hasDuration = (parts[3] == "*");

		var durationInFrames =
		(
			hasDuration ? parseInt(parts[4]) : 1
		);

		var returnValue = new CelIdWithDuration(groupId, celId, durationInFrames);

		return returnValue;
	}

	toString()
	{
		var returnValue = this.groupId + " @ " + this.celId;

		if (this.durationInFrames != 1)
		{
			returnValue += " * " + this.durationInFrames;
		}

		return returnValue;
	}
}


class CelIdWithDuration
{
	constructor(celId, durationInFrames)
	{
		this.celId = celId;
		this.durationInFrames = durationInFrames;
	}

	static fromCelId(celId)
	{
		return new CelIdWithDuration
		(
			celId, 1 // durationInFrames
		);
	}

	// Strings.

	static fromString(celIdWithDurationAsString)
	{
		var parts = celIdWithDurationAsString.split("*").map(x => x.trim());

		var celId = parts[0];

		var hasDuration = (parts.length > 1);

		var durationInFrames =
		(
			hasDuration ? parseInt(parts[1]) : 1
		);

		return new CelIdWithDuration(celId, durationInFrames);
	}

	toString()
	{
		var returnValue = this.celId;

		if (this.durationInFrames != 1)
		{
			returnValue += "*" + this.durationInFrames;
		}

		return returnValue;
	}
}

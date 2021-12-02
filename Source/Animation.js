
class Animation
{
	constructor
	(
		name,
		framesPerSecond,
		celSourceId,
		sizeInPixels,
		cels,
		sequences,
		timings
	)
	{
		this.name = name;
		this.framesPerSecond = framesPerSecond;
		this.celSourceId = celSourceId;
		this.sizeInPixels = sizeInPixels;
		this.cels = cels;
		this.sequences = sequences;
		this.timings = timings;
	}

	static empty()
	{
		var returnValue = new Animation
		(
			"Untitled",
			25, // framesPerSecond
			"[unspecified]", // celSourceId,
			new Coords(64, 64), // sizeInPixels
			[], // cels
			[], // sequences
			[] // timings
		);

		return returnValue;
	}

	celById(celId)
	{
		if (this._celsById == null)
		{
			this._celsById =
				new Map(this.cels.map(x => [x.id, x]) );
		}

		return this._celsById.get(celId);
	}

	sequenceById(sequenceId)
	{
		if (this._sequencesById == null)
		{
			this._sequencesById =
				new Map(this.sequences.map(x => [x.id, x]) );
		}

		return this._sequencesById.get(sequenceId);
	}

	// String.

	static fromString(groupAsString)
	{
		var parts = groupAsString.split("\n\n");
		return new Animation
		(
			parts[0].split("Name: ")[1],

			parseFloat(parts[1].split("FramesPerSecond: ")[1]),

			parts[2].split("CelSource: ")[1],

			Coords.fromString
			(
				parts[3].split("Size:")[1]
			),

			parts[4].split("\n    +").join(" +").split("\n").slice(1).map
			(
				x => Cel.fromString(x)
			),

			parts[5].split("\n").slice(1).map
			(
				x => Sequence.fromString(x)
			),

			parts[6].split("\n").slice(1).map
			(
				x => TimingSpacing.fromString(x)
			)
		);
	}

	toString()
	{
		var returnValue =
		[
			"Name: " + this.name, 
			"FramesPerSecond: " + this.framesPerSecond,
			"CelSource: " + this.celSourceId,
			"Size: " + this.sizeInPixels.toString(),
			"Cels:\n" + this.cels.map(x => x.toString()).join("\n").split(" + ").join("\n    + "),
			"Sequences:\n" + this.sequences.map(x => x.toString()).join("\n"),
			"Timings:\n" + this.timings.map(x => x.toString()).join("\n")
		].join("\n\n");

		return returnValue;
	}
}


class Animation
{
	constructor
	(
		name,
		framesPerSecond,
		sizeInPixels,
		celSourceId,
		celGroups,
		sequences,
		timings
	)
	{
		this.name = name;
		this.framesPerSecond = framesPerSecond;
		this.celSourceId = celSourceId;
		this.sizeInPixels = sizeInPixels;
		this.celGroups = celGroups;
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
			[], // celGroups
			[], // sequences
			[] // timings
		);

		return returnValue;
	}

	celGroupById(groupId)
	{
		if (this._celGroupsById == null)
		{
			this._celGroupsById =
				new Map(this.celGroups.map(x => [x.id, x]) );
		}

		return this._celGroupsById.get(groupId);
	}

	cels()
	{
		if (this._cels == null)
		{
			this._cels = [];
			this.celGroups.forEach
			(
				x => this._cels.push(...x.cels() )
			)
		}
		return this._cels;
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

		var name = parts[0].split("Name: ")[1];

		var framesPerSecond =
			parseFloat(parts[1].split("FramesPerSecond: ")[1]);

		var size = Coords.fromString
		(
			parts[2].split("Size: ")[1]
		);

		var celSource = parts[3].split("CelSource: ")[1];

		var celGroups = CelGroup.manyFromString(parts[4]);

		var sequencesAsStrings =
			parts[5].split("\n\t").join(", ").split("\n").slice(1).map
			(
				x => x.split(", ").join("\n\t")
			);

		var sequences = sequencesAsStrings.map
		(
			x => Sequence.fromString(x)
		);

		var timingSpacings = parts[6].split("\n").slice(1).map
		(
			x => TimingSpacing.fromString(x)
		);

		var returnAnimation = new Animation
		(
			name,
			framesPerSecond,
			size,
			celSource,
			celGroups,
			sequences,
			timingSpacings
		);

		return returnAnimation;
	}

	toString()
	{
		var returnValue =
		[
			"Name: " + this.name, 
			"FramesPerSecond: " + this.framesPerSecond,
			"Size: " + this.sizeInPixels.toString(),
			"CelSource: " + this.celSourceId,
			"Cels:\n" + CelGroup.manyToString(this.celGroups),
			"Sequences:\n" + this.sequences.map(x => x.toString()).join("\n"),
			"Timings:\n" + this.timings.map(x => x.toString()).join("\n")
		].join("\n\n");

		return returnValue;
	}
}

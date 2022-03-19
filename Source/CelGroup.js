
class CelGroup
{
	constructor(id)
	{
		this.id = id;
	}

	static fromCel(cel)
	{
		var returnValue = new CelGroupActual
		(
			cel.id,
			[ cel ]
		);

		return returnValue;
	}

	celById(celId)
	{
		if (this._celsById == null)
		{
			var cels = this.cels;
			this._celsById = new Map
			(
				cels.map(x => [x.id, x])
			);
		}

		return this._celsById.get(celId);
	}

	cels()
	{
		throw new Error("Method .cels() must be implemented in subclass!");
	}

	// String.

	static fromString(cellGroupAsString)
	{
		var returnValue =
			CelGroupVirtual.fromString(cellGroupAsString);

		return returnValue;
	}

	static manyFromString(celGroupsAsStrings)
	{
		var celGroupsAsStrings = celGroupsAsStrings.split
		(
			"\n    + "
		).join
		(
			" + "
		).split
		(
			"\n"
		).slice(1);

		var celGroups = celGroupsAsStrings.map
		(
			x => CelGroup.fromString(x)
		);

		return celGroups;
	}

	static manyToString(celGroups)
	{
		return celGroups.map(x => x.toString()).join("\n")
	}

	toString()
	{
		throw new Error("Method .toString() must be implemented in subclass!");
	}
}

class CelGroupActual extends CelGroup
{
	constructor(id, cel)
	{
		super(id);
		this.cel = cel;
		this._cels = [ this.cel ];
	}

	cels()
	{
		return this._cels;
	}

	static fromString(celGroupAsString)
	{
		var cel = Cel.fromString(celGroupAsString);
		return new CelGroupActual(cel);
	}

	toString()
	{
		var returnValue =
			this.id
			+ ": "
			+ this.cel.toString();

		return returnValue;
	}
}

class CelGroupVirtual extends CelGroup
{
	constructor(id, cels)
	{
		super(id);
		this.cels = cels;
		for (var i = 0; i < this.cels.length; i++)
		{
			var cel = this.cels[i];
			if (cel.id == null)
			{
				cel.id = "" + i;
			}
		}
	}

	static fromString(celGroupAsString)
	{
		var parts = celGroupAsString.split("*").map(x => x.trim());
		var hasMultipleCels = (parts.length > 1);

		var id = parts[0].split(":")[0].trim();

		var cels = null;

		if (hasMultipleCels)
		{
			var coordsAsString = parts[1].split(":")[0].trim();
			var dimensionsAsStrings = coordsAsString.split(",");
			var x = parseFloat(dimensionsAsStrings[0]);
			var y = parseFloat(dimensionsAsStrings[1]);
			if (isNaN(y))
			{
				y = 1;
			}
			var sizeInCels = new Coords(x, y);

			var celFirstAsString =
				celGroupAsString.split(":")[1].trim();
			var celFirst = Cel.fromString(celFirstAsString);
			var celFirstBounds = celFirst.bounds();
			var celFirstOffset = celFirst.offsetToDrawAt();

			cels = this.celSequenceCreate(celFirstBounds, sizeInCels);
		}
		else
		{
			var celsAsString = celGroupAsString.split(":")[1];
			var celsAsStrings =
				celsAsString.split("\n\t").join(" ").split("\n");

			cels = celsAsStrings.map
			(
				celAsString => Cel.fromString(celAsString)
			);
		}

		var returnGroup = new CelGroupVirtual(id, cels);

		return returnGroup;
	}

	celCount()
	{
		return this.cels.length;
	}

	celSequenceCreate(celFirstBounds, sizeInCels)
	{
		var returnCels = [];

		var celFirstPos = celFirstBounds.pos;
		var celSizeInPixels = celFirstBounds.size;
		var celOffsetInCels = new Coords();
		var celPosInPixels = new Coords();

		for (var y = 0; y < this.sizeInCels.y; y++)
		{
			celOffsetInCels.y = y;

			for (var x = 0; x < this.sizeInCels.x; x++)
			{
				celOffsetInCels.x = x;

				celPosInPixels.overwriteWith
				(
					celOffsetInCels
				).multiply
				(
					celSizeInPixels
				).add
				(
					celFirstPos
				);

				var celId = "" + this._cels.length;

				var celLayer = new CelLayer
				(
					new Rectangle
					(
						celSizeInPixels, celPosInPixels.clone()
					),
					null // offsetToDrawAt
				);

				var cel = new Cel(celId, [ celLayer ] );

				cels.push(cel);
			}
		}

		return cels;
	}

	toString()
	{
		var celsAsStrings = this.cels.map(x => x.toString());
		var celsAsString = celsAsStrings.join("\n    + ");
		var returnValue = this.id + ": " + celsAsString;
		return returnValue;
	}

}
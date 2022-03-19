
class Cel
{
	constructor(id, layers)
	{
		this.id = id;
		this.layers = layers;
	}

	static fromCels(celsToCombine)
	{
		var celIdsCombined = "";
		var layersCombined = [];

		celsToCombine.forEach
		(
			cel =>
			{
				celIdsCombined += cel.id;
				layersCombined.push(...cel.layers);
			}
		)

		var returnCel = new Cel
		(
			celIdsCombined, layersCombined
		);

		return returnCel;
	}

	static fromIdSizeAndPos(id, size, pos)
	{
		return new Cel
		(
			id,
			[ CelLayer.fromBoundsAsSizeAndPos(size, pos) ]
		);
	}

	bounds()
	{
		return this.layers[0].boundsWithinSourceImage;
	}

	offsetToDrawAt()
	{
		return this.layers[0].offsetToDrawAt;
	}

	sourcePos()
	{
		return this.layers[0].sourcePos();
	}

	toGroup()
	{
		return CelGroup.fromCel(this);
	}

	// String.

	static fromString(celAsString)
	{
		var celId = null;

		var layersAsString = celAsString;
		var layersAsStrings = layersAsString.split("+");
		var layers = layersAsStrings.map
		(
			x => CelLayer.fromString(x.trim())
		);

		return new Cel(celId, layers);
	}

	static manyFromString(celsAsString)
	{
		var returnValues = celsAsString.split
		(
			"\n\t+"
		).join(" +").split("\n").slice(1).map
		(
			x => Cel.fromString(x)
		);

		return returnValues;
	}

	static manyToString(cels)
	{
		var celsAsStrings = [];
		var celPrev = null;

		for (var i = 0; i < cels.length; i++)
		{
			var cel = cels[i];

			var celAsString =
				cel.id + ": "
				+ cel.layers.map(x => x.toString()).join(" + ");

			celsAsStrings.push(celAsString);

			celPrev = cel;
		}

		var returnValue =
			celsAsStrings.join("\n").split(" + ").join("\n    + ")

		return returnValue;
	}

	toString()
	{
		var returnValue =
			this.layers.map(x => x.toString()).join("\n    + ");

		return returnValue;
	}
}

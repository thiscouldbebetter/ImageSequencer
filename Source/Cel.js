
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

		return new Cel(celIdsCombined, layersCombined);
	}

	static fromIdSizeAndPos(id, size, pos)
	{
		return new Cel
		(
			id,
			[ CelLayer.fromBoundsAsSizeAndPos(size, pos) ]
		);
	}

	// String.

	static fromString(celAsString)
	{
		var parts = celAsString.split(":");
		var celId = parts[0];
		var layersAsString = parts[1];
		var layersAsStrings = layersAsString.split("+");
		var layers = layersAsStrings.map
		(
			x => CelLayer.fromString(x.trim())
		);

		return new Cel(celId, layers);
	}

	toString()
	{
		var returnValue =
			this.id + ": "
			+ this.layers.map(x => x.toString()).join(" + ");

		return returnValue;
	}
}

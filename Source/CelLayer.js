
class CelLayer
{
	constructor
	(
		boundsWithinSourceImage, offsetToDrawAt
	)
	{
		this.boundsWithinSourceImage = boundsWithinSourceImage;
		this.offsetToDrawAt = offsetToDrawAt;
	}

	static fromBounds(boundsWithinSourceImage)
	{
		return new CelLayer(boundsWithinSourceImage, null);
	}

	static fromBoundsAsSizeAndPos(size, pos)
	{
		return CelLayer.fromBounds(new Rectangle(size, pos) );
	}

	// String.

	static fromString(layerAsString)
	{
		var parts = layerAsString.split(">");

		var bounds = Rectangle.fromString(parts[0]);

		var hasOffset = (parts.length > 1);

		var offsetToDrawAt =
		(
			hasOffset
			? Coords.fromString(parts[1])
			: null
		);

		return new CelLayer
		(
			bounds, offsetToDrawAt
		);
	}

	toString()
	{
		var returnValue =
			this.boundsWithinSourceImage.toString()

		if (this.offsetToDrawAt != null)
		{
			returnValue +=
				" > " + this.offsetToDrawAt.toString();
		}

		return returnValue;
	}
}

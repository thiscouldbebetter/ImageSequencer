
class Rectangle
{
	constructor(size, pos)
	{
		this.size = size;
		this.pos = pos;
	}

	// String.

	static fromString(rectangleAsString)
	{
		var parts =
			rectangleAsString.split
			(
				"@"
			).map
			(
				x => x.trim()
			);

		var size = Coords.fromString(parts[0]);
		var pos = Coords.fromString(parts[1]);

		return new Rectangle(size, pos);
	}

	toString()
	{
		var returnValue =
			this.size.toString()
			+ " @ " + this.pos.toString();

		return returnValue;
	}
}

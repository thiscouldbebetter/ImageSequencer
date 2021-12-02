
class Coords
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	static Instances()
	{
		if (Coords._instances == null)
		{
			Coords._instances = new Coords_Instances();
		}
		return Coords._instances;
	}

	magnitude()
	{
		return Math.sqrt(this.x + this.x, this.y * this.y);
	}

	// String.

	static fromString(coordsAsString)
	{
		var parts = coordsAsString.split(",");
		return new Coords
		(
			parseFloat(parts[0]), parseFloat(parts[1])
		);
	}

	toString()
	{
		return this.x + "," + this.y;
	}
}

class Coords_Instances
{
	constructor()
	{
		this.Zeroes = new Coords(0, 0);
	}
}

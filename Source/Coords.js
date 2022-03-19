
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

	add(other)
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	clone()
	{
		return new Coords(this.x, this.y);
	}

	equals(other)
	{
		return (this.x == other.x && this.y == other.y);
	}

	magnitude()
	{
		return Math.sqrt(this.x + this.x, this.y * this.y);
	}

	multiply(other)
	{
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}

	overwriteWith(other)
	{
		this.x = other.x;
		this.y = other.y;
		return this;
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
		this.Ones = new Coords(1, 1);
		this.Zeroes = new Coords(0, 0);
	}
}

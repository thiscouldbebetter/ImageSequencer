
class AnimationDemos
{
	static byName(demoName)
	{
		var returnValue;

		if (demoName == "Car")
		{
			returnValue = this.car();
		}
		else if (demoName == "Face")
		{
			returnValue = this.face();
		}
		else
		{
			returnValue = Animation.empty();
		}

		return returnValue;
	}

	static car()
	{
		var celSize = new Coords(64, 48);

		var celCount = 8;
		var celPos = new Coords(0, 0);

		var celGroupId = "Car";
		var cels = [];
		
		for (var i = 0; i < celCount; i++)
		{
			var cel = Cel.fromIdSizeAndPos(0, celSize, celPos.clone());
			cels.push(cel);

			celPos.x += celSize.x;
		}

		var celGroup = new CelGroupVirtual
		(
			celGroupId, cels
		);

		var celGroups = [ celGroup ];

		var sequences =
		[
			new Sequence
			(
				"A",
				"0,1,2,3,4,5,6,7".split(",").map
				(
					x => CelIdWithDuration.fromGroupIdAndCelId(celGroupId, x)
				)
			),
			new Sequence
			(
				"B",
				"7,6,5,4,3,2,1,0".split(",").map
				(
					x => CelIdWithDuration.fromGroupIdAndCelId(celGroupId, x)
				)
			)
		];

		var timings = TimingSpacing.manyFromSequencesSequential
		(
			sequences
		);

		var returnValue = new Animation
		(
			"Car",
			25, // framesPerSecond
			celSize, // sizeInPixels
			"Car.png", // celSourceId,
			celGroups,
			sequences,
			timings
		);

		return returnValue;
	}

	static face()
	{
		var cels =
		[
			new Cel
			(
				"Head_Facing_Right",
				[
					// head
					CelLayer.fromBoundsAsSizeAndPos
					(
						new Coords(63, 63), new Coords(0, 0)
					),

					// ear
					new CelLayer
					(
						new Rectangle
						(
							new Coords(15, 24), // size
							new Coords(64, 0) // pos
						),
						new Coords(8, 24) // offsetToDrawAt
					),

					// nose
					new CelLayer
					(
						new Rectangle
						(
							new Coords(15, 20), // size
							new Coords(64, 32) // pos
						),
						new Coords(40, 26) // offsetToDrawAt
					)
				]
			),

			new Cel
			(
				"Eyes_Facing_Right_Open",
				[
					// right eyeball
					new CelLayer
					(
						new Rectangle
						(
							new Coords(24, 22), // size
							new Coords(196, 40) // pos
						),
						new Coords(42, 12) // offset
					),

					// left eyeball
					new CelLayer
					(
						new Rectangle
						(
							new Coords(24, 22), // size
							new Coords(196, 40) // pos
						),
						new Coords(28, 12) // offset
					),

					// right pupil
					new CelLayer
					(
						new Rectangle
						(
							new Coords(10, 10), // size
							new Coords(64, 48) // pos
						),
						new Coords(50, 16) // offset
					),

					// left pupil
					new CelLayer
					(
						new Rectangle
						(
							new Coords(10, 10), // size
							new Coords(64, 48) // pos
						),
						new Coords(36, 16) // offset
					)
				]
			),

			new Cel
			(
				"Eyes_Facing_Right_Closed",
				[
					// right eyelids
					new CelLayer
					(
						new Rectangle
						(
							new Coords(24, 20), // size
							new Coords(196, 0) // pos
						),
						new Coords(28, 14) // offset
					),

					// left eyelids
					new CelLayer
					(
						new Rectangle
						(
							new Coords(24, 20), // size
							new Coords(196, 20) // pos
						),
						new Coords(44, 14) // offset
					)
				]
			),

			new Cel
			(
				"Eyebrows_Facing_Right",
				[
					// right eyebrow
					new CelLayer
					(
						new Rectangle
						(
							new Coords(31, 10), // size
							new Coords(160, 16) // pos
						),
						new Coords(40, 8) // offset
					),

					// left eyebrow
					new CelLayer
					(
						new Rectangle
						(
							new Coords(31, 10), // size
							new Coords(128, 16) // pos
						),
						new Coords(20, 8) // offset
					)
				]
			),

			new Cel
			(
				"Eyebrows_Facing_Right_Lowered",
				[
					// right eyebrow
					new CelLayer
					(
						new Rectangle
						(
							new Coords(31, 16), // size
							new Coords(160, 24) // pos
						),
						new Coords(40, 8) // offset
					),

					// left eyebrow
					new CelLayer
					(
						new Rectangle
						(
							new Coords(31, 16), // size
							new Coords(128, 24) // pos
						),
						new Coords(20, 8) // offset
					)
				]
			),

			new Cel
			(
				"Eyebrows_Facing_Right_Raised",
				[
					// right eyebrow
					new CelLayer
					(
						new Rectangle
						(
							new Coords(31, 16), // size
							new Coords(160, 1) // pos
						),
						new Coords(40, 2) // offset
					),

					// left eyebrow
					new CelLayer
					(
						new Rectangle
						(
							new Coords(31, 16), // size
							new Coords(128, 1) // pos
						),
						new Coords(20, 2) // offset
					)
				]
			),

			new Cel
			(
				"Mouth_Facing_Right_Closed",
				[
					new CelLayer
					(
						new Rectangle
						(
							new Coords(31, 16), // size
							new Coords(224, 32) // pos
						),
						new Coords(24, 40) // offset
					)
				]
			),

			new Cel
			(
				"Mouth_Facing_Right_Open",
				[
					new CelLayer
					(
						new Rectangle
						(
							new Coords(31, 31), // size
							new Coords(96, 0) // pos
						),
						new Coords(24, 40) // offset
					)
				]
			)
		];

		var celGroups = cels.map(x => x.toGroup());

		var sequences =
		[
			new Sequence
			(
				"Head_Still",
				[
					CelIdWithDuration.fromGroupId("Head_Facing_Right")
				]
			),
			new Sequence
			(
				"Eyebrows_Shifting",
				[
					new CelIdWithDuration("Eyebrows_Facing_Right", 0, 48),
					new CelIdWithDuration("Eyebrows_Facing_Right_Raised", 0, 24),
					new CelIdWithDuration("Eyebrows_Facing_Right", 0, 24),
					new CelIdWithDuration("Eyebrows_Facing_Right_Lowered", 0, 24)
				]
			),
			new Sequence
			(
				"Eyes_Blinking",
				[
					new CelIdWithDuration("Eyes_Facing_Right_Open", 0, 68),
					new CelIdWithDuration("Eyes_Facing_Right_Closed", 0, 4)
				]
			),
			new Sequence
			(
				"Mouth_Talking",
				[
					new CelIdWithDuration("Mouth_Facing_Right_Closed", 0, 3),
					new CelIdWithDuration("Mouth_Facing_Right_Open", 0, 3),
				]
			)
		];

		var timings = 
		[
			new TimingSpacing
			(
				0, "Head_Still", null, null, null
			),
			new TimingSpacing
			(
				0, "Eyes_Blinking", null, null, null
			),
			new TimingSpacing
			(
				0, "Eyebrows_Shifting", null, null, null
			),
			new TimingSpacing
			(
				0, "Mouth_Talking", null, null, null
			)
		];

		var returnValue = new Animation
		(
			"Face",
			25, // framesPerSecond
			new Coords(64, 64), // sizeInPixels
			"FaceParts.png", // celSourceId,
			celGroups,
			sequences,
			timings
		);

		return returnValue;
	}
}

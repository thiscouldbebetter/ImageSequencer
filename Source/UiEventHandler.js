
class UiEventHandler
{
	static selectDemo_Changed(selectDemo)
	{
		var d = document;
		var textareaAnimation = d.getElementById("textareaAnimation");

		var demoName = selectDemo.value;

		var animation = AnimationDemos.byName(demoName);

		var animationAsString = 
		(
			animation == null
			? ""
			: animation.toString()
		);

		textareaAnimation.value =
			animationAsString;
	}

	static buttonRun_Clicked()
	{
		var d = document;

		var textareaAnimation =
			d.getElementById("textareaAnimation");
		var animationAsString =
			textareaAnimation.value;

		try
		{
			var animation =
				Animation.fromString(animationAsString);
		}
		catch (err)
		{
			alert("Invalid animation definition!");
			return;
		}

		var divImageUploaded =
			d.getElementById("divImageUploaded")
		var canvasCelSource =
			divImageUploaded.getElementsByTagName("canvas")[0];

		if (canvasCelSource == null)
		{
			alert("No cel source uploaded!");
			return;
		}

		var canvasAnimated = d.createElement("canvas");

		var divAnimated = d.getElementById("divAnimated");
		divAnimated.innerHTML = "";
		divAnimated.appendChild(canvasAnimated);

		var animationRun = new Run
		(
			animation, canvasCelSource, canvasAnimated
		);
		animationRun.start();
	}

	static inputFileCelSource_Changed(inputFile)
	{
		var d = document;

		var file = inputFile.files[0];
		if (file == null)
		{
			alert("No file specified!");
		}
		else
		{
			var fileReader = new FileReader(file);
			fileReader.onload = (fileEvent) =>
			{
				var imageAsDataUrl = fileEvent.target.result;
				var imageAsImgElement = d.createElement("img");
				imageAsImgElement.onload = (imgElementEvent) =>
				{
					var canvas = d.createElement("canvas");
					canvas.width = imageAsImgElement.width;
					canvas.height = imageAsImgElement.height;

					var graphics = canvas.getContext("2d");
					graphics.drawImage(imageAsImgElement, 0, 0);

					var divImageUploaded =
						d.getElementById("divImageUploaded");
					divImageUploaded.innerHTML = "";
					divImageUploaded.appendChild(canvas);
				}
				imageAsImgElement.src = imageAsDataUrl;
			};
			fileReader.readAsDataURL(file);
		}
	}
}

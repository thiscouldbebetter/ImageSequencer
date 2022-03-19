
class UiEventHandler
{
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

		var celSourceId = animation.celSourceId;
		var selectCelSource = d.getElementById("selectCelSource");
		var options = selectCelSource.options;
		var celSourceUploaded = null;
		for (var i = 0; i < options.length; i++)
		{
			var option = options[i];
			if (option.celSource.id == celSourceId)
			{
				celSourceUploaded = option.celSource;
				break;
			}
		}

		if (celSourceUploaded == null)
		{
			alert("Specified cel source not uploaded!");
			return;
		}

		var canvasAnimated = d.createElement("canvas");

		var divAnimated = d.getElementById("divAnimated");
		divAnimated.innerHTML = "";
		divAnimated.appendChild(canvasAnimated);

		var animationRun = new Run
		(
			animation, celSourceUploaded.canvas, canvasAnimated
		);
		animationRun.start();
	}

	static checkboxCelSourceImageShow_Changed(checkboxCelSourceImageShow)
	{
		var d = document;

		var shouldShowImage =
			checkboxCelSourceImageShow.checked;

		var divImageUploaded =
			d.getElementById("divCelSourceImage");
		divImageUploaded.innerHTML = "";

		if (shouldShowImage)
		{
			var selectCelSource =
				d.getElementById("selectCelSource");
			var celSourceOptionSelected =
				selectCelSource.selectedOptions[0];
			var celSourceSelected =
				celSourceOptionSelected.celSource;
			var canvas = celSourceSelected.canvas;

			divImageUploaded.appendChild(canvas);
			divImageUploaded.style.display = "inline";
		}
		else
		{
			divImageUploaded.style.display = "none";
		}
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

					var celSource = new CelSource(file.name, canvas);
					var selectCelSource =
						d.getElementById("selectCelSource");
					var celSourceAsOption = d.createElement("option");
					celSourceAsOption.innerHTML = celSource.id;
					celSourceAsOption.celSource = celSource;
					selectCelSource.appendChild(celSourceAsOption);
				}
				imageAsImgElement.src = imageAsDataUrl;
			};
			fileReader.readAsDataURL(file);
		}
	}

	static selectCelSource_Changed(selectCelSource)
	{
		var d = document;
		var checkboxCelSourceImageShow =
			d.getElementById("checkboxCelSourceImageShow");
		this.checkboxCelSourceImageShow_Changed
		(
			checkboxCelSourceImageShow
		);
	}

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
}

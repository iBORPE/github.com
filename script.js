function NormalizeData() {
	for (var i = 0; i < data.length; ++i) {
		var request = data[i];
		data.sort(function (a, b) {
			if (a.id < b.id) {
				return -1
			}
			if (a.id > b.id) {
				return 1
			}
			return 0


		});
		NormalizeRequest(request);
	}
}

function NormalizeRequest(request) {
	request.id = NormalizeID(request.id);
	request.parent_id = NormalizeID(request.parent_id);
}

function NormalizeID(id) {
	var NormalizedID = parseInt(id);

	if (isNaN(NormalizedID)) {
		return null;
	}

	return NormalizedID;
}

function AddChilds(ParentRequest) {
	var parent_id = GetParentID(ParentRequest);
	var childs = [];
	for (var i = 0; i < data.length; ++i) {
		var request = data[i];
		if (request.parent_id === parent_id) {
			childs.push(request);
		}
	}

	childs.forEach(function (child) {

		AddChilds(child)
	});




	function GetParentID(request) {
		try {
			return request.id
		} catch (exc) {
			return null;
		}
	}



	if (ParentRequest) {
		ParentRequest.childs = childs;
	} else {
		return childs;
	}

}



function main() {
	NormalizeData();
	var PreparedData = AddChilds();
	var SortedData = [];
	var TempIndex = -1;
	for (i = 0; i < PreparedData.length; i++) {
		TempIndex++
		SortedData[TempIndex] = PreparedData[i];
		if (PreparedData[i].childs.length > 0) {
			for (j = 0; j < PreparedData[i].childs.length; j++) {
				TempIndex++
				SortedData[TempIndex] = PreparedData[i].childs[j];
				if (PreparedData[i].childs[j].childs.length > 0) {
					for (m = 0; m < PreparedData[i].childs[j].childs.length; m++) {
						TempIndex++
						SortedData[TempIndex] = PreparedData[i].childs[j].childs[m];

					}
				}


			}
		}
	}
	console.table(SortedData)
	return SortedData
}




var data = main();

var DaySum = new Array(data.length);
var EndDay = new Array(data.length);
var StartDay = new Array(data.length);

for (i = 0; i < data.length; i++) {
	var EndTime = Date.parse(data[i].end_time)
	EndTime = EndTime / 86400000;
	var StartTime = Date.parse(data[i].start_time)
	StartTime = StartTime / 86400000;
	DaySum[i] = EndTime - StartTime;
	DaySum[i] = DaySum[i] + 1;
	StartDay[i] = Date.parse(data[i].start_time) - Date.parse(data[0].start_time);
	StartDay[i] = StartDay[i] / 86400000;

	EndDay[i] = StartDay[i] + DaySum[i];

}
var ChildNumber = new Array(data.length);

for (var j = 0; j < data.length; j++) {
	var ChildSum = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].parent_id === data[j].id) {

			ChildSum = ChildSum + 1;


		}

	}
	ChildNumber[j] = ChildSum;
	for (k = 0; k < data[j].childs.length; k++) {
		if (data[j].childs.length > 0 && data[j].childs[k].childs.length) {
			ChildNumber[j] = ChildNumber[j] + data[j].childs[k].childs.length;
		}

	}




}

function TimeLineBG() {

	for (i = 1; i <= 25; i++) {
		var LeftBand = document.createElement('div');

		LeftBand.style.height = "100vh";
		LeftBand.style.width = "3.84%";
		LeftBand.style.backgroundColor = "rgb(40, 40, 40)";
		LeftBand.style.float = "left";
		LeftBand.style.fontSize = "10px";
		LeftBand.style.textAlign = "center"
		LeftBand.style.color = "white";
		LeftBand.innerHTML = " 2019-05-" + i;

		document.body.appendChild(LeftBand);
		i++
		var RightBand = document.createElement('div');
		RightBand.style.height = "100vh";
		RightBand.style.width = "3.85%";
		RightBand.style.backgroundColor = "rgb(50, 50, 50)";
		RightBand.style.float = "left";
		RightBand.style.fontSize = "10px";
		RightBand.style.textAlign = "center"
		RightBand.style.color = "white";
		RightBand.innerHTML = "2019-05-" + i;

		document.body.appendChild(RightBand);
	}
	for (i = 0; i < data.length; i++) {
		var TimeLinerequest1 = document.createElement('div');
		TimeLinerequest1.innerHTML = data[i].name;
		TimeLinerequest1.style.textAlign = "center"
		TimeLinerequest1.style.border = "0px solid black"
		TimeLinerequest1.style.boxShadow = "0px 0px 25px rgb(50, 50, 50, 50)"
		if (ChildNumber[i] > 0) {
			TimeLinerequest1.style.height = 50 * (ChildNumber[i] + 1) + "px";
		} else {
			TimeLinerequest1.style.height = 40 + "px";
		}
		TimeLinerequest1.style.width = DaySum[i] * 3.85 + "%";
		TimeLinerequest1.style.backgroundColor = "rgb( 0, 0, 255, 50%)";
		TimeLinerequest1.style.position = "absolute";


		TimeLinerequest1.style.top = 50 * (i + 1) + "px";



		TimeLinerequest1.style.left = StartDay[i] * 3.85 + "%"
		TimeLinerequest1.style.color = "white"
		TimeLinerequest1.style.fontFamily = "Corbel"
		TimeLinerequest1.style.overflow = "hidden"


		document.body.appendChild(TimeLinerequest1);
	}
}
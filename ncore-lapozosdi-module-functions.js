var f_collectTorrentBoxes = function() {

	var boxes1 = document.getElementsByClassName('box_nagy');
	var boxes2 = document.getElementsByClassName('box_nagy2');

	var boxes = [];

	for (var i = 0; i < boxes2.length; i++) {
		if (boxes2[i] != null)
			boxes.push(boxes2[i]);
		if (boxes1[i] != null)
			boxes.push(boxes1[i]);
	}
	
	return boxes;
}

var f_changeBackgrounColor = function(prev, current) {
	prev.style.backgroundColor = v_originalBackgroundColor;
	
	v_originalBackgroundColor = current.style.backgroundColor;
	current.style.backgroundColor = v_highlightedBackgroundColor;
}

var f_stepTorrent = function(down) {
	
	if (down) {
		if (v_currentBoxIndex == v_boxes.length - 1) {
			v_currentBoxIndex = 0;
		} else {
			v_currentBoxIndex++;
		}
	} else {
		if (v_currentBoxIndex == 0) {
			v_currentBoxIndex = v_boxes.length - 1;
		} else {
			v_currentBoxIndex--;
		}
	}
	
	var previousBox = v_currentBox;
	v_currentBox = v_boxes[v_currentBoxIndex];
	
	f_changeBackgrounColor(previousBox, v_currentBox);
	
	if (v_detailsIsOpen) {
		f_openDetailsHelper(previousBox);
		f_openDetailsHelper(v_currentBox);
	}
}

var f_openDetails = function () {
	f_openDetailsHelper(v_currentBox);
	v_detailsIsOpen = !v_detailsIsOpen;
}

var f_openDetailsHelper = function(cBox) {
	var torrentTxtClassEntity = cBox.getElementsByClassName('torrent_txt')[0];
	if (torrentTxtClassEntity == null) {
		torrentTxtClassEntity = cBox.getElementsByClassName('torrent_txt2')[0];
	}
	torrentTxtClassEntity.children[0].click();
}

var f_keypress_step = function(e) {
	if (e.keyCode == 106) { // 106 - j - down:true
		f_stepTorrent(true);
	} else if (e.keyCode == 107) { // 107 - k - down:false
		f_stepTorrent(false);
	} else if (e.keyCode == 120) { // 120 - x - openDetails
		f_openDetails();
	} else if (e.keyCode == 108) { // 108 - l - 
		
	} else {
		console.log(e.keyCode);
	}
}

var f_keypress = function (e) {
	if (e.target.tagName != "INPUT") {
		f_keypress_step(e);		
	}
}
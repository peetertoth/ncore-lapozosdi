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
			// v_currentBoxIndex = 0;
			f_setCookie(COOKIE_KEY_LAPOZAS, 0);
			f_simulateKeyPress(39);
		} else {
			v_currentBoxIndex++;
		}
	} else {
		if (v_currentBoxIndex == 0) {
			// v_currentBoxIndex = v_boxes.length - 1;
			f_setCookie(COOKIE_KEY_LAPOZAS, new Date().getTime());
			f_simulateKeyPress(37);
		} else {
			v_currentBoxIndex--;
		}
	}
	
	var previousBox = v_currentBox;
	v_currentBox = v_boxes[v_currentBoxIndex];
	
	f_boxSelectionChanged(previousBox);
}

var f_boxSelectionChanged = function(previousBox) {
	f_changeBackgrounColor(previousBox, v_currentBox);
	
	if (v_detailsIsOpen) {
		f_openDetailsHelper(previousBox);
		f_openDetailsHelper(v_currentBox);
		f_scrollTo(v_currentBox);
	}
	
	if (v_infobarIsOpen) {
		f_openInfobarHelper(previousBox);
		f_openInfobarHelper(v_currentBox);
	}
	
	f_scrollToIfNotVisible(v_currentBox);
}

var f_stepTorrentToBottom = function() {
	var previousBox = v_currentBox;
	v_currentBoxIndex = v_boxes.length - 1
	v_currentBox = v_boxes[v_currentBoxIndex];
	
	f_boxSelectionChanged(previousBox);
}

var f_stepTorrentToTop = function() {
	var previousBox = v_currentBox;
	v_currentBoxIndex = 0;
	v_currentBox = v_boxes[v_currentBoxIndex];
	
	f_boxSelectionChanged(previousBox);
}

var f_scrollTo = function(cBox) {
	cBox.scrollIntoView();
}

var f_scrollToIfNotVisible = function(cBox) {
	cBox.scrollIntoViewIfNeeded();
}

var f_openDetails = function () {
	f_openDetailsHelper(v_currentBox);
	v_detailsIsOpen = !v_detailsIsOpen;
	
	if (v_detailsIsOpen) {
		f_scrollTo(v_currentBox);
	}
}

var f_openDetailsHelper = function(cBox) {
	var torrentTxtClassEntity = cBox.getElementsByClassName('torrent_txt')[0];
	if (torrentTxtClassEntity == null) {
		torrentTxtClassEntity = cBox.getElementsByClassName('torrent_txt2')[0];
	}
	torrentTxtClassEntity.children[0].click();
}

var f_openInfobar = function() {
	f_openInfobarHelper(v_currentBox);
}

var f_openInfobarHelper = function(cBox) {
	var infobar = cBox.getElementsByClassName('infobar')[0];
	if (infobar == null) {
		return;
	}
	
	if(v_infobarIsOpen) {
		infobar.children[0].onmouseout();
	} else {
		infobar.children[0].onmouseover();
	}
	v_infobarIsOpen = !v_infobarIsOpen;
}

var f_keypress_step = function(e) {
	if (e.keyCode == 106) { // 106 - j - down:true
		f_stepTorrent(true);
	} else if (e.keyCode == 74) { // 74 - J - bottom
		f_stepTorrentToBottom();
	} else if (e.keyCode == 107) { // 107 - k - down:false
		f_stepTorrent(false);
	} else if (e.keyCode == 75) { // 75 - K - top
		f_stepTorrentToTop();
	} else if (e.keyCode == 120) { // 120 - x - openDetails
		f_openDetails();
	} else if (e.keyCode == 108) { // 108 - l - 
		
	} else if (e.keyCode == 99) { // 99 - c - openInfobar
		f_openInfobar();
	} else {
		console.log(e.keyCode);
	}
}

var f_keypress = function (e) {
	if (e.target.tagName != "INPUT") {
		f_keypress_step(e);		
	}
}
	
var f_setCookie = function(key, value) {
	document.cookie = key + "=" + value;
}

var f_getCookie = function(key) {
	var cKey = " " + key + "=";
	
	if (document.cookie.lastIndexOf(cKey) == -1) {
		return null;
	} else {	
		return document.cookie.split(cKey)[1].split(";")[0];
	}
}

// 37 / left
// 39 / right
var f_simulateKeyPress = function(keyCode)
{
    if(document.createEventObject) {
        var eventObj = document.createEventObject();
        eventObj.keyCode = keyCode;
        document.fireEvent("onkeydown", eventObj);
        eventObj.keyCode = keyCode;   
    } else if(document.createEvent) {
        var eventObj = document.createEvent("Events");
        eventObj.initEvent("keydown", true, true);
        eventObj.which = keyCode; 
        eventObj.keyCode = keyCode;
        document.dispatchEvent(eventObj);
    }
} 
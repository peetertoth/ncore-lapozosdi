// ==UserScript==
// @name         Ncore lapozósdi
// @namespace    peetft.ddns.net
// @version      0.36
// @description  Ncore kiegészítő
// @author       peeter.toth@gmail.com
// @match        https://ncore.cc/torrents.php*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/peetertoth/ncore-lapozosdi/master/ncore-lapozosdi.user.js
// @downloadURL  https://raw.githubusercontent.com/peetertoth/ncore-lapozosdi/master/ncore-lapozosdi.user.js
// @require      https://raw.githubusercontent.com/peetertoth/ncore-lapozosdi/master/ncore-lapozosdi-module-functions.js
// ==/UserScript==

	var COOKIE_KEY_LAPOZAS = "lapozas";
	var COOKIE_KEY_DETAILS_LAPOZAS = "details-lapozas";
	var COOKIE_KEY_INFOBAR_LAPOZAS = "infobar-lapozas";

	// Main

	var v_boxes = f_collectTorrentBoxes();
	var v_details = f_collectTorrentDetails();
	
	var v_currentBoxIndex = 0;
	var v_detailsIsOpen = false;
	var v_infobarIsOpen = false;
	
	// Check paging backwards
	var v_lastPaging = f_getCookie(COOKIE_KEY_LAPOZAS);
	var v_currentTimeInMillis = new Date().getTime();
	if (v_lastPaging != null && v_currentTimeInMillis - v_lastPaging < 2000) {
		v_currentBoxIndex = v_boxes.length - 1;
		f_setCookie(COOKIE_KEY_LAPOZAS, 0);
	}
	
	
	var v_currentBox = v_boxes[v_currentBoxIndex];
	var v_originalBackgroundColor = v_currentBox.style.backgroundColor;
	var v_highlightedBackgroundColor = '#aaaa99';
	f_boxSelectionChanged(v_currentBox);

	v_currentBox.style.backgroundColor = v_highlightedBackgroundColor;
	f_scrollToIfNotVisible(v_currentBox);
	
	
	// Check details and infobar were open
	var v_isDetailsOpen = f_getCookie(COOKIE_KEY_DETAILS_LAPOZAS);
	var v_isInfobarOpen = f_getCookie(COOKIE_KEY_INFOBAR_LAPOZAS);
	if (v_isDetailsOpen != null && v_currentTimeInMillis - v_isDetailsOpen < 2000) {
		f_openDetails();
		f_setCookie(COOKIE_KEY_DETAILS_LAPOZAS, 0);
	}
	if (v_isInfobarOpen != null && v_currentTimeInMillis - v_isInfobarOpen < 2000) {
		f_openInfobarHelper(v_currentBox);
		f_setCookie(COOKIE_KEY_INFOBAR_LAPOZAS, 0);
	}

	// Register keypress

	document.onkeypress = f_keypress;

	// 106 j, 107 k, 108 l

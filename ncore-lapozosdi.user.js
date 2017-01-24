// ==UserScript==
// @name         Ncore lapozósdi
// @namespace    peetft.ddns.net
// @version      0.21
// @description  Ncore kiegészítő
// @author       peeter.toth@gmail.com
// @match        https://ncore.cc/torrents.php*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/peetertoth/ncore-lapozosdi/master/ncore-lapozosdi.user.js
// @downloadURL  https://raw.githubusercontent.com/peetertoth/ncore-lapozosdi/master/ncore-lapozosdi.user.js
// @require      https://raw.githubusercontent.com/peetertoth/ncore-lapozosdi/master/ncore-lapozosdi-module-functions.js
// ==/UserScript==

	var COOKIE_KEY_LAPOZAS = "lapozas";

	// Main

	var v_boxes = f_collectTorrentBoxes();
	var v_currentBoxIndex = 0;
	
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
	
	v_currentBox.style.backgroundColor = v_highlightedBackgroundColor;
	f_scrollToIfNotVisible(v_currentBox);
	
	var v_detailsIsOpen = false;

	// Register keypress

	document.onkeypress = f_keypress;

	// 106 j, 107 k, 108 l

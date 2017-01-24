// ==UserScript==
// @name         Ncore lapozósdi
// @namespace    peetft.ddns.net
// @version      0.14
// @description  Ncore kiegészítő
// @author       peeter.toth@gmail.com
// @match        https://ncore.cc/torrents.php*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/peetertoth/ncore-lapozosdi/master/ncore-lapozosdi.user.js
// @downloadURL  https://raw.githubusercontent.com/peetertoth/ncore-lapozosdi/master/ncore-lapozosdi.user.js
// @require      https://raw.githubusercontent.com/peetertoth/ncore-lapozosdi/master/ncore-lapozosdi-module-functions.js
// ==/UserScript==

	// Main

	var v_boxes = f_collectTorrentBoxes();

	var v_currentBoxIndex = 0;
	var v_currentBox = v_boxes[v_currentBoxIndex];
	var v_originalBackgroundColor = v_currentBox.style.backgroundColor;
	var v_highlightedBackgroundColor = '#aaaa99';
	v_currentBox.style.backgroundColor = v_highlightedBackgroundColor;
	
	var v_detailsIsOpen = false;

	// Register keypress

	document.onkeypress = f_keypress;

	// 106 j, 107 k, 108 l

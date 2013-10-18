$(function(){
	window.color_code = function(password){
		var colors = [];
		var md5 = CryptoJS.MD5(password).toString();
		// length = 32 -> strip last 2. -> generate 5 colors
		md5 = md5.substring(0,30);
		
		
		for (var i = 0; i < 5; i++){
			colors.push(md5.substring((i*6), 6 + (i*6)));
		}

		
		for (var i = 0, len = colors.length; i < len; i++){
			$(".color-" + i).css("background-color", "#" + colors[i]);
		}
		
		
		
		
	}
	
	window.plural = function(string, count){
		if (count == 1){ return 1 +  " " + string; }
		return count + " " + string + "s";
	}
	
	window.dictionary_timeout = null;
	window.dictionary_check = function(password){
		if (window.dictionary_timeout){ clearTimeout(window.dictionary_timeout); }
		
		window.dictionary_timeout = setTimeout(function(password){
			// http://ajax.raszyk.de/proxies/oxford.dictionary.js
			/*
				pr.Oxford('Car', function(err, results){
					if (err || results.length == 0){ $no.dictionary()}
				})
			*/
		}, 500, password);
	}
	
	window.PasswordChecks = [
	// numbers
	function(password){
		var perNumber = 1.3;

		var numbersCount = password.match(/\d/g)
		if (numbersCount == null){		$(".numbers").removeClass("yes").addClass("no"); return 0; }
		numbersCount = numbersCount.length;
		
		if (numbersCount > 10){ numbersCount = 10; }
		
		if (numbersCount > 3){
			$(".numbers").removeClass("no").addClass("yes")
		} else {
			$(".numbers").removeClass("yes").addClass("no");
		}

		perNumber *= numbersCount;
		return perNumber;
		
	},
	// length
	function(password){
		var perChar = 1.2;
		var length = password.length;
		$(".lengthc").html(plural("character", length));

		if (length > 15) {
			length = 15;
		}
		if (length > 8){
			$(".length").removeClass("no").addClass("yes")
		} else {
			$(".numbers").removeClass("yes").addClass("no");
		}
		return length * perChar;
	},
	
	// extra symbols
	function(password){
		var perChar = 1.8;
		var matches = password.match(/[^a-zA-Z0-9]/g);
		
		if (matches == null){ return 0; $(".symbols").removeClass("yes").addClass("no");}
		if (matches.length > 3){
			$(".symbols").removeClass("no").addClass("yes")
		} else {
			$(".symbols").removeClass("yes").addClass("no");
		}
		
		return matches.length * perChar;
	},
	// mixcase
	function(password){
		if (password.length < 6){ $(".mixcase").removeClass("yes").addClass("no"); return 0; }
		var lowerCase = false;
		var upperCase = true;
		for (var i = 0, len = password.length; i < len; i++){
			var character = password[i];
			var check_digit = character.match(/\d$/g);
			if (check_digit != null){ continue; }
			if (character.toUpperCase() == character){ upperCase = true; }
			if (character.toLowerCase() == character){ lowerCase = true; }
		}
		if (lowerCase && upperCase){ $(".mixcase").removeClass("no").addClass("yes"); return 10; }
		else { $(".mixcase").removeClass("yes").addClass("no"); return 0; }
	}
	
	
	]
	
	$("#password").on("keyup", function(){
		var password = $(this).val();
		var $block = $(".indicator_block");
		
		var indicator = 100;
		for (var i = 0, len = PasswordChecks.length; i < len; i++){
			indicator -= PasswordChecks[i](password)
		}
		$block.animate({ width: indicator + "%"}, 100)
		
		dictionary_check(password);
		color_code(password);
		// md5 hash
		$(".md5").html(CryptoJS.MD5(password).toString())
		
	}).on("focus", function(){
		$(".hints").slideDown();
	}).on("blur", function(){
		$(".hints").slideUp()
	});
	

	
});
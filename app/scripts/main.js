$(function(){
	
	window.PasswordChecks = [
	// numbers
	function(password){
		var perNumber = 1.3;

		var numbersCount = password.match(/\d/g)
		if (numbersCount == null){ $(".numbers").removeClass("yes").addClass("no"); return 0; }
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
		
		
	}).on("focus", function(){
		$(".hints").slideDown();
	}).on("blur", function(){
		$(".hints").slideUp()
	});
	
});
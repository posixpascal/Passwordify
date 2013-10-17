$(function(){
	
	window.PasswordChecks = [
	// numbers
	function(password){
		var perNumber = 1.3;

		var numbersCount = password.match(/\d/g)
		if (numbersCount == null){ return 0;}
		numbersCount = numbersCount.length;
		
		if (numbersCount > 10){ numbersCount = 10; }
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
		return length * perChar;
	},
	
	// extra symbols
	function(password){
		var perChar = 1.8;
		var matches = password.match(/[^a-zA-Z0-9]/g);
		
		if (matches == null){ return 0; }
		return matches.length * perChar;
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
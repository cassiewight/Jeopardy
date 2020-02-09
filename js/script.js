/* 

This game is meant to be played in a group setting, displayed on a large monitor.
It is best if one person has a written list of questions and plays the role of Alex Trebec while another controls the game on the computer.
The game works just like a normal game of jeopardy: one player chooses a clue and they buzz in to give their answers. (Every contestant uses a different sounding object to buzz in)
The game controller clicks on the chosen clue, then clicks the contestant who buzzed in, then clicks wether they got the answer wrong or right by clicking the ckeckmark of the 'x'.  The scores will update accordingly.

This game was made for my mother's birthday so the clues are customized to her!

Clues are hardcoded but the app can be adapted in future to support user costomization or API integration. 

*/


console.log("script.js has loaded");


var dailyDoubleSound = document.getElementById("dailyDoubleSound");
var themeSong = document.getElementById("themeSong");

var dailyDouble1 = Math.floor(Math.random() * 30);
	console.log(dailyDouble1)
var dailyDouble2 = Math.floor(Math.random() * 30);
	console.log(dailyDouble2)


//contestant objects will store their name and score
let contestant1 = {
	name:"",
	score:0
}

let contestant2 = {
	name:"",
	score:0
}

let contestant3 = {
	name:"",
	score:0
}

var contestants = [contestant1, contestant2, contestant3];


//start game ok button enters the contestants names and displays the main page
$("#contestantEnterOk").on("click", function(){

	//set names from inputs
	contestant1.name = $("#c1").val();
	contestant2.name = $("#c2").val();
	contestant3.name = $("#c3").val();

	$("#frontPage").attr("style", "display:none");

	$("#c1Name").html(contestant1.name);
	$("#c2Name").html(contestant2.name);
	$("#c3Name").html(contestant3.name);

	updateScores();

})

function updateScores(){

	$("#c1Score").val(contestant1.score);
	$("#c2Score").val(contestant2.score);
	$("#c3Score").val(contestant3.score);

	if (contestant1.score < 0){
		$("#c1Score").attr("style", "color:red");
	}
	else {
		$("#c1Score").attr("style", "color:white");
	}

	if (contestant2.score < 0){
		$("#c2Score").attr("style", "color:red");
	}
	else {
		$("#c2Score").attr("style", "color:white");
	}

	if (contestant3.score < 0){
		$("#c3Score").attr("style", "color:red");
	}
	else {
		$("#c3Score").attr("style", "color:white");
	}

}

//listener for clue selection
$(".selectionTable td").on( "click", function() {
	var element = Number($( this ).attr("id").substring(1, 3));
	console.log(element)
	if (element == dailyDouble1 || element == dailyDouble2){
		dailyDouble(element);
		$( this ).html("");
		return;
	}
	displayClue(element);
	//remove the clue once its been selected
	$( this ).html("");
})

function dailyDouble(clueId) {

	//Create Daily Double Sound
	dailyDoubleSound.play();
	var newDiv = document.createElement("div");
	$(newDiv).attr("class", "dailyDouble");
	$("body").prepend(newDiv);

	//Create contestant buttons
	for (var i = 1; i <= 3; i++){

		//create buttons
		var contestantButtonName = "c" + i ;
		var contestant = document.createElement("button");
		$(contestant).attr("id", contestantButtonName);
		$(contestant).attr("class", "nameButton");
		$(contestant).html(contestants[i - 1].name);
		$(newDiv).append(contestant);

	}

	//listen for contestant selection
	$(".nameButton").on( "click", function() {

		var contestant;
		var betAmount = 0;

		//determine contestant
		cId = $( this ).attr("id");

		if (cId == "c1"){
			contestant = contestant1;
		}
		else if (cId == "c2"){
			contestant = contestant2;
		}
		else {
			contestant = contestant3;
		}
		
		//Display amount
		var balance = contestant.score;
		var displayBalance = document.createElement("div");
		$(displayBalance).html(balance);
		$(newDiv).append(displayBalance);

		//Create input for bet
		var bet = document.createElement("input");
		$(bet).attr("type", "text");
		$(newDiv).append(bet);

		//create ok button
		var ok = document.createElement("button");
		$(ok).attr("type", "button");
		$(ok).html("OK");
		$(ok).attr("disabled", "disabled");
		$(newDiv).append(ok);

		//listener for bet 
			$(bet).on( "input", function(){
				betAmount = Number($(bet).val());
				console.log(betAmount);
				$(ok).removeAttr("disabled");
			})

		//listener for ok button
			$(ok).on( "click", function(){
				$(newDiv).attr("style", "display:none");
				displayClue(clueId, betAmount, contestant);

			})

	})

	function displayClue(id, bet, contestant){

		console.log(bet);
		console.log(contestant.name);
		//create clue div
		var newDiv = document.createElement("div");
		$(newDiv).attr("class", "clue");
		//create clue text div
		var newDivText = document.createElement("div");
		$(newDivText).attr("class", "clueText");
		//add clue to body
		$("body").prepend(newDiv);
		//add clueText to clue
		$(newDiv).append(newDivText);
		var clue = getClue(id);
		$(newDivText).append(clue);

		//create rigth or wrong buttons
		var correct = document.createElement("button");
			$(correct).attr("id", "correct");
			$(correct).html('&#10003');
			$(newDiv).append(correct);

		var wrong = document.createElement("button");
			$(wrong).attr("id", "wrong");
			$(wrong).html("X");
			$(newDiv).append(wrong);

		//listener for correct/wrong selection and adjust score
		$("#correct").on( "click", function(){
			contestant.score += bet;
			updateScores();
			$(newDiv).attr("style", "display:none");
		})
		$("#wrong").on( "click", function(){
			contestant.score -= bet;
			updateScores();
			$(newDiv).attr("style", "display:none");
		})

	}

}


function displayClue(clueId) {

	//determine the value of the clue
	var clueValue = getClueValue(clueId);
	//create clue div
	var newDiv = document.createElement("div");
	$(newDiv).attr("class", "clue");
	//create clue text div
	var newDivText = document.createElement("div");
	$(newDivText).attr("class", "clueText");
	//add clue to body
	$("body").prepend(newDiv);
	//add clueText to clue
	$(newDiv).append(newDivText);
	var clue = getClue(clueId);
	$(newDivText).append(clue);

	for (var i = 1; i <= 3; i++){

		//create buttons
		var contestantButtonName = "c" + i ;
		var contestant = document.createElement("button");
		$(contestant).attr("id", contestantButtonName);
		$(contestant).attr("class", "nameButton");
		$(contestant).html(contestants[i - 1].name);
		$(newDiv).append(contestant);



	}

	//create correct, wrong and no answer buttons
	var correct = document.createElement("button");
		$(correct).attr("id", "correct");
		$(correct).attr("disabled", "disabled");
		$(correct).html('&#10003');
		$(newDiv).append(correct);

	var wrong = document.createElement("button");
		$(wrong).attr("id", "wrong");
		$(wrong).attr("disabled", "disabled");
		$(wrong).html("X");
		$(newDiv).append(wrong);

	var noAnswer= document.createElement("button");
		$(noAnswer).attr("id", "noAnswer");
		$(noAnswer).html("EXIT")
		$(newDiv).append(noAnswer);


	//listener for exit 
	$("#noAnswer").on( "click", function(){
		$(newDiv).attr("style", "display:none");
	})

	//listen for contestant selection
	$(".nameButton").on( "click", function() {

		$(correct).removeAttr("disabled");
		$(wrong).removeAttr("disabled");

		//determine contestant
		var contestant;
		cId = $( this ).attr("id");

		if (cId == "c1"){
			contestant = contestant1;
		}
		else if (cId == "c2"){
			contestant = contestant2;
		}
		else {
			contestant = contestant3;
		}
		console.log(contestant.name);

		//listener for correct/wrong selection and adjust score
		$("#correct").on( "click", function(){
			contestant.score += Number(clueValue);
			updateScores();
			$(newDiv).attr("style", "display:none");
		})
		$("#wrong").on( "click", function(){
			console.log("contestant wrong " + contestant);
			contestant.score -= Number(clueValue);
			updateScores();
			contestant = "undefined";
		})

	})

}

$("#final_btn").on( "click", function(){
	final();
})

function final(){
	$("#final_category").attr("style", "display:block");

	$("#final_category_ok_btn").on( "click", function(){
		$("#final_category").attr("style", "display:none");
		$("#final_clue").attr("style", "display:block");
		themeSong.play();
	})
}

function getClueValue(divId){
	if (divId <= 6){
		return 200;
	}
	else if (divId <= 12){
		return 400;
	}
	else if (divId <= 18){
		return 600;
	}
	else if (divId <= 24){
		return 800
	}
	else if (divId <= 30){
		return 1000;
	}
}

/*
BEUBS / PREMIERE / FOR & BACK / 'HOOD / SPORTS / TELEVISION
1	2	3	4	5	6
7	8	9	10	11	12
13	14	15	16	17	18
19	20	21	22	23	24
25	26	27	28	29	30
*/


function getClue(id){

	switch(id){

	case 1:
		return "Micheal Buble has won several awards, including one AMA, an acronym for this";
	case 2:
		return "(1964): This cherished musical starring Julie Andrews";
	case 3:
		return "A state of deep rest / The skins of fruit";
	case 4:
		return "Municipality on the southern border of Kirkland";
	case 5:
		return "This Manchester City Manager spent most of his playing carreer in Barcelona";
	case 6:
		return "It might read -30 in the winter";

	case 7:
		return "Michael Buble has covered many songs, including \"Cant Buy Me Love,\" originally sung by this group";
	case 8:
		return "(2014): \"Birdman,\" which won the Oscar for best movie. Its main actor, known for his role in All's Fair, was nominated.";
	case 9:
		return "A wild canine / The motion of running water";
	case 10:
		return "Three streets connect to Park Letart: Pearson Place, Gingerwood, and this fragrantly named street";
	case 11:
		return "He holds the second rank in men's professional tennis";
	case 12:
		return "A reminder of a time or place";

	case 13:
		return "A play on the pronounciation of Micheal Buble's last name, an ad campaign for this company was launched during the 2019 Super Bowl";
	case 14:
		return "(2004): \"Hero,\" martial arts film starring Jet Li was the first movie of this language to go no.1 at the US box office";
	case 15:
		return "Tar-Tar / An international conflict";
	case 16:
		return "Throughout the 20th century, this precious metal was mined in the city of Kirkland";
	case 17:
		return "Doing this to a curling ice sheet before a game will cause the stone to travel farther and curl less.";
	case 18:
		return "Instrument that responds to ground motions";
	
	case 19:
		return "A fan of ice hokey, Micheal Buble supports this NHL team";
	case 20:
		return "(1953): \"Roman Holiday,\" starring George Peck, Eddie Albert and this leading lady of Hollywood's golden age";
	case 21:
		return "A terrible fate / An emotional state";
	case 22:
		return "For conservation purposes, this summer household activity is only permitted between 6pm and 10am";
	case 23:
		return "The Toronto Raptors won game 7 of the 2019 NBA championships in this city";
	case 24:
		return "Steeped in water, its a soothing drink before bed";

	case 25:
		return "Michael Buble's wife, Luisana Lopilato, is from this South American country.";
	case 26:
		return "(2013) Also the film's title, this earthly force was distinclty not present in the film's setting.";
	case 27:
		return "A standard in golf / Music genre not favoured by people in their 60's";
	case 28:
		return "Kirkland's current mayor";
	case 29:
		return "In NFL, the endzone is 10 yards long.  In the CFL, it is this many yards longer";
	case 30:
		return "Spice that helps with digestion often used in arabic coffee";
	}

}


	
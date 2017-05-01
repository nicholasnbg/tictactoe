$(document).ready(function(){
	$("#board, #scores").hide();


	/* VARIABLES INITIATED IN HERE */
	var human;
	var comp;

	var p1 = [1,'X',0]; // [player,sign,wins]
	var p2 = [2,'O',0];

	var current;
	var firstTurn;

	var winners = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 1, 2],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
	];

	var boardArr = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];

	var gameWon = false;

	var turnCount=0;


	/*CODE TO BEGIN GAME, PLAYER NEEDS TO CHOOSE X OR O*/
	$('#chooseP > .btn').click(function(){
		if($(this).attr('id') === "chooseP1"){
  		human = p1;
  		comp = p2;
  		current = human;
  		firstTurn = 'human';
  	} else {
  		human = p2;
  		comp = p1;
  		current = comp;
  		first = 'comp';
  		//need to run computer first turn
  		var x = setTimeout(compTurn, 500);
  	}
  	$('#chooseP').hide();
  	$("#board, #scores").show();

  });

	/*CODE TO MAKE FREE TILES CHANGE MOUSE ON HOVER SO PLAYER CAN SEE IF AVAILABLE*/
	$("td").hover(function() {
		var pos = $(this).attr("id");
    //checks if square is empty using board array, if it is empty, changes mouse to crosshair when hovering
    if (boardArr[pos] == "#") {
    	$(this).css("cursor", "crosshair");
    }
});

  //CODE FOR HUMAN CLICKING EMPTY SQUARE
  
  $("td").click(function(){
  	var tile = $(this).attr('id');
  	if(boardArr[tile]==='#'){
  		
  		humanTurn(tile);
  		
  	}
  })
	

  /*FUNCTIONS TO BE CALLED FOR TURNS*/

  //pickEmpty, used for computers turn to pick a random empty square.
  function pickEmpty(){
  	var emptyArr = [];
  	for(i=0;i<boardArr.length;i++){
  		if(boardArr[i] === '#'){
  			emptyArr.push(i);
  		}
  	}
  	var x = Math.round(Math.random() * emptyArr.length);
  	var choice = emptyArr[x];
  	if (choice === undefined) {
  		choice = emptyArr[x - 1];
  	}
  	return choice;
  };
  /******************************************************************/

  /**************COMPUTERS TURN**************************************/
  function compTurn(){
  	let current = comp;
  	var tile = pickEmpty();
  	$('#'+tile).html(comp[1]);
  	boardArr[tile] = comp[1];
  	checkWin(current);
  	if(gameWon === 1 || gameWon ===2){
  		alert("Computer wins!");
  		winReset(comp);

  	} 
  	else {
  		turnCount ++;
  		checkDraw();
  		//if it was a draw, turn count will be reset to 0, if human is p2, run computer turn first
  		if(turnCount===0 && human[0]===2){
  			compTurn();
  		}
  		
  	}

  	
  	
  };

/*********************HUMANS TURN**********************************/
  function humanTurn(tile){
  	let current = human;
   	$('#'+tile).html(human[1]);
  	boardArr[tile] = human[1];
  	checkWin(current);
  	
  	if(gameWon === 1 || gameWon ===2){
  		alert("Nice one, you win!");
  		var reset = setTimeout(winReset(human),1000);
  	} 
  	else {
  		turnCount ++;
  		checkDraw();
  		//if it is not a draw, ie, turncount hasnt been reset to 0, run a comp turn
  		if(turnCount!== 0){
  		var compGo = setTimeout(compTurn(),800);
  		}
  		//else if it was a draw, and human is O, run the comps first turn in the new game
  		else if(turnCount===0 && human[0]===2){
  			compTurn();
  		}
  		
  	}
  	
  }


/**********************Function to check for a win*********************/
  function checkWin(curr){
  	var currentTiles = [];
  	//compile array of all tiles taken by the current player
  	for(i = 0; i<boardArr.length; i++){
  		if(boardArr[i]===curr[1]){
  			currentTiles.push(i);
  		}
  	}

  	//Check the current tiles array agains each winning combo to find a match.

  	//for each of the winning combo arrays:
  	for(x=0; x<winners.length; x++){
  		//keep a count
  		var count = 0;
  		//check each of the 3 numbers in the winning combo (winners[x])
  		for(j=0;j<winners[x].length;j++){
  			//and check if they are in the current tiles array, if they are, add 1 to count
  			if(currentTiles.indexOf(winners[x][j])!= -1){
  				count ++;
  			}
  			//if all 3 numbers in the winning array being checked are also in the current tiles array
  			//then change the game won var/flag, to the winning players id, 1 or 2.
  			if(count == 3){
  				
  				gameWon = current[0];
  				
  			}	
  		}
  	}

  }

  /**************Upon win, updates scores and resets board for new game********/
  function winReset(winner){
  	//update winners win tally
  	winner[2] ++;
  	//update scoreboard html
  	$('#scores').html('P1: '+p1[2]+' <br>P2: '+p2[2]);
  	//reset turn count
  	turnCount=0;
  	//reset all tiles html to blank
  	$('td').html('');
  	//reset board array
  	boardArr = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
  	//run first comp turn if human is O, otherwise wait for human first turn.
  	if(human === p1){
  		current = human;
  	}else{
  		
  		let current = comp;
  	var tile = pickEmpty();
  	$('#'+tile).html(comp[1]);
  	boardArr[tile] = comp[1];
  	turnCount++;

  	}
  	//make sure gameWon is reset to false, otherwise infinite loop.
  	gameWon = false;
  }

  /*******************CHECKS FOR DRAW*********************/
  function checkDraw(){
  	//if turncount is 9, no more tiles left, reset the td's boar arr and turncount.
  	if(turnCount > 8){
  		alert("It's a Draw!");
  		$('td').html('');
  		boardArr = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
  		if(human === p1){
  		current = human;
  		}else{
  		current = comp;
  		}
  		turnCount = 0;
  	}
  }






});
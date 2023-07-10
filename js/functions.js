//Animation
function shootPuckGoal(el) {
    let leftPosition = el.position().left;
    let topPosition = el.position().top;
    
    let topOffset = 50;
    let leftOffset = 275;

    $('#puck').animate({
        top: topPosition - topOffset,
        left: leftPosition + leftOffset
    }, 1000, 'swing', function() {
        $('#puck').css({
            top: '',
            left: ''
        });
    });
}

// Animation 
function shootPuckMiss() {
    let leftOffset = random(-200, 200);
    let leftPosition = 50 + leftOffset;

    $("#puck").animate({
        top: 20,
        left: leftPosition,
    }, 1000, 'swing', function() {
        $('#puck').css({
            top: '',
            left: ''
        });
    });

}
//überprüft ob die Antwort richtig ist 
function checkAnswer(element) {
    
    let isRichtig = element.text() == loesung;

    if (isRichtig) {
        playerscore++;
        if (checkGameover()) return;
        
        // RICHTIG
        $('#goal')
            .text('GOAL!')
            .css({color: '#31B404'})
            .fadeIn(2000, function() {
            $('#goal').fadeOut(500);
        });

    }
    else {
        enemyscore++;
        if (checkGameover()) return;

        // FALSCH
        $('#goal')
            .text('Daneben!')
            .css({color: '#DF0101'})
            .fadeIn(2000, function() {
            $('#goal').fadeOut(500);
        });
    }
    updateScore();
    nextQuestion();

    return isRichtig;
}

function updateScore()
{
    $('#score').text(`${playerscore} : ${enemyscore}`);
}

//Nächste Aufgabe
function nextQuestion()
{
    operand1 = random(5,10);
    operand2 = random(5,10);
    operators = ['+','-',];
    var operator = operators[randomOperator(0, operators.length)]
    loesung;

    // Lösung überprüfen
    switch (operator)
    {
      case '+':
        loesung = operand1 + operand2;
        break;
      case '-':
          if (operand1 < operand2)
          {
              var temp = operand1
              operand1 = operand2;
              operand2 = temp;
          }
        loesung = operand1 - operand2;
        break;
    }



    let falsch1 = random(loesung - 5, loesung - 1);
    let falsch2 = random(loesung + 1, loesung + 5);
    let arrayAntworten = [loesung, falsch1, falsch2];
    $('#rechnung span').text(`${operand1} ${operator} ${operand2}`);
    
    shuffle(arrayAntworten);
    $('#zahl1').text(arrayAntworten[0]);
    $('#zahl2').text(arrayAntworten[1]);
    $('#zahl3').text(arrayAntworten[2]); 

}
//überprüft ob das Spiel vorbei ist 
function checkGameover()
{
    const max_runde = 5;
    if(playerscore >= max_runde)
    {
        $('#container').hide();
        $('#fin').show();
        $('#end')
            .text('Gewonnen!')
            .css({color: 'blue'})
            .fadeIn(9000);
        
        return true;
    }
    else if ( enemyscore >= max_runde )
    {
        $('#container').hide();
        $('#fin').show();
        $('#end')
            .text('Verloren!')
            .css({color: 'red'})
            .fadeIn(9000);

        return true;
    }

    return false;
}

function getRandomEnemyTeam() {

    let filtered = teams.filter(t => t != team);
    gegnerTeam = filtered[random(0, filtered.length - 1)];
    // aktualisiert Team
    $("#name").text(`${team} : ${gegnerTeam}`);
    // akutalisiert Torwart
    $("#torwart_img").attr('src', `img/Goalkeeper_${gegnerTeam}.png`);
}


// Die Antworten vermischen
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    
    while (0 !== currentIndex) {
  
      
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomOperator(min, max) {
    return Math.floor(Math.random() * (max - min ) + min);
  }
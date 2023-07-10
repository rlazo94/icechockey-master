$(function() {
    // Als Default wird Russland gewählt
    $('#btnRus').addClass('selected');
    team = $('#btnRus').text();
    $('#player').attr('src', `img/Player_${team}_1200.png`);
    getRandomEnemyTeam();

    $('#btnStart').on("click", function() {
        $('#menu').hide();
        $('#hilfe').hide();
        $('#selectPlayer').show();
    });

    $('#btnHilfe').on("click", function() {
        $('#menu').hide();
        $('#hilfe').show();
    });

    $('#btnHilfeBeenden').on("click" ,function() {
        $('#container').hide();
        $()
        $('#menu').show();
    });

    $('#btnBeenden').on("click" ,function() {
        $('#container').hide();
        $('#menu').show();
        
        // Resets Spieldaten
        playerscore = 0;
        enemyscore = 0;
        updateScore();
    });
    
    $('.team').on('click', function() {
        if (team == null) 
        {
            // gewählt
            $(this).addClass('selected');

            // speichert team
            team = $(this).text();
        }
        else 
        {
            // hebt die gewählten Button auf
            $('.selected').removeClass('selected');
            
            // speichert team
            team = $(this).text();

            // gewählt
            $(this).addClass('selected');
        }
        
        $('#playerSelect img').attr('src', `img/spielerauswahl_${team}.png`);
    });

    $('#btnSelect').on("click", function() {
        $('#selectPlayer').hide();
        $('#container').show();
        $('#player').attr('src', `img/Player_${team}_1200.png`);

        nextQuestion();
        getRandomEnemyTeam();
    });

    
    $('.antwort').on("click", function() {
        let isRichtig = checkAnswer($(this));
        if (isRichtig)
        {
            shootPuckGoal($(this));
        }
        else
        {
            shootPuckMiss();
        }
    });


    $('#btnretry').on("click", function() {
        // Resets Spieldaten
        playerscore = 0;
        enemyscore = 0;
        updateScore();
        
        // Zeigt das Menü an
        $('#fin').hide();
        $('#menu').show();
    });
});

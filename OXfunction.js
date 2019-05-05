    // fix box width equil height
    var winResizeHandler = function(){
        var wt = $('.cell').width();
        $('.cell').height(wt).css({
            'font-size': wt + 'px',
            'line-height': wt * 0.92 + 'px'
        });
    };
    
    $(window) 
        .resize(winResizeHandler)
        .keypress(function(e){
            e.preventDefault();
            initGame();
            console.log('keydown');
        });
        
    winResizeHandler();
    
    $(".ss").on("click", function(){
        console.log("click ss");
        initGame();
    });
    
    
    //show arrow left or right depand of player1 or 2
    var showArrow = function(p) {
        if ( p % 2 === 0) {
            $('.player1 > .arrow').removeClass('inv');
            $('.player2 > .arrow').addClass('inv');
        }else{
            $('.player1 > .arrow').addClass('inv');
            $('.player2 > .arrow').removeClass('inv');
        }
    };
    
    
    //define win model
    var winningCombos = {
        combo0: [0, 1, 2],
        combo1: [3, 4, 5],
        combo2: [6, 7, 8],
        combo3: [0, 3, 6],
        combo4: [1, 4, 7],
        combo5: [2, 5, 8],
        combo6: [0, 4, 8],
        combo7: [2, 4, 6]
    };
    
    var potentialCombos = {
        0: ['combo0', 'combo3', 'combo6'],
        1: ['combo0', 'combo4'],
        2: ['combo0', 'combo5', 'combo7'],
        3: ['combo1', 'combo3'],
        4: ['combo1', 'combo4', 'combo6', 'combo7'],
        5: ['combo1', 'combo5'],
        6: ['combo2', 'combo3', 'combo7'],
        7: ['combo2', 'combo4'],
        8: ['combo2', 'combo5', 'combo6']
    };
    
    var gameOver = false;
    var currentState = []; // empty array for storing X or O on each box
    var symbols = ['&times', '&#9675'];
    var currentStep = 0;
    
    var checkCombo = function(a) { // a function which is used to check the three elements are the same in the selected combo
        var a0 = currentState[a[0]], // create a var which is the first element in the selected combo
            a1 = currentState[a[1]], // create a var which is the second element in the selected combo
            a2 = currentState[a[2]]; // create a var which is the third element in the selected combo
        var winGame = (a0 == a1 && a1 == a2); // create a var that a situation which the three elements are the same
        if (winGame){ // if the three selected elements are the same
            $('.cell[data-i="' + a[0] + '"]').addClass('win'); // add a class "win" behind the div which has class named "cell" and "data-i='the selected element'"
            $('.cell[data-i="' + a[1] + '"]').addClass('win'); // add a class "win" behind the div which has class named "cell" and "data-i='the selected element'"
            $('.cell[data-i="' + a[2] + '"]').addClass('win'); // add a class "win" behind the div which has class named "cell" and "data-i='the selected element'"
        }
        return winGame;
    }
    var initGame = function(){  // initial game
        if (gameOver){
            $('.cell').empty().removeClass('win');
            gameOver = false;
            console.log('initGame');
            for (var i = 0; i < 9; i++){  // clear all boxs data
                currentState[i] = null;
            }
            currentStep = 0; // restart step counting 
            showArrow(currentStep); // init arrow
        }
    };
    initGame(); // activate init function
    
    //determine the box is empty or not and put a symbol on it if it is empty.
    $('.cell').click(function(){
        console.log('clickonly');
        if (!gameOver){
            console.log('game is not over');
            var $this = $(this);
            var i = $this.data('i'); //get the box number
            console.log(i);
            if (currentState[i] == null) { //check the box is empty
                var s = symbols[currentStep++ % 2]; //check it is X or O tern in this step and put it(a UTF8) into s
                console.log('currentState null and currentStep is ' + currentStep);
                currentState[i] = s; // put the X or O into the box just for storing
                $this.html(s); // show the X or O on the box
                for (var j = 0, len = potentialCombos[i].length; j < len; j++){
                    // check all potencialCombos on which you click the box 
                    // for example: if you click 0 box, then you will loop this circle three times  
                    // because there are three potencialCombos on the 0 box which are  "'combo0', 'combo3' and 'combo6'" 
                    var wined = winningCombos[potentialCombos[i][j]];  
                    // create a var which is one of the array of winningCombo
                    // for example: if you click 0 box, you will make i = 0 in the first loop and get the j = 0, so var will be  combo0: [0, 1, 2].
                    // the the second round of this loop will make your i still = 0 but j = 1, so var will be combo3: [0, 3, 6] and so on.
    
    
                    if (checkCombo(wined)){ 
                        // check the condition of winning define by winningCombo is true or not
                        // when put the combo into the checkCombo function
                        console.log('wined');
                        gameOver = true;
                        return;
                    }
                }
                if (currentStep == 9){
                    console.log('currentStep full');
                    gameOver = true;
                    return;
                }
                showArrow(currentStep);
            }
        }
        
    });
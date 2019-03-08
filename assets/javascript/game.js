var obiWan = {
    name: "Obi-Wan Kenobi",
    imgLink: "assets/images/obiWan.jpg",
    health: 120,
    counterAttack: 10,
    currentAttack: 8,
};

var darthSidious = {
    name: "Darth Sidious",
    imgLink: "assets/images/darthSidious.jpg",
    health: 130,
    counterAttack: 15,
    currentAttack: 6,
};

var lukeSkywalker = {
    name: "Luke Skywalker",
    imgLink: "assets/images/lukeSkywalker.jpg",
    health: 110,
    counterAttack: 5,
    currentAttack: 18,
};

var darthMaul = {
    name: "Darth Maul",
    imgLink: "assets/images/darthMaul.jpg",
    health: 150,
    counterAttack: 20,
    currentAttack: 5,
};

var characters = [obiWan, lukeSkywalker, darthMaul, darthSidious]

$(document).ready(function() {
    
    function setDivs() {
        for (var i = 0; i < characters.length; i++) {
            var characterDiv = $("<div>");
            characterDiv.addClass("text-center character-container character-container-start col-lg-2 col-md-3 col-12")
            setAttributes(characterDiv, characters[i]);
            setChar(characterDiv);
            $($("#attack-container").children()[0]).attr("id", "attack-button");
            $("#starting-character-container").append(characterDiv);

            if(i === characters.length - 1) {
                var placeholder1 = $(characterDiv).clone();
                placeholder1.addClass("hidden");
                placeholder1.removeClass("character-container-start");
                $("#player-character").append(placeholder1);
            }
        }
    }

    // sets all the attributes needed for calculations and now the objects are not going to be used
    function setAttributes(charDiv, charObj) {
        console.log(typeof charObj.health);
        charDiv.attr({
            "name": charObj.name,
            "imgLink": charObj.imgLink,
            "health": charObj.health,
            "counter": charObj.counterAttack,
            "attack": charObj.currentAttack,
            "base-attack": charObj.currentAttack
        });
    }

    // Sets the text for the character divs
    function setChar(charDiv) {
        charDiv.append($("<p>").text(charDiv.attr("name")));
        charDiv.append($("<img>").attr("src", charDiv.attr("imgLink")).addClass("img-fluid"));
        charDiv.append($("<p>").addClass("char-health").text(charDiv.attr("health")));
    }

    function updateValues(playerDiv, defenderDiv) {
        $(defenderDiv).attr("health", parseInt($(defenderDiv).attr("health")) - parseInt($(playerDiv).attr("attack")));
        $(playerDiv).attr("health", parseInt($(playerDiv).attr("health")) - parseInt($(defenderDiv).attr("counter")));        
    }

    function updateText(playerDiv, defenderDiv){

        // Log the damage first
        console.log($(playerDiv).children()[2]);
        $($(playerDiv).children()[2]).text($(playerDiv).attr("health"));
        $($(defenderDiv).children()[2]).text($(defenderDiv).attr("health"));

        if ((parseInt($(playerDiv).attr("health")) <= 0 && parseInt($(defenderDiv).attr("health")) <= 0)
                && $("#selectable-enemies").children().length === 0) {

            // It's a stalemate!
            $("#damage-output").empty();
            $("#damage-output").append($("<p>").text("It's a stalemate! Game over..."));
           
            $("#damage-output").append($("<button>").text("Reset").addClass("btn btn-primary btn-danger").attr("id", "reset"));
            $("#attack-button").removeAttr("id");

        } else if (parseInt($(defenderDiv).attr("health")) <= 0 && $("#selectable-enemies").children().length === 0) {
        
            $("#current-enemy").empty();

            // You beat everyone!
            $("#damage-output").empty();
            $("#damage-output").append($("<p>").text("You have defeated everyone, YOU WIN!!!"));
        
            $("#damage-output").append($("<button>").text("Reset").addClass("btn btn-primary btn-danger").attr("id", "reset"));
            $("#attack-button").removeAttr("id");

        } else if (parseInt($(defenderDiv).attr("health")) <= 0) {
        
            // clear opponent
            $("#current-enemy").empty();

            // You win against the opponent
            $("#damage-output").empty();
            $("#damage-output").append($("<p>").text("You have defeated " + $(defenderDiv).attr("name") + ", you can choose to fight another enemy."));
       
        } else if (parseInt($(playerDiv).attr("health")) <= 0) {
         
            // You died!
            $("#damage-output").empty();
            $("#damage-output").append($("<p>").text("You have been defeated... GAME OVER!!!"));
            
            $("#damage-output").append($("<button>").text("Reset").addClass("btn btn-primary btn-danger").attr("id", "reset"));
            $("#attack-button").removeAttr("id");

        } else {
            
            // Empty out damage output and replace with current damage.
            $("#damage-output").empty();
            $("#damage-output").append($("<p>").text("You attacked " + $(defenderDiv).attr("name") + " for " + $(playerDiv).attr("attack") + " damage."));
            $("#damage-output").append($("<p>").text($(defenderDiv).attr("name") + " attacked you back for " + $(defenderDiv).attr("counter") + " damage."));
        }

        // Have to update the players attack after I print out how much they did
        $(playerDiv).attr("attack", parseInt($(playerDiv).attr("attack")) + parseInt($(playerDiv).attr("base-attack")));
    }

    // Let's the user choose their character and moves the non chosen into 
    // the enemies section
    $("#starting-character-container").on("click", ".character-container-start", function() {
        $("#player-character").empty();        
        $(this).removeClass("character-container-start");
        $(".character-container-start").addClass("enemies");
        console.log($(".enemies"));
        $("#selectable-enemies").append($(".enemies"));
        $(".character-container-start").removeClass("character-container-start");
        console.log(this);
        $(this).attr("id", "player");
        $("#player-character").append($(this));
    });

    // Put an Enemy in the defender section if empty, if there is already a defender
    // the player can choose a different enemy to switch them out
    $("#selectable-enemies").on("click", ".enemies", function(){
        console.log($("#defender").length);
        if ($("#defender").length === 0){
            $(this).removeClass("enemies");
            $(this).attr("id", "defender");
            $("#current-enemy").append($(this));

            $("#damage-output").empty();
        } else if ($("#defender").length === 1) {
            $("#defender").addClass("enemies");
            $("#selectable-enemies").append($("#defender"));
            $("#defender").removeAttr("id");
            $(this).removeClass("enemies");
            $(this).attr("id", "defender");
            $("#current-enemy").append($(this));

            // Switched opponents!
            $("#damage-output").empty();
            $("#damage-output").append($("<p>").text("You've switched opponents!"));
        }
    });

    $("#attack-container").on("click", "#attack-button", function(){
        if ($("#defender").length === 1) {
            updateValues($("#player"), $("#defender")); 
            updateText($("#player"), $("#defender"))
        } else {
            // Switched opponents!
            $("#damage-output").empty();
            $("#damage-output").append($("<p>").text("There's nobody to attack!"));
        }
    });

    $("#damage-output").on("click", "#reset", function() {
     
        $("#player-character").empty();
        $("#selectable-enemies").empty();
        $("#current-enemy").empty();
        $("#damage-output").empty();

        setDivs();
        console.log("reset");
    });

    setDivs();


});

// Things left to do 
// Win conditions
// RESET button
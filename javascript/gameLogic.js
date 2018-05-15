//--------------------Characters and stats---------------------------
var characterList = [];

$("div.character").each(function()
    {
        var char = 
            {
                "name": $(this).attr("id"),
                "AP"  : parseInt($(this).attr("data-AP")),
                "CAP" : parseInt($(this).attr("data-CAP")),
                "HP"  : parseInt($(this).attr("data-HP"))
            }
        characterList.push(char);
        updateStats(char);
    });
//-------------------------
var attackBase = 0;
var player ;
var enemy  ;
var playerChosen = false;
var enemyChosen  = false;

// -----------------SELECT CHARACTERS------------------------
$(".character").on("click",function()
    {
        if (!playerChosen || !enemyChosen)
            {
                var charSelected = $(this).attr("id");
                var searching = true;
                for(i=0; i<characterList.length && searching; ++i)
                    {
                        if (charSelected == characterList[i]["name"])
                            {
                                if (!playerChosen)
                                    {
                                        player = characterList[i];
                                        attackBase = player["AP"];
                                        $("#"+player["name"]).appendTo($("#attacker"));
                                        playerChosen = true;
                                        $("#notification").text("Choose Your Enemy");
                                    }
                                else if (!enemyChosen &&characterList[i] != player)
                                    {
                                        enemy = characterList[i];
                                        $("#"+enemy["name"]).appendTo("#defender");
                                        enemyChosen = true;
                                        $("#notification").text("Click the Button TO ATTACK!!");
                                    }
                                searching = false;
                            }
                    }
            }

    });
// ------------------PRESSING ATTACK BUTTON -------------------
$("#attackBtn").on("click",function()
    {
        if (playerChosen && enemyChosen)
            {
                if (player["HP"] > 0 && enemy["HP"] > 0)
                    {
                        enemy["HP"] -= player["AP"];
                        player["HP"] -= enemy["CAP"];
                        player["AP"] += attackBase  ;
                        if(player["HP"] < 0)
                            {player["HP"] = 0;}
                        if (enemy["HP"] < 0)
                            {enemy["HP"] = 0;}
                        updateStats(player);
                        updateStats(enemy);
                    }
                if (enemy["HP"] == 0)
                    {
                        console.log("enemy lost");
                        $("#"+enemy["name"]).remove();
                        enemyChosen = false;
                        $("#notification").text("YOU ARE VICTORIOUS!! select your next aponent");
                    }
                else if (player["HP"] == 0)
                    {
                        console.log("player lost");
                        $("#notification").text("YOU LOST (refresh to try again)");
                    }
            }
    });

function updateStats (character)
    {
        $("#"+character["name"]+" .stats li").each(function()
            {
                var cls = $(this).attr("class");
                $(this).text(cls + " : " + character[cls]);
            });
    }
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
    });
//-------------------------
var attackBonus = 0;
var player;
var playerSelected = false;
var enemySelected = false;

$(".character").on("click",function()
    {
        if (!playerSelected)
            {
                player = 
            }
    });



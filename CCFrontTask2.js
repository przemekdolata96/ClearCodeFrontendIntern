exports.damage=function(spellString)
{
	// damage done by spell
	var damage=0;

	//if spell doesn't have require subspells 'fe','ai' return damage=0
	if((spellString.match(/fe/igm))==null || (spellString.match(/ai/igm))==null)
	{
		return damage=0;
	}
	//if spell have more than one 'fe' subspell or last 'ai' subspell is before 'fe' return damage=0
	else if((spellString.match(/fe/igm)).length!=1 || spellString.match(/(fe+(([\w])?)+ai)/)==null)
	{
		return damage=0;
	}
	else
	{  
		//goodSpell contain correct spell
		var getSpell=spellString.match(/(fe+(([\w])?)+ai)/);
		var goodSpell=getSpell[0];

		/*cutting 'fe' and last 'ai' elements from goodSpell and add damage points 
		 'fe'-1 point 'ai'- 2 points */
		goodSpell=goodSpell.substring(2,goodSpell.length-2);
		damage+=3;


		/*this function cut all occurrences of subspell from local variable goodSpell
		 and add damage points to variable damage */
		function cutSubspells(subspell,damagePoints)
		{
			var regex=new RegExp(subspell,"igm");
			if(goodSpell.match(regex)!=null)
			{
				for (var i = goodSpell.match(regex).length; i > 0; i--) 
				{
					goodSpell=goodSpell.replace(subspell,"");
					damage+=damagePoints;
				}
			}
		}

		//give damage points for body of spell
		cutSubspells("dai",5);
		cutSubspells("jee",3);
		cutSubspells("je",2);
		cutSubspells("ne",2);
		cutSubspells("ain",3);
		cutSubspells("ai",2);
		damage-=goodSpell.length;


		if (damage<0)
		{
			damage=0;
		}
		return damage;
	}
}

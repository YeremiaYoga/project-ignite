const illriggerSubclass = [
  {
    key: "architect-of-ruin",
    name: "Architect of Ruin",
    source: "IllR",
    features: [
      {
        name: "",
        level: 3,
        description: `Architects of Ruin are cool and calculating arcane knights who serve Asmodeus, deploying spells, steel, and subterfuge to win at any cost.
Asmodeus rules Acheron, the City of Fear. His illriggers scour the timescape, collecting secrets and spells designed to deceive and terrify his opponents. The war he fights against the other archdevils is one of deception and information.
His Architects of Ruin work to make Hell's enemies seem outnumbered and outmaneuvered. These illriggers are skillful spellblades on the battlefield, though some employ tactics such as research, infiltration, and propaganda to play mind games with their quarry. When an Architect of Ruin finally confronts an enemy, the advantage is theirs—they have studied, prepared, and gripped fate within their gauntlet, forcing it to favor them. They hungrily seek the dark arts to arm both themselves and Asmodeus with the impossible.`,
      },
      {
        name: "Precepts of Ruin",
        level: 3,
        description: `Architects of Ruin swear an oath to Asmodeus when they join the Order of Desolation. These precepts commit them to destroy Asmodeus's enemies by commanding great magic, causing fear, and sowing distrust.
The Battlefield of the Mind. By the time my armies meet yours, you'll be filled with terror and doubt your own strength. I won't have to lift a finger to defeat you.
The Proper Secret. Once I know your secrets, I know your weakness.
Knowledge Is Power. Lore is as powerful as steel. I learn every detail about my enemy and anticipate their every move, checkmating them before the game even begins.
Magic Is Mine to Command. Cunning is also as powerful as steel. I wield the dark arcane arts to manipulate your senses, weaken your resolve, and strengthen my blade. Your soldiers will quake for fear of what dark magics may next cloak my blade.`,
      },
      {
        name: "Asmodeus's Blessing",
        level: 3,
        description: `When Asmodeus accepts you as an Architect of Ruin, he grants you access to his infernal knowledge. You gain proficiency in one of the following skills of your choice: Arcana, History, Nature, or Religion.
In addition, you can also read and write the languages granted by your Forked Tongue, instead of only speaking them.`,
      },
      {
        name: "Spellcasting",
        level: 3,
        description: `As an Architect of Ruin, you access a well of profane magic to cast spells.
Cantrips. You know two cantrips of your choice from the Architect of Ruin spell list (presented at the end of this subclass). You learn an additional cantrip from this list at 10th level.
Spell Slots. The Architect of Ruin Spellcasting table shows how many spell slots you have to cast your illrigger spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.
Spells Known of 1st Level and Higher. At 3rd level, you know three 1st-level spells of your choice from the Architect of Ruin spell list (presented at the end of this subclass).
The Spells Known column of the Architect of Ruin Spellcasting table shows when you learn more illrigger spells of 1st level or higher. Each of these spells must be of a level for which you have spell slots. When you reach 7th level, for example, you learn one new spell of 1st or 2nd level.
Whenever you gain a level in this class, you can replace one of the illrigger spells you know with another spell of your choice from the illrigger spell list. The new spell must be of a level for which you have spell slots.
Spellcasting Ability. Charisma is your spellcasting ability for your spells, so you use your Charisma whenever a spell refers to your spellcasting ability. In addition, you use your Charisma modifier when setting the saving throw DC for a spell you cast and when making an attack roll with one.
Spell save DC = 8 + Charisma modifier + Proficiency Bonus
Spell attack modifier = Charisma modifier + Proficiency Bonus
Spellcasting Focus. You have an unholy symbol, such as an amulet symbolizing your archdevil, a fragment of a blasphemous relic, or a glass orb holding a consecrated drop of archdevil blood. You can use the unholy symbol as a spellcasting focus for your illrigger spells. You must have a free hand to use the unholy symbol, but it can be the same hand you use to perform somatic components.`,
      },
      {
        name: "Invoke Hell",
        level: 3,
        description: `You gain the following two Invoke Hell options:
Enervating Spell. When you deal damage to a creature with an illrigger spell of 1st level or higher, you can expend a seal (no action required) and imbue the spell with weakening magic. The target has vulnerability to that spell's damage. If they normally have resistance or immunity to the spell's damage, that resistance or immunity is suppressed for this spell, and the target has vulnerability to the damage instead.
Spellblade. You can use an action to both make a melee weapon attack and cast an illrigger spell you know that has a casting time of one action.`,
      },
      {
        name: "Hellish Versatility",
        level: 7,
        description: `Once on each of your turns, you can cast one of your illrigger cantrips in place of one of your attacks granted by your Extra Attack feature.`,
      },
      {
        name: "Asmodeus's Interdiction",
        level: 7,
        description: `You learn the following additional interdict boons at the noted illrigger levels. Once you learn an interdict boon granted by this feature, you always know it, and it doesn't count against the number of interdict boons you know.`,
      },
      {
        name: "Axiomatic Seals (Passive)",
        level: 7,
        description: `Prerequisite: Level 7+ Illrigger (Architect of Ruin)
Asmodeus's secrets allow you to infuse your seals with manifest power. When you burn one or more seals to deal damage to a creature, you can activate this boon (no action required) to add your Charisma modifier (minimum of 1) to each seal's damage roll.`,
      },
      {
        name: "Hell Mage (Passive)",
        level: 7,
        description: `Prerequisite: Level 18+ Illrigger (Architect of Ruin)
When you or an ally within 30 feet of you succeed on a saving throw against a spell or other magical effect imposed by an enemy, you can immediately place one or more seals on that enemy, up to a number equal to your proficiency bonus.`,
      },
      {
        name: "Spellbreaker",
        level: 7,
        description: `Prerequisite: Level 13+ Illrigger (Architect of Ruin)
When an interdicted creature you can see within 60 feet of you casts a spell, you can use your reaction to burn one or more of the seals on them. When you do, burning the seal deals no damage, and instead you cast counterspell on them without expending a spell slot. Your spell's level increases by 1 for every additional seal you burn after the first.`,
      },
      {
        name: "Submit",
        level: 11,
        description: `When you cast an illrigger spell you know, you can burn two seals on an interdicted creature (no action required) to impose disadvantage on their saving throw against the spell.`,
      },
      {
        name: "Vile Transmogrification",
        level: 15,
        description: `You uncover two new ways to employ Asmodeus's magic:
Regaining Seals. As a bonus action on your turn, you can expend one spell slot to regain a number of seals equal to that slot's level.
Regaining Spell Slots. As a bonus action on your turn, you can expend any number of seals to regain a spell slot of a level equal to one-third that number. For example, you can expend six seals to regain a 2nd-level spell slot.
Once you use one of these benefits, you can't use that benefit again until you finish a long rest.`,
      },
    ],
  },
  {
    key: "hellspeaker",
    name: "Hellspeaker",
    source: "IllR",
    features: [
      {
        name: "",
        level: 3,
        description: `The charismatic and manipulative Hellspeakers serve Moloch as they slip about the battlefield, coercing enemies into becoming unwitting allies.
Moloch rules Styx, the City of Lies, but his reach extends far beyond it. Hell's greatest politicians and diplomats rise to prominence through Moloch's subtle manipulations. They follow him with great loyalty, for they know they are nothing without him—and thus his power echoes through all of Hell.
Moloch's illriggers are silver-tongued enchanters, lulling his foes to complacency with sorcery and subterfuge until they wake and find themselves under the command of the Order of Desolation. These Hellspeakers train in the art known as the Red Cant or Hell's Cant. By understanding their enemy and through weaving subtle sorceries into normal speech, Hellspeakers can make their foes feel, think, or do nearly anything to accelerate Hell's victory.
Across the timescape, Hellspeakers enjoy a reputation as smiling rogues and swashbuckling villains. An asset in any negotiation, Hellspeakers know that in a world of lies, the truth can be as potent a weapon as steel.`,
      },
      {
        name: "Content Warning",
        level: 3,
        notes: `This subclass has themes of mental manipulation and mind control. Before choosing this subclass, please ensure everyone at the table is comfortable exploring these dark and harmful themes. And as always, we encourage the ongoing use of safety tools throughout your game.`,
      },
      {
        name: "Precepts of Deception",
        level: 3,
        description: `Hellspeakers swear an oath to Moloch when they join the Order of Desolation. By following these precepts, they infiltrate the farthest reaches of power and manipulate all under their influence.
My Voice Is a Weapon. Even when my enchantments fail, if my enemy can hear me, they are mine.
Doubt Is Certainty. I need not convince my enemy, only sow doubt and wait for it to bear fruit.
Trust Me. For each lie I utter, I tell the truth tenfold. One who always lies says nothing.
Never Tell the Same Lie Twice. An overused skill becomes too predictable. Keep moving, switch targets, keep them guessing.`,
      },
      {
        name: "Moloch's Blessing",
        level: 3,
        description: `When Moloch accepts you as his illrigger, you gain proficiency in the Persuasion or Deception skill (your choice). If you already have proficiency in the skill of your choice, your proficiency bonus is doubled for any ability check you make with that skill.
In addition, your Forked Tongue feature grants you an additional language (for a total of three at 3rd level and four at 9th level). Whenever you speak in a language gained by this feature, your devilish influence is subconsciously felt by creatures who can hear and understand you, granting you advantage on Charisma checks to influence those creatures.`,
      },
      {
        name: "Charm Enemy",
        level: 3,
        description: `When you use your bonus action to place a seal on a Humanoid, you can attempt to charm them. The target must succeed on a Charisma saving throw or be charmed by you for 1 hour or until you or your companions do anything harmful to them. While charmed, the target regards you as a friendly acquaintance. When the charmed condition ends, the target knows they were charmed by you.
When you use this bonus action, you can additionally burn one or more seals on one or more other interdicted Humanoids within 30 feet of you, attempting to charm those targets as well. After taking damage from the burned seals, each of those targets must succeed on a Charisma saving throw or be under the same charmed effect.
You can use this feature a number of times equal to your Charisma modifier (minimum of once), and you regain all expended uses when you finish a long rest.`,
      },
      {
        name: "Invoke Hell",
        level: 3,
        description: `You gain the following two Invoke Hell options:
Honey-Sweet Blades. When you make a weapon attack against an interdicted creature, you can gain advantage on that attack (no action required). If the attack hits, it becomes a critical hit.
Turncoat. As an action, you wield your manipulative tongue against your enemies. You choose a number of enemy creatures up to your proficiency bonus within 60 feet of you who can hear you. Each target must succeed on a Charisma saving throw or use their reaction to make a weapon attack against a single target of your choice. A creature affected by this feature can't attack themself.`,
      },
      {
        name: "Moloch's Interdiction",
        level: 7,
        description: `You learn the following additional interdict boons at the noted illrigger levels. Once you learn an interdict boon granted by this feature, you always know it, and it doesn't count against the number of interdict boons you know.`,
      },
      {
        name: "Incontrovertible (Passive)",
        level: 7,
        description: `Prerequisite: Level 18+ Illrigger (Hellspeaker)
Interdicted creatures have disadvantage on Wisdom and Charisma saving throws.`,
      },
      {
        name: "Red Cant",
        level: 7,
        description: `Prerequisite: Level 7+ Illrigger (Hellspeaker)
When you make a Charisma check, you can expend a seal to treat a d20 roll of 9 or lower as a 10.`,
      },
      {
        name: "Slippery Ploy",
        level: 7,
        description: `Prerequisite: Level 13+ Illrigger (Hellspeaker)
When a creature targets you with an attack, spell, or other magical effect, you can place a seal on them as a reaction and force the creature to make a Charisma saving throw. On a failed save, the creature must choose a new target or lose the attack or effect.`,
      },

      {
        name: "Intransigent",
        level: 11,
        description: `You and each creature of your choice within 10 feet of you are immune to the charmed condition while you are conscious.`,
      },
      {
        name: "Let's Make a Deal",
        level: 11,
        description: `You can offer your allies a deal—at a price, of course. As a bonus action, you choose one willing ally within 60 feet of you who can hear you.
Once within the next 10 minutes, the creature can choose to gain advantage on one attack roll or saving throw they make and can add a bonus equal to your proficiency bonus to the same roll. If this attack hits or this saving throw succeeds, the creature gains temporary hit points equal to your illrigger level. If this attack misses or this saving throw fails, the creature has disadvantage on the next attack roll or saving throw they make. This disadvantage can't be canceled out with advantage in any way. A creature can strike only one deal with you at a time.
You can use this feature a number of times equal to your proficiency bonus. You regain any expended uses when you finish a long rest.`,
      },
      {
        name: "Quid Pro Quo",
        level: 15,
        description: `You can whisper to the legions of Hell, ensnaring enemies and calling allies. As an action, you can attempt to banish a creature you can see within 30 feet of you. The target must succeed on a Charisma saving throw. On a failed save, the target is banished to the wastes of Hell for 1 minute, after which they return to the unoccupied space nearest to the one they left. A target banished in this way can repeat the saving throw at the end of each of their turns, ending the effect early on a success. A creature who succeeds on a saving throw against this effect becomes immune to your Quid Pro Quo for 24 hours.
Additionally, when a target is banished in this way, a devil jurist (from MCDM's Flee, Mortals!) or a horned devil (from the core rules) appears in their place. This devil acts as an ally to you and follows your commands until the banished creature is no longer banished, at which time the devil disappears.
Once you successfully banish a creature in this way, you can't use this feature again until you finish a long rest.`,
      },
    ],
  },
  {
    key: "painkiller",
    name: "Painkiller",
    source: "IllR",
    features: [
      {
        name: "",
        level: 3,
        description: `The heavily armored death troopers of Hell, Painkillers serve Dispater, leading from the front of every major infernal battle.
Dispater rules Dis, the City of War. When Hell invades another world, Dispater's army does the fighting and dying. His Painkillers are master strategists who lead from the front, inspiring terror and awe in their soldiers. The imperious Painkillers are full of pride and hubris, and they often obsess over their personal appearance.
Though among the most chivalrous of the illriggers, a Painkiller's gallantry is twisted. They accept and honor challenges to single combat, and swiftly punish any who try to interfere—but if losing, they don't hesitate to cheat, and if winning, they arrogantly toy with an enemy before finishing them.
In a moment of weakness or desperation, a ruler in another world might see their army facing certain defeat and call on Dispater. Ever eager to sow strife and discord, Dispater often responds to these pleas by sending a Painkiller to lead the desperate ruler's armies.`,
      },
      {
        name: "Precepts of Pride",
        level: 3,
        description: `Dispater's heavy shock troops must be effective battlefield commanders and quickly dispatch enemies. Painkillers follow precepts instructing them to lead Hell's armies and wage war against Good across the timescape.
Lead from the Front. I charge in at the front of every battle, inspiring my soldiers and terrifying my enemies.
Commander. Wherever I go, I command. I don't take orders from those who don't have the will to lead.
Victory at Any Cost. I respect the enemy leader and treat them honorably. But once swords are drawn, I use every trick in my arsenal to win, expecting them to do the same.
Soldiers Die. I care not for the lives of my soldiers, for they are resources I spend to secure my victory.`,
      },
      {
        name: "Dispater's Blessing",
        level: 3,
        description: `When Dispater accepts you as his illrigger, you gain proficiency with heavy armor.`,
      },
      {
        name: "Devastator",
        level: 3,
        description: `As an action, you invoke the authority of Dispater. You make a weapon attack and choose a number of willing creatures up to your proficiency bonus who you can see within 30 feet of you. Each creature you choose can use a reaction to make a weapon attack or cast a damage-dealing cantrip with a casting time of 1 action.
Once you use this action, you can't use it again until you finish a short or long rest.`,
      },
      {
        name: "Invoke Hell",
        level: 3,
        description: `You gain the following two Invoke Hell options:
Grand Strategist. You can order your allies to follow your formation (no action required). Choose one or more creatures within 60 feet of you who can hear you, up to a number of creatures equal to your proficiency bonus. Each target can immediately move up to half their speed without provoking opportunity attacks.
Punishment. When a creature damages you with an attack, you can use your reaction to force the attacker to make a Wisdom saving throw. On a failed save, the attacker takes necrotic damage equal to the damage they dealt you with the triggering attack. On a successful save, the attacker takes half as much damage.`,
      },
      {
        name: "Dispater's Interdiction",
        level: 7,
        description: `You learn the following additional interdict boons at the noted illrigger levels. Once you learn an interdict boon granted by this feature, you always know it, and it doesn't count against the number of interdict boons you know.`,
      },
      {
        name: "By the Throat",
        level: 7,
        description: `Prerequisite: Level 13+ Illrigger (Painkiller)
When you use a bonus action to place or move a seal on a creature who is no more than one size larger than you, they must succeed on a Wisdom saving throw or be restrained until the end of their next turn.`,
      },
      {
        name: "Dispater's Supremacy (Passive)",
        level: 7,
        description: `Prerequisite: Level 18+ Illrigger (Painkiller)
Your attacks against interdicted creatures score a critical hit on a roll of 18 through 20.`,
      },
      {
        name: "Telekinetic Seal",
        level: 7,
        description: `Prerequisite: Level 7+ Illrigger (Painkiller)
When a creature you can see moves within 5 feet of you, you can use your reaction to place a seal on them. When you do, the target must succeed on a Wisdom saving throw or be either pushed back 15 feet or knocked prone (your choice).`,
      },
      {
        name: "You Die on My Command!",
        level: 11,
        description: `When an ally within 30 feet of you who can hear you drops to 0 hit points without being killed outright, you can use your reaction to shout an order at them, causing them to drop to 1 hit point instead. Once you use this reaction, you can't do so again until you finish a short or long rest.`,
      },
      {
        name: "Deathstrike",
        level: 15,
        description: `When you hit an interdicted creature with a melee weapon attack, you can use your reaction to burn one of the seals on them to turn the hit into a critical hit. When you do, you also double the damage dice you roll for the burned seal.
You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
    ],
  },
  {
    key: "sanguine-knight",
    name: "Sanguine Knight",
    source: "IllR",
    features: [
      {
        name: "",
        level: 3,
        description: `The blood-knights of Hell, Sanguine Knights serve Sutekh, Lord of Blood. Their sorceries drain their enemies' life force, pouring this stolen vitality into infernal rituals to turn the tide of battle.
Sutekh rules Naraka, the City of Blood. Recognized as the greatest sorcerer in hell, he carries the title of High Sanguinary and rules from the Temple of Vitality. He is a master of blood magic, and his inner circle of priests and wizards are the Bloodliches, undead spellcasters whose corporeal forms turned to ash centuries ago and whose bodies are crafted from solid blood.
Sutekh's illriggers all belong to a cult known as the Chalice of Vitality. Knights of the Chalice drink deeply of their enemies' essence, draining it to power their magics. Other members of the Order of Desecration fear that the Sanguine Knights seek more than Sutekh's mere ascension to the Throne of Hell; some whisper that the Chalice secretly schemes to make Sutekh a god. This would, of course, be treason.`,
      },
      {
        name: "Content Warning",
        level: 3,
        notes: `This subclass deals with manipulating another creature's blood. Before choosing this subclass, please ensure everyone at your table is comfortable with this concept. And as always, we encourage the ongoing use of safety tools throughout your game.`,
      },
      {
        name: "Precepts of Blood",
        level: 3,
        description: `Sanguine Knights swear an oath to Sutekh when they join the Order of Desolation. These tenets swear them to wield profane blood magic, commanding loyalty and inflicting terror.
Their Strength Is Their Weakness. I target the strongest of my foes, for their vitality shall feed my victory.
Sin Demands Suffering. Opposing me is heresy. Before my enemies taste defeat, they must pay for their unbelief with agony.
Loyalty Rewarded. My boons lead my allies to depend on me—and on the bloodshed that empowers me.
Mercy Is Power. In granting succor to my allies, I prove how great my power is. Each time I restore life, it serves as a reminder of how quickly I can strip it away.`,
      },
      {
        name: "Exsanguinate",
        level: 3,
        description: `You can drain enemies to embolden your allies. Whenever you burn one or more seals on a creature who isn't a Construct or Undead, you can choose an ally you can see within 30 feet of you. That ally gains temporary hit points equal to the damage dealt by the seals to the interdicted creature.`,
      },
      {
        name: "Sutekh's Blessing",
        level: 3,
        description: `When Sutekh accepts you as his illrigger, he grants you access to his sacrilegious command of blood and life. You gain proficiency in the Religion skill.
In addition, as an action, you can expand your awareness of life around you. Until the end of your next turn, you can sense creatures who have blood within 120 feet of you without having to see them. This ability can penetrate most barriers, but is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt. You know the distance and direction of each creature, as well as the creature's type. You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
      {
        name: "Invoke Hell",
        level: 3,
        description: `You gain the following two Invoke Hell options:
Embolden Allies. As a bonus action, you restore a total number of hit points equal to five times your illrigger level, divided however you choose between yourself and other creatures within 30 feet of you.
Vitalize. You can flood your allies with invigorating vivacity (no action required). For 1 minute, each creature of your choice within 30 feet of you gains a bonus to ability checks equal to your proficiency bonus.`,
      },
      {
        name: "Sutekh's Interdiction",
        level: 7,
        description: `You learn the following additional interdict boons at the noted illrigger levels. Once you learn an interdict boon granted by this feature, you always know it, and it doesn't count against the number of interdict boons you know.`,
      },
      {
        name: "Blood for Blood (Passive)",
        level: 7,
        description: `Prerequisite: Level 18+ Illrigger (Sanguine Knight)
Whenever an ally takes damage from an interdicted creature, that interdicted creature takes necrotic damage equal to your proficiency bonus.`,
      },
      {
        name: "Foul Interchange",
        level: 7,
        description: `Prerequisite: Level 7+ Illrigger (Sanguine Knight)
As an action, you choose a creature you can see within 30 feet of you and expend a seal to end one of the following conditions afflicting them: blinded, charmed, dazed, deafened, frightened, paralyzed, or poisoned. Another creature you can see within 60 feet of you must succeed on a Constitution saving throw or suffer that same condition until the end of your next turn. If that creature is immune to the condition, they don't suffer the condition, but the condition ends for the original creature.`,
      },
      {
        name: "Sanguine Gift",
        level: 7,
        description: `Prerequisite: Level 13+ Illrigger (Sanguine Knight)
When a creature you can see within 30 feet of you regains hit points, you can expend a seal (no action required) and the creature regains additional hit points equal to your illrigger level.`,
      },

      {
        name: "Bloodstroke",
        level: 11,
        description: `The magic that shields your allies now also saps their enemies' strength. When an ally who has temporary hit points from your Exsanguinate feature is hit by a melee attack, the attacker takes cold, fire, or necrotic damage (your choice) equal to your illrigger level.`,
      },
      {
        name: "Haemal Exchange",
        level: 15,
        description: `You have mastered the ability to enervate enemies and endow allies. When an interdicted creature within 60 feet of you makes an attack roll or saving throw, you can use your reaction to burn one of the seals on them and transfer their power. The target must roll a d8 and subtract the number rolled from the triggering attack roll or saving throw.
You then empower an ally within 30 feet of you. The next time that ally makes an attack roll or saving throw, they roll a d8 and add the number rolled to the attack roll or saving throw.`,
      },
    ],
  },
  {
    key: "shadowmaster",
    name: "Shadowmaster",
    source: "IllR",
    features: [
      {
        name: "",
        level: 3,
        description: `The hidden assassins of Hell, Shadowmasters serve Belial and excel at stealth and disguise.
Belial rules Gehennom, the City of Darkness. He strives to rule Hell through poison, torture, and assassination. His illriggers strike from the shadows or use deception to earn high-ranking positions close to powerful rulers. Many Shadowmasters run networks of spies and assassins who have no idea of the infernal provenance of their leader.
Shadowmasters are sworn not to reveal their true allegiance, and if need be, they must take their own lives to fulfill this oath. Many Shadowmasters prepare elaborate plans for their own assassination so that, should they risk discovery, their assassination obscures the truth. Of course, these killers never learn they were hired by their deceased target.`,
      },
      {
        name: "Precepts of Shadow",
        level: 3,
        description: `Shadowmasters swear an oath to Belial when they join the Order of Desolation. These precepts commit them to serve Belial's foes as allies before revealing themselves as enemies.
Plans Within Plans. My enemies must never discover my true goals. If needed, I will sacrifice myself to protect my schemes.
Positions of Power. I control everything from the shadows by knowing who to deceive and where to hide in plain sight.
Power in Patience. I study my enemy and methodically build their trust. My loyalty must be unquestionable so my inevitable betrayal is unthinkable.
Hesitation Is Failure. Though I usually rely on agents, when the opportunity presents itself, I can unhesitatingly kill with efficiency and precision.`,
      },
      {
        name: "Marked for Death",
        level: 3,
        description: `You are particularly skilled against foes you mark for death. You have advantage on your first attack against an interdicted creature on each of your turns.`,
      },
      {
        name: "Strike from the Dark",
        level: 3,
        description: `You understand the power of striking from the shadows. Once per turn, when you hit an interdicted creature with a melee weapon attack and you have advantage on the attack roll, you can roll a number of d4s equal to your proficiency bonus and deal extra damage equal to the total you rolled. This damage increases by 1d4 if the target is in dim light or darkness.`,
      },
      {
        name: "Invoke Hell",
        level: 3,
        description: `You gain the following two Invoke Hell options:
Master of Disguise. As an action, you can cast the disguise self spell without expending a spell slot.
No Escape. As a bonus action, you can call on the shadows to entrap a creature you can see within 30 feet of you. The target must make a Charisma saving throw, made with disadvantage if they are in dim light or darkness. On a failed save, the target's speed is halved and they can't willingly move more than 30 feet away from you. This effect ends for the target if you are incapacitated or die or if the target is more than 30 feet away from you.`,
      },
      {
        name: "Belial's Interdiction",
        level: 7,
        description: `You learn the following additional interdict boons at the noted illrigger levels. Once you learn an interdict boon granted by this feature, you always know it, and it doesn't count against the number of interdict boons you know.`,
      },
      {
        name: "Dark Malediction (Passive)",
        level: 7,
        description: `Prerequisite: Level 18+ Illrigger (Shadowmaster)
Interdicted creatures radiate darkness in a 10-foot radius. Mundane sources of light can't illuminate this darkness, but creatures with darkvision can see through it. If any of this darkness overlaps with an area of light created by magic or psionics, the overlapping area of darkness is illuminated by the light.`,
      },
      {
        name: "Hell's Assassin (Passive)",
        level: 7,
        description: `Prerequisite: Level 13+ Illrigger (Shadowmaster)
Whenever you roll a 1 or 2 on a die to determine the damage of your seals or your weapon attacks against interdicted creatures, you can reroll the die and must use the new roll.`,
      },
      {
        name: "Veil of Lies",
        level: 7,
        description: `Prerequisite: Level 7+ Illrigger (Shadowmaster)
As a bonus action, you can expend a seal to become invisible for 10 minutes or until you attack or cast a spell.`,
      },
      {
        name: "Umbral Killer",
        level: 11,
        description: `Shadows are your companion, aiding you in your exploits. You gain the following benefits:
You gain darkvision out to 60 feet. If you already have darkvision, its range increases by 60 feet.`,
        list: [
          "Your movement speed increases by 10 feet.",
          "You have advantage on Dexterity (Stealth) checks made to hide.",
          "Whenever you make a Dexterity saving throw to take only half damage from an effect, you instead take no damage if you succeed on the saving throw, and half damage if you fail..",
          ,
        ],
      },
      {
        name: "Doomed to the Shadows",
        level: 15,
        description: `You have perfected your assassin's strike. The extra damage from your Strike from the Dark feature increases to a number of d8s equal to your proficiency bonus (instead of that number of d4s), and you deal an extra 2d8 damage if the target is in dim light or darkness (instead of an extra 1d4 damage).
In addition, when you deal damage using Strike from the Dark, you can use your reaction to burn a seal on the creature, causing them to be blinded for 1 minute instead of dealing the seal's damage.`,
      },
    ],
  },
];

export default illriggerSubclass;

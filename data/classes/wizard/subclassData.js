const wizardSubclass = [
  {
    key: "abjurer",
    name: "Abjurer",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Shield Companions and Banish Foes
Your study of magic is focused on spells that block, banish, or protect—ending harmful effects, banishing evil influences, and protecting the weak. Abjurers are sought when baleful spirits require exorcism, when locations must be guarded against magical spying, and when portals to other planes of existence must be closed. Adventuring parties value Abjurers for the protection they provide against a variety of hostile magic and other attacks`,
      },
      {
        name: "Abjuration Savant",
        level: 3,
        description: `Choose two Wizard spells from the Abjuration school, each of which must be no higher than level 2, and add them to your spellbook for free
In addition, whenever you gain access to a new level of spell slots in this class, you can add one Wizard spell from the Abjuration school to your spellbook for free. The chosen spell must be of a level for which you have spell slots`,
      },
      {
        name: "Arcane Ward",
        level: 3,
        description: `You can weave magic around yourself for protection. When you cast an Abjuration spell with a spell slot, you can simultaneously use a strand of the spell's magic to create a magical ward on yourself that lasts until you finish a Long Rest. The ward has a Hit Point maximum equal to twice your Wizard level plus your Intelligence modifier. Whenever you take damage, the ward takes the damage instead, and if you have any Resistances or Vulnerabilities, apply them before reducing the ward's Hit Points. If the damage reduces the ward to 0 Hit Points, you take any remaining damage. While the ward has 0 Hit Points, it can't absorb damage, but its magic remains
Whenever you cast an Abjuration spell with a spell slot, the ward regains a number of Hit Points equal to twice the level of the spell slot. Alternatively, as a Bonus Action, you can expend a spell slot, and the ward regains a number of Hit Points equal to twice the level of the spell slot expended
Once you create the ward, you can't create it again until you finish a Long Rest`,
      },
      {
        name: "Projected Ward",
        level: 6,
        description: `When a creature that you can see within 30 feet of yourself takes damage, you can take a Reaction to cause your Arcane Ward to absorb that damage. If this damage reduces the ward to 0 Hit Points, the warded creature takes any remaining damage. If that creature has any Resistances or Vulnerabilities, apply them before reducing the ward's Hit Points`,
      },
      {
        name: "Spell Breaker",
        level: 10,
        description: `You always have the Counterspell and Dispel Magic spells prepared. In addition, you can cast Dispel Magic as a Bonus Action, and you can add your Proficiency Bonus to its ability check
When you cast either spell with a spell slot, that slot isn't expended if the spell fails to stop a spell`,
      },
      {
        name: "Spell Resistance",
        level: 14,
        description: `You have Advantage on saving throws against spells, and you have Resistance to the damage of spells`,
      },
    ],
  },
  {
    key: "bladesinging",
    name: "Bladesinging",
    source: "TCE",
    features: [
      {
        name: "",
        level: 1,
        description: `Bladesingers master a tradition of wizardry that incorporates swordplay and dance. Originally created by elves, this tradition has been adopted by non-elf practitioners, who honor and expand on the elven ways
In combat, a bladesinger uses a series of intricate, elegant maneuvers that fend off harm and allow the bladesinger to channel magic into devastating attacks and a cunning defense. Many who have observed a bladesinger at work remember the display as one of the more beautiful experiences in their life, a glorious dance accompanied by a singing blade`,
      },
      {
        name: "Training in War and Song",
        level: 3,
        description: `When you adopt this tradition at 2nd level, you gain proficiency with light armor, and you gain proficiency with one type of one-handed melee weapon of your choice
You also gain proficiency in the Performance skill if you don't already have it`,
      },
      {
        name: "Bladesong",
        level: 3,
        description: `Starting at 2nd level, you can invoke a secret elven magic called the Bladesong, provided you aren't wearing medium or heavy armor or using a shield. It graces you with supernatural speed, agility, and focus
You can use a bonus action to start the Bladesong, which lasts for 1 minute. It ends early if you are incapacitated, if you don medium or heavy armor or a shield, or if you use two hands to make an attack with a weapon. You can also dismiss Bladesong at any time you choose (no action required)
While your bladesong is active, you gain the following benefits:`,
        list: [
          "You gain a bonus to your AC equal to your Intelligence modifier (minimum of +1)",
          "Your walking speed increases by 10 feet",
          "You have advantage on Dexterity (Acrobatics) checks",
          "You gain a bonus to any Constitution saving throws you make to maintain concentration on a spell. The bonus equals your Intelligence modifier (minimum of +1)",
          "You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses of it when you finish a long rest",
        ],
      },
      {
        name: "Bladesinger Styles",
        level: 3,
        notes: `From its inception as a martial and magical art, Bladesinging has been tied to the sword, more specifically the longsword. Yet many generations of study gave rise to various styles of Bladesinging based on the melee weapon employed. The techniques of these styles are passed from master to students in small schools, some of which have a building dedicated to instruction. Even the newest styles are hundreds of years old, but are still taught by their original creators due to the long lives of elves. Most schools of Bladesinging are in Evermeet or Evereska. One was started in Myth Drannor, but the city's destruction has scattered those students who survived
Styles of Bladesinging are broadly categorized based on the type of weapon employed, and each is associated with a category of animal. Within that style are specializations named after specific animal types, based on the types of spells employed, the techniques of the master, and the particular weapon used. Bladesingers who apprentice to a master typically get a tattoo of their chosen style's animal. Some bladesingers learn multiple styles and bear many tattoos, wearing a warning on their skin of their deadly skills
Cat. Styles that employ a sword belong to this family. The lion style, the eldest, trains practitioners in the use of the longsword and doesn't favor any particular type of spells. Leopard style focuses on the shortsword and spells of illusion and stealth. Red tiger, a style just three centuries old, has its bladesingers using the scimitar in a whirling dance of defense from which they launch into sudden leaps and attacks
Bird. Styles that focus on the use of a hafted weapon, such as an axe or hammer, have been grouped together as bird styles, yet vary wildly. All relatively new styles, they use weapons not typically favored by elves. Eagle-style bladesingers use small handaxes, and many maneuvers in the style focus on fluid ways to throw the weapon and draw a new one. Raven style uses a war pick, and spells associated with it grant the bladesinger more agility in combat
Snake. Practitioners of these styles use a flail, chain, or whip. Viper style uses a whip, despite its inelegance as a weapon, and has almost as long a history as the lion style. Its masters punctuate their bladesong with a stunningly rapid rhythm of whip cracks, which can keep many foes at bay and allow the bladesinger space to cast the cruel spells of poison and disease favored by the style`,
      },
      {
        name: "Extra Attack",
        level: 6,
        description: `Starting at 6th level, you can attack twice, instead of once, whenever you take the Attack action on your turn. Moreover, you can cast one of your cantrips in place of one of those attacks`,
      },
      {
        name: "Song of Defense",
        level: 10,
        description: `Beginning at 10th level, you can direct your magic to absorb damage while your bladesong is active. When you take damage, you can use your reaction to expend one spell slot and reduce that damage to you by an amount equal to five times the spell's slot level`,
      },
      {
        name: "Song of Victory",
        level: 14,
        description: `Starting at 14th level, you add your Intelligence modifier (minimum of +1) to the damage of your melee weapon attacks while your Bladesong is active`,
      },
    ],
  },
  {
    key: "conjuration",
    name: "School of Conjuration",
    source: "PHB'14",
    features: [
      {
        name: "",
        level: 3,
        description: `As a conjurer, you favor spells that produce objects and creatures out of thin air. You can conjure billowing clouds of killing fog or summon creatures from elsewhere to fight on your behalf. As your mastery grows, you learn spells of transportation and can teleport yourself across vast distances, even to other planes of existence, in an instant`,
      },
      {
        name: "Conjuration Savant",
        level: 3,
        description: `Beginning when you select this school at 2nd level, the gold and time you must spend to copy a conjuration spell into your spellbook is halved`,
      },
      {
        name: "Minor Conjuration",
        level: 3,
        description: `Starting at 2nd level when you select this school, you can use your action to conjure up an inanimate object in your hand or on the ground in an unoccupied space that you can see within 10 feet of you. This object can be no larger than 3 feet on a side and weigh no more than 10 pounds, and its form must be that of a nonmagical object that you have seen. The object is visibly magical, radiating dim light out to 5 feet
The object disappears after 1 hour, when you use this feature again, if it takes any damage, or if it deals any damage`,
      },
      {
        name: "Benign Transposition",
        level: 6,
        description: `Starting at 6th level, you can use your action to teleport up to 30 feet to an unoccupied space that you can see. Alternatively, you can choose a space within range that is occupied by a Small or Medium creature. If that creature is willing, you both teleport, swapping places
Once you use this feature, you can't use it again until you finish a long rest or you cast a conjuration spell of 1st level or higher`,
      },
      {
        name: "Focused Conjuration",
        level: 10,
        description: `Beginning at 10th level, while you are concentrating on a conjuration spell, your concentration can't be broken as a result of taking damage`,
      },
      {
        name: "Durable Summons",
        level: 14,
        description: `Starting at 14th level, any creature that you summon or create with a conjuration spell has 30 temporary hit points`,
      },
    ],
  },
  {
    key: "diviner",
    name: "Diviner",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `The counsel of a Diviner is sought by those who want a clearer understanding of the past, present, and future. As a Diviner, you strive to part the veils of space, time, and consciousness. You work to master spells of discernment, remote viewing, supernatural knowledge, and foresight`,
      },
      {
        name: "Divination Savant",
        level: 3,
        description: `Choose two Wizard spells from the Divination school, each of which must be no higher than level 2, and add them to your spellbook for free
In addition, whenever you gain access to a new level of spell slots in this class, you can add one Wizard spell from the Divination school to your spellbook for free. The chosen spell must be of a level for which you have spell slots`,
      },
      {
        name: "Portent",
        level: 3,
        description: `Glimpses of the future begin to press on your awareness. Whenever you finish a Long Rest, roll two d20s and record the numbers rolled. You can replace any D20 Test made by you or a creature that you can see with one of these foretelling rolls. You must choose to do so before the roll, and you can replace a roll in this way only once per turn
Each foretelling roll can be used only once. When you finish a Long Rest, you lose any unused foretelling rolls`,
      },
      {
        name: "Expert Divination",
        level: 6,
        description: `Casting Divination spells comes so easily to you that it expends only a fraction of your spellcasting efforts. When you cast a Divination spell using a level 2+ spell slot, you regain one expended spell slot. The slot you regain must be of a level lower than the slot you expended and can't be higher than level 5`,
      },
      {
        name: "The Third Eye",
        level: 10,
        description: `You can increase your powers of perception. As a Bonus Action, choose one of the following benefits, which lasts until you start a Short or Long Rest. You can't use this feature again until you finish a Short or Long Rest
Darkvision. You gain Darkvision with a range of 120 feet
Greater Comprehension. You can read any language
See Invisibility. You can cast See Invisibility without expending a spell slot`,
      },
      {
        name: "Greater Portent",
        level: 14,
        description: `The visions in your dreams intensify and paint a more accurate picture in your mind of what is to come. Roll three d20s for your Portent feature rather than two`,
      },
    ],
  },
  {
    key: "enchantment",
    name: "School of Enchantment",
    source: "PHB'14",
    features: [
      {
        name: "",
        level: 3,
        description: `As a member of the School of Enchantment, you have honed your ability to magically entrance and beguile other people and monsters. Some enchanters are peacemakers who bewitch the violent to lay down their arms and charm the cruel into showing mercy. Others are tyrants who magically bind the unwilling into their service. Most enchanters fall somewhere in between`,
      },
      {
        name: "Enchantment Savant",
        level: 3,
        description: `Beginning when you select this school at 2nd level, the gold and time you must spend to copy an enchantment spell into your spellbook is halved`,
      },
      {
        name: "Hypnotic Gaze",
        level: 3,
        description: `Starting at 2nd level when you choose this school, your soft words and enchanting gaze can magically enthrall another creature. As an action, choose one creature that you can see within 5 feet of you. If the target can see or hear you, it must succeed on a Wisdom saving throw against your wizard spell save DC or be charmed by you until the end of your next turn. The charmed creature's speed drops to 0, and the creature is incapacitated and visibly dazed
On subsequent turns, you can use your action to maintain this effect, extending its duration until the end of your next turn. However, the effect ends if you move more than 5 feet away from the creature, if the creature can neither see nor hear you, or if the creature takes damage
Once the effect ends, or if the creature succeeds on its initial saving throw against this effect, you can't use this feature on that creature again until you finish a long rest`,
      },
      {
        name: "Instinctive Charm",
        level: 6,
        description: `Beginning at 6th level, when a creature you can see within 30 feet of you makes an attack roll against you, you can use your reaction to divert the attack, provided that another creature is within the attack's range. The attacker must make a Wisdom saving throw against your wizard spell save DC. On a failed save, the attacker must target the creature that is closest to it, not including you or itself. If multiple creatures are closest, the attacker chooses which one to target. On a successful save, you can't use this feature on the attacker again until you finish a long rest
You must choose to use this feature before knowing whether the attack hits or misses. Creatures that can't be charmed are immune to this effect`,
      },
      {
        name: "Split Enchantment",
        level: 10,
        description: `Starting at 10th level, when you cast an enchantment spell of 1st level or higher that targets only one creature, you can have it target a second creature`,
      },
      {
        name: "Alter Memories",
        level: 14,
        description: `At 14th level, you gain the ability to make a creature unaware of your magical influence on it. When you cast an enchantment spell to charm one or more creatures, you can alter one creature's understanding so that it remains unaware of being charmed
Additionally, once before the spell expires, you can use your action to try to make the chosen creature forget some of the time it spent charmed. The creature must succeed on an Intelligence saving throw against your wizard spell save DC or lose a number of hours of its memories equal to 1 + your Charisma modifier (minimum of 1). You can make the creature forget less time, and the amount of time can't exceed the duration of your enchantment spell`,
      },
    ],
  },
  {
    key: "evoker",
    name: "Evoker",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Your studies focus on magic that creates powerful elemental effects such as bitter cold, searing flame, rolling thunder, crackling lightning, and burning acid. Some Evokers find employment in military forces, serving as artillery to blast armies from afar. Others use their power to protect others, while some seek their own gain`,
      },
      {
        name: "Evocation Savant",
        level: 3,
        description: `Choose two Wizard spells from the Evocation school, each of which must be no higher than level 2, and add them to your spellbook for free
In addition, whenever you gain access to a new level of spell slots in this class, you can add one Wizard spell from the Evocation school to your spellbook for free. The chosen spell must be of a level for which you have spell slots`,
      },
      {
        name: "Potent Cantrip",
        level: 3,
        description: `Your damaging cantrips affect even creatures that avoid the brunt of the effect. When you cast a cantrip at a creature and you miss with the attack roll or the target succeeds on a saving throw against the cantrip, the target takes half the cantrip's damage (if any) but suffers no additional effect from the cantrip`,
      },
      {
        name: "Sculpt Spells",
        level: 6,
        description: `You can create pockets of relative safety within the effects of your evocations. When you cast an Evocation spell that affects other creatures that you can see, you can choose a number of them equal to 1 plus the spell's level. The chosen creatures automatically succeed on their saving throws against the spell, and they take no damage if they would normally take half damage on a successful save`,
      },
      {
        name: "Empowered Evocation",
        level: 10,
        description: `Whenever you cast a Wizard spell from the Evocation school, you can add your Intelligence modifier to one damage roll of that spell`,
      },
      {
        name: "Overchannel",
        level: 14,
        description: `You can increase the power of your spells. When you cast a Wizard spell with a spell slot of levels 1–5 that deals damage, you can deal maximum damage with that spell on the turn you cast it
The first time you do so, you suffer no adverse effect. If you use this feature again before you finish a Long Rest, you take 2d12 Necrotic damage for each level of the spell slot immediately after you cast it. This damage ignores Resistance and Immunity
Each time you use this feature again before finishing a Long Rest, the Necrotic damage per spell level increases by 1d12`,
      },
    ],
  },
  {
    key: "illusionist",
    name: "Illusionist",
    source: "PHB'14",
    features: [
      {
        name: "",
        level: 3,
        description: `You specialize in magic that dazzles the senses and tricks the mind, and the illusions you craft make the impossible seem real`,
      },
      {
        name: "Illusion Savant",
        level: 3,
        description: `Choose two Wizard spells from the Illusion school, each of which must be no higher than level 2, and add them to your spellbook for free
In addition, whenever you gain access to a new level of spell slots in this class, you can add one Wizard spell from the Illusion school to your spellbook for free. The chosen spell must be of a level for which you have spell slots`,
      },
      {
        name: "Improved Illusions",
        level: 3,
        description: `You can cast Illusion spells without providing Verbal components, and if an Illusion spell you cast has a range of 10+ feet, the range increases by 60 feet
You also know the Minor Illusion cantrip. If you already know it, you learn a different Wizard cantrip of your choice. The cantrip doesn't count against your number of cantrips known. You can create both a sound and an image with a single casting of Minor Illusion, and you can cast it as a Bonus Action`,
      },
      {
        name: "Phantasmal Creatures",
        level: 6,
        description: `You always have the Summon Beast and Summon Fey spells prepared. Whenever you cast either spell, you can change its school to Illusion, which causes the summoned creature to appear spectral. You can cast the Illusion version of each spell without expending a spell slot, but casting it without a slot halves the creature's Hit Points. Once you cast either spell without a spell slot, you must finish a Long Rest before you can cast the spell in that way again`,
      },
      {
        name: "Illusory Self",
        level: 10,
        description: `When a creature hits you with an attack roll, you can take a Reaction to interpose an illusory duplicate of yourself between the attacker and yourself. The attack automatically misses you, then the illusion dissipates
Once you use this feature, you can't use it again until you finish a Short or Long Rest. You can also restore your use of it by expending a level 2+ spell slot (no action required)`,
      },
      {
        name: "Illusory Reality",
        level: 14,
        description: `You have learned to weave shadow magic into your illusions to give them a semi-reality. When you cast an Illusion spell with a spell slot, you can choose one inanimate, nonmagical object that is part of the illusion and make that object real. You can do this on your turn as a Bonus Action while the spell is ongoing. The object remains real for 1 minute, during which it can't deal damage or give any conditions. For example, you can create an illusion of a bridge over a chasm and then make it real and cross it`,
      },
    ],
  },
  {
    key: "necromancy",
    name: "School of Necromancy",
    source: "PHB'14",
    features: [
      {
        name: "",
        level: 3,
        description: `The School of Necromancy explores the cosmic forces of life, death, and undeath. As you focus your studies in this tradition, you learn to manipulate the energy that animates all living things. As you progress, you learn to sap the life force from a creature as your magic destroys its body, transforming that vital energy into magical power you can manipulate
Most people see necromancers as menacing, or even villainous, due to the close association with death. Not all necromancers are evil, but the forces they manipulate are considered taboo by many societies`,
      },
      {
        name: "Necromancy Savant",
        level: 3,
        description: `Beginning when you select this school at 2nd level, the gold and time you must spend to copy a necromancy spell into your spellbook is halved`,
      },
      {
        name: "Grim Harvest",
        level: 3,
        description: `At 2nd level, you gain the ability to reap life energy from creatures you kill with your spells. Once per turn when you kill one or more creatures with a spell of 1st level or higher, you regain hit points equal to twice the spell's level, or three times its level if the spell belongs to the School of Necromancy. You don't gain this benefit for killing constructs or undead`,
      },
      {
        name: "Undead Thralls",
        level: 6,
        description: `At 6th level, you add the animate dead spell to your spellbook if it is not there already. When you cast animate dead, you can target one additional corpse or pile of bones, creating another zombie or skeleton, as appropriate
Whenever you create an undead using a necromancy spell, it has additional benefits`,
        list: [
          "The creature's hit point maximum is increased by an amount equal to your wizard level",
          "The creature adds your proficiency bonus to its weapon damage rolls",
        ],
      },
      {
        name: "Inured to Undeath",
        level: 10,
        description: `Beginning at 10th level, you have resistance to necrotic damage, and your hit point maximum can't be reduced. You have spent so much time dealing with undead and the forces that animate them that you have become inured to some of their worst effects`,
      },
      {
        name: "Command Undead",
        level: 14,
        description: `Starting at 14th level, you can use magic to bring undead under your control, even those created by other wizards. As an action, you can choose one undead that you can see within 60 feet of you. That creature must make a Charisma saving throw against your wizard spell save DC. If it succeeds, you can't use this feature on it again. If it fails, it becomes friendly to you and obeys your commands until you use this feature again
Intelligent undead are harder to control in this way. If the target has an Intelligence of 8 or higher, it has advantage on the saving throw. If it fails the saving throw and has an Intelligence of 12 or higher, it can repeat the saving throw at the end of every hour until it succeeds and breaks free`,
      },
    ],
  },
  {
    key: "scribes",
    name: "Order of Scribes",
    source: "TCE",
    features: [
      {
        name: "",
        level: 3,
        description: `Magic of the book-that's what many folk call wizardry. The name is apt, given how much time wizards spend poring over tomes and penning theories about the nature of magic. It's rare to see wizards traveling without books and scrolls sprouting from their bags, and a wizard would go to great lengths to plumb an archive of ancient knowledge
Among wizards, the Order of Scribes is the most bookish. It takes many forms in different worlds, but its primary mission is the same everywhere: recording magical discoveries so that wizardry can flourish. And while all wizards value spellbooks, a wizard in the Order of Scribes magically awakens their book, turning it into a trusted companion. All wizards study books, but a wizardly scribe talks to theirs`,
      },
      {
        name: "Wizardly Quill",
        level: 3,
        description: `As a bonus action, you can magically create a Tiny quill in your free hand. The magic quill has the following properties`,
        list: [
          "The quill doesn't require ink. When you write with it, it produces ink in a color of your choice on the writing surface",
          "The time you must spend to copy a spell into your spellbook equals 2 minutes per spell level if you use the quill for the transcription",
          "You can erase anything you write with the quill if you wave the feather over the text as a bonus action, provided the text is within 5 feet of you",
        ],
        description2: `This quill disappears if you create another one or if you die`,
      },
      {
        name: "Awakened Spellbook",
        level: 3,
        description: `Using specially prepared inks and ancient incantations passed down by your wizardly order, you have awakened an arcane sentience within your spellbook
While you are holding the book, it grants you the following benefits`,
        list: [
          "You can use the book as a spellcasting focus for your wizard spells",
          "When you cast a wizard spell with a spell slot, you can temporarily replace its damage type with a type that appears in another spell in your spellbook, which magically alters the spell's formula for this casting only. The latter spell must be of the same level as the spell slot you expend",
          "When you cast a wizard spell as a ritual, you can use the spell's normal casting time, rather than adding 10 minutes to it. Once you use this benefit, you can't do so again until you finish a long rest",
        ],
        description2: `If necessary, you can replace the book over the course of a short rest by using your Wizardly Quill to write arcane sigils in a blank book or a magic spellbook to which you're attuned. At the end of the rest, your spellbook's consciousness is summoned into the new book, which the consciousness transforms into your spellbook, along with all its spells. If the previous book still existed somewhere, all the spells vanish from its pages`,
      },
      {
        name: "Manifest Mind",
        level: 6,
        description: `You can conjure forth the mind of your Awakened Spellbook. As a bonus action while the book is on your person, you can cause the mind to manifest as a Tiny spectral object, hovering in an unoccupied space of your choice within 60 feet of you. The spectral mind is intangible and doesn't occupy its space, and it sheds dim light in a 10-foot radius. It looks like a ghostly tome, a cascade of text, or a scholar from the past (your choice)
While manifested, the spectral mind can hear and see, and it has darkvision with a range of 60 feet. The mind can telepathically share with you what it sees and hears (no action required)
Whenever you cast a wizard spell on your turn, you can cast it as if you were in the spectral mind's space, instead of your own, using its senses. You can do so a number of times per day equal to your proficiency bonus, and you regain all expended uses when you finish a long rest
As a bonus action, you can cause the spectral mind to hover up to 30 feet to an unoccupied space that you or it can see. It can pass through creatures but not objects
The spectral mind stops manifesting if it is ever more than 300 feet away from you, if someone casts dispel magic on it, if the Awakened Spellbook is destroyed, if you die, or if you dismiss the spectral mind as a bonus action
Once you conjure the mind, you can't do so again until you finish a long rest, unless you expend a spell slot of any level to conjure it again`,
      },
      {
        name: "Master Scrivener",
        level: 10,
        description: `Whenever you finish a long rest, you can create one magic scroll by touching your Wizardly Quill to a blank piece of paper or parchment and causing one spell from your Awakened Spellbook to be copied onto the scroll. The spellbook must be within 5 feet of you when you make the scroll
The chosen spell must be of 1st or 2nd level and must have a casting time of 1 action. Once in the scroll, the spell's power is enhanced, counting as one level higher than normal. You can cast the spell from the scroll by reading it as an action. The scroll is unintelligible to anyone else, and the spell vanishes from the scroll when you cast it or when you finish your next long rest
You are also adept at crafting spell scrolls, which are described in the treasure chapter of the Dungeon Master's Guide. The gold and time you must spend to make such a scroll are halved if you use your Wizardly Quill`,
      },
      {
        name: "One with the Word",
        level: 14,
        description: `Your connection to your Awakened Spellbook has become so profound that your soul has become entwined with it. While the book is on your person, you have advantage on all Intelligence (Arcana) checks, as the spellbook helps you remember magical lore
Moreover, if you take damage while your spellbook's mind is manifested, you can prevent all of that damage to you by using your reaction to dismiss the spectral mind, using its magic to save yourself. Then roll 3d6. The spellbook temporarily loses spells of your choice that have a combined spell level equal to that roll or higher. For example, if the roll's total is 9, spells vanish from the book that have a combined level of at least 9, which could mean one 9th-level spell, three 3rd-level spells, or some other combination. If there aren't enough spells in the book to cover this cost, you drop to 0 hit points
Until you finish 1d6 long rests, you are incapable of casting the lost spells, even if you find them on a scroll or in another spellbook. After you finish the required number of rests, the spells reappear in the spellbook
Once you use this reaction, you can't do so again until you finish a long rest`,
      },
    ],
  },
  {
    key: "transmutation",
    name: "School of Transmutation",
    source: "PHB'14",
    features: [
      {
        name: "",
        level: 3,
        description: `You are a student of spells that modify energy and matter. To you, the world is not a fixed thing, but eminently mutable, and you delight in being an agent of change. You wield the raw stuff of creation and learn to alter both physical forms and mental qualities. Your magic gives you the tools to become a smith on reality's forge
Some transmuters are tinkerers and pranksters, turning people into toads and transforming copper into silver for fun and occasional profit. Others pursue their magical studies with deadly seriousness, seeking the power of the gods to make and destroy worlds`,
      },
      {
        name: "Transmutation Savant",
        level: 3,
        description: `Beginning when you select this school at 2nd level, the gold and time you must spend to copy a transmutation spell into your spellbook is halved`,
      },
      {
        name: "Minor Alchemy",
        level: 3,
        description: `Starting at 2nd level when you select this school, you can temporarily alter the physical properties of one nonmagical object, changing it from one substance into another. You perform a special alchemical procedure on one object composed entirely of wood, stone (but not a gemstone), iron, copper, or silver, transforming it into a different one of those materials. For each 10 minutes you spend performing the procedure, you can transform up to 1 cubic foot of material. After 1 hour, or until you lose your concentration (as if you were concentrating on a spell), the material reverts to its original substance`,
      },
      {
        name: "Transmuter's Stone",
        level: 6,
        description: `Starting at 6th level, you can spend 8 hours creating a transmuter's stone that stores transmutation magic. You can benefit from the stone yourself or give it to another creature. A creature gains a benefit of your choice as long as the stone is in the creature's possession. When you create the stone, choose the benefit from the following options`,
        list: [
          "Darkvision out to a range of 60 feet, as described in chapter 8",
          "An increase to speed of 10 feet while the creature is unencumbered",
          "Proficiency in Constitution saving throws",
          "Resistance to acid, cold, fire, lightning, or thunder damage (your choice whenever you choose this benefit)",
        ],
        description2: `Each time you cast a transmutation spell of 1st level or higher, you can change the effect of your stone if the stone is on your person
If you create a new transmuter's stone, the previous one ceases to function`,
      },
      {
        name: "Shapechanger",
        level: 10,
        description: `At 10th level, you add the polymorph spell to your spellbook, if it is not there already. You can cast polymorph without expending a spell slot. When you do so, you can target only yourself and transform into a beast whose challenge rating is 1 or lower
Once you cast polymorph in this way, you can't do so again until you finish a short or long rest, though you can still cast it normally using an available spell slot`,
      },
      {
        name: "Master Transmuter",
        level: 14,
        description: `Starting at 14th level, you can use your action to consume the reserve of transmutation magic stored within your transmuter's stone in a single burst. When you do so, choose one of the following effects. Your transmuter's stone is destroyed and can't be remade until you finish a long rest
Major Transformation. You can transmute one nonmagical object—no larger than a 5-foot cube—into another nonmagical object of similar size and mass and of equal or lesser value. You must spend 10 minutes handling the object to transform it
Panacea. You remove all curses, diseases, and poisons affecting a creature that you touch with the transmuter's stone. The creature also regains all its hit points
Restore Life. You cast the raise dead spell on a creature you touch with the transmuter's stone, without expending a spell slot or needing to have the spell in your spellbook
Restore Youth. You touch the transmuter's stone to a willing creature, and that creature's apparent age is reduced by 3d10 years, to a minimum of 13 years. This effect doesn't extend the creature's lifespan`,
      },
    ],
  },
  {
    key: "war",
    name: "War Magic",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `War Magic
A variety of arcane colleges specialize in training wizards for war. The tradition of War Magic blends principles of evocation and abjuration, rather than specializing in either of those schools. It teaches techniques that empower a caster's spells, while also providing methods for wizards to bolster their own defenses
Followers of this tradition are known as war mages. They see their magic as both a weapon and armor, a resource superior to any piece of steel. War mages act fast in battle, using their spells to seize tactical control of a situation. Their spells strike hard, while their defensive skills foil their opponents' attempts to counterattack. War mages are also adept at turning other spellcasters' magical energy against them
In great battles, a war mage often works with evokers, abjurers, and other types of wizards. Evokers, in particular, sometimes tease war mages for splitting their attention between offense and defense. A war mage's typical response: "What good is being able to throw a mighty fireball if I die before I can cast it?"`,
      },
      {
        name: "Arcane Deflection",
        level: 3,
        description: `At 2nd level, you have learned to weave your magic to fortify yourself against harm. When you are hit by an attack or you fail a saving throw, you can use your reaction to gain a +2 bonus to your AC against that attack or a +4 bonus to that saving throw
When you use this feature, you can't cast spells other than cantrips until the end of your next turn`,
      },
      {
        name: "Tactical Wit",
        level: 3,
        description: `Starting at 2nd level, your keen ability to assess tactical situations allows you to act quickly in battle. You can give yourself a bonus to your initiative rolls equal to your Intelligence modifier`,
      },
      {
        name: "Power Surge",
        level: 6,
        description: `Starting at 6th level, you can store magical energy within yourself to later empower your damaging spells. In its stored form, this energy is called a power surge
You can store a maximum number of power surges equal to your Intelligence modifier (minimum of one). Whenever you finish a long rest, your number of power surges resets to one. Whenever you successfully end a spell with dispel magic or counterspell, you gain one power surge, as you steal magic from the spell you foiled. If you end a short rest with no power surges, you gain one power surge
Once per turn when you deal damage to a creature or object with a wizard spell, you can spend one power surge to deal extra force damage to that target. The extra damage equals half your wizard level`,
      },
      {
        name: "Durable Magic",
        level: 10,
        description: `Beginning at 10th level, the magic you channel helps ward off harm. While you maintain concentration on a spell, you have a +2 bonus to AC and all saving throws`,
      },
      {
        name: "Deflecting Shroud",
        level: 14,
        description: `At 14th level, your Arcane Deflection becomes infused with deadly magic. When you use your Arcane Deflection feature, you can cause magical energy to arc from you. Up to three creatures of your choice that you can see within 60 feet of you each take force damage equal to half your wizard level`,
      },
    ],
  },
];

export default wizardSubclass;

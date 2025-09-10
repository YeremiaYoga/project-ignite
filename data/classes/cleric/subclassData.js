const clericSubclass = [
  {
    key: "arcana",
    name: "Arcana Domain",
    source: "SCAG",
    features: [
      {
        level: 3,
        title: "",
        description: `Magic is an energy that suffuses the multiverse and that fuels both destruction and creation. Gods of the Arcana domain know the secrets and potential of magic intimately. For some of these gods, magical knowledge is a great responsibility that comes with a special understanding of the nature of reality. Other gods of Arcana see magic as pure power, to be used as its wielder sees fit.
The gods of this domain are often associated with knowledge, as learning and arcane power tend to go hand-in-hand. In the Realms, deities of this domain include Azuth and Mystra, as well as Corellon Larethian of the elven pantheon. In other worlds, this domain includes Hecate, Math Mathonwy, and Isis; the triple moon gods of Solinari, Lunitari, and Nuitari of Krynn; and Boccob, Vecna, and Wee Jas of Greyhawk.
At each indicated cleric level, add the listed spells to your spells prepared. They do not count towards your limit.`,
      },
      {
        level: 3,
        title: "Arcana Domain Spells",
        table: {
          headers: ["Cleric Level", "Spells"],
          rows: [
            ["1st", "detect magic, magic missile"],
            ["3rd", "magic weapon, Nystul's magic aura"],
            ["5th", "dispel magic, magic circle"],
            ["7th", "arcane eye, Leomund's secret chest"],
            ["9th", "planar binding, teleportation circle"],
          ],
        },
      },
      {
        level: 3,
        title: "Arcane Initiate",
        description: `When you choose this domain at 1st level, you gain proficiency in the Arcana skill, and you gain two cantrips of your choice from the wizard spell list. For you, these cantrips count as cleric cantrips.`,
      },
      {
        level: 3,
        title: "Channel Divinity: Arcane Abjuration",
        description: `Starting at 2nd level, you can use your Channel Divinity to abjure otherworldly creatures.
As an action, you present your holy symbol, and one celestial, elemental, fey, or fiend of your choice that is within 30 feet of you must make a Wisdom saving throw, provided that the creature can see or hear you. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage.
A turned creature must spend its turns trying to move as far away from you as it can, and it can't willingly end its move in a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there's nowhere to move, then the creature can use the Dodge action.
After you reach 5th level, when a creature fails its saving throw against your Arcane Abjuration feature, the creature is banished for 1 minute (as in the banishment spell, no concentration required) if it isn't on its plane of origin, and its challenge rating is at or below a certain threshold, as shown below.
Arcane Banishment
`,
        table: {
          headers: ["Cleric Level", "Banishes Creatures of CR..."],
          rows: [
            ["5th", "1/2 or lower"],
            ["8th", "1 or lower"],
            ["11th", "2 or lower"],
            ["14th", "3 or lower"],
            ["17th", "4 or lower"],
          ],
        },
      },

      {
        level: 6,
        title: "Spell Breaker",
        description: `Starting at 6th level, when you restore hit points to an ally with a spell of 1st level or higher, you can also end one spell of your choice on that creature. The level of the spell you end must be equal to or lower than the level of the spell slot you use to cast the healing spell.`,
      },
      {
        level: 17,
        title: "Arcane Mastery",
        description: `At 17th level, you choose four spells from the Wizard spell list, one from each of the following levels: 6th, 7th, 8th, and 9th. You add them to your list of domain spells. Like your other domain spells, they are always prepared and count as cleric spells for you.`,
      },
    ],
  },
  {
    key: "death",
    name: "Death Domain",
    source: "DMG'14",
    features: [
      {
        level: 3,
        title: "",
        description: `The Death domain is concerned with the forces that cause death, as well as the negative energy that gives rise to undead creatures. Deities such as Chemosh, Myrkul, and Wee Jas are patrons of necromancers, death knights, liches, mummy lords, and vampires. Gods of the Death domain also embody murder (Anubis, Bhaal, and Pyremius), pain (Iuz or Loviatar), disease or poison (Incabulos, Talona, or Morgion), and the underworld (Hades and Hel).
At each indicated cleric level, add the listed spells to your spells prepared. They do not count towards your limit.`,
      },
      {
        level: 3,
        title: "Death Domain Spells",
        table: {
          headers: ["Cleric Level", "Spells"],
          rows: [
            ["1st", "false life, ray of sickness"],
            ["3rd", "blindness/deafness, ray of enfeeblement"],
            ["5th", "animate dead, vampiric touch"],
            ["7th", "blight, death ward"],
            ["9th", "antilife shell, cloudkill"],
          ],
        },
      },
      {
        level: 3,
        title: "Bonus Proficiency",
        description: `When the cleric chooses this domain at 1st level, he or she gains proficiency with martial weapons.`,
      },
      {
        level: 3,
        title: "Reaper",
        description: `At 1st level, the cleric learns one necromancy cantrip of his or her choice from any spell list. When the cleric casts a necromancy cantrip that normally targets only one creature, the spell can instead target two creatures within range and within 5 feet of each other.`,
      },
      {
        level: 3,
        title: "Channel Divinity: Touch of Death",
        description: `Starting at 2nd level, the cleric can use Channel Divinity to destroy another creature's life force by touch.
When the cleric hits a creature with a melee attack, the cleric can use Channel Divinity to deal extra necrotic damage to the target. The damage equals 5 + twice his or her cleric level.`,
      },
      {
        level: 6,
        title: "Inescapable Destruction",
        description: `Starting at 6th level, the cleric's ability to channel negative energy becomes more potent. Necrotic damage dealt by the character's cleric spells and Channel Divinity options ignores resistance to necrotic damage.`,
      },
      {
        level: 17,
        title: "Improved Reaper",
        description: `Starting at 17th level, when the cleric casts a Necromancy spell of 1st through 5th-level that targets only one creature, the spell can instead target two creatures within range and within 5 feet of each other. If the spell consumes its material components, the cleric must provide them for each target.`,
      },
    ],
  },
  {
    key: "forge",
    name: "Forge Domain",
    source: "XGE",
    features: [
      {
        level: 3,
        title: "",
        description: `The gods of the forge are patrons of artisans who work with metal, from a humble blacksmith who keeps a village in horseshoes and plow blades to the mighty elf artisan whose diamond-tipped arrows of mithral have felled demon lords. The gods of the forge teach that, with patience and hard work, even the most intractable metal can be transformed from a lump of ore to a beautifully wrought object. Clerics of these deities search for objects lost to the forces of darkness, liberate mines overrun by orcs, and uncover rare and wondrous materials necessary to create potent magic items. Followers of these gods take great pride in their work, and they are willing to craft and use heavy armor and powerful weapons to protect them. Deities of this domain include Gond, Reorx, Onatar, Moradin, Hephaestus, and Goibhniu.
At each indicated cleric level, add the listed spells to your spells prepared.`,
      },
      {
        level: 3,
        title: "Forge Domain Spells",
        table: {
          headers: ["Cleric Level", "Spells"],
          rows: [
            ["1st", "identify, searing smite"],
            ["3rd", "heat metal, magic weapon"],
            ["5th", "elemental weapon, protection from energy"],
            ["7th", "fabricate, wall of fire"],
            ["9th", "animate objects, creation"],
          ],
        },
      },
      {
        level: 3,
        title: "Bonus Proficiency",
        description: `When you choose this domain at 1st level, you gain proficiency with heavy armor and smith's tools.`,
      },
      {
        level: 3,
        title: "Blessing of the Forge",
        description: `At 1st level, you gain the ability to imbue magic into a weapon or armor. At the end of a long rest, you can touch one nonmagical object that is a suit of armor or a simple or martial weapon. Until the end of your next long rest or until you die, the object becomes a magic item, granting a +1 bonus to AC if it's armor or a +1 bonus to attack and damage rolls if it's a weapon.
Once you use this feature, you can't use it again until you finish a long rest.`,
      },
      {
        level: 3,
        title: "Channel Divinity: Artisan's Blessing",
        description: `Starting at 2nd level, you can use your Channel Divinity to create simple items.
You conduct an hour-long ritual that crafts a nonmagical item that must include some metal: a simple or martial weapon, a suit of armor, ten pieces of ammunition, a set of tools, or another metal object (see chapter 5, "Equipment," in the Player's Handbook for examples of these items). The creation is completed at the end of the hour, coalescing in an unoccupied space of your choice on a surface within 5 feet of you.
The thing you create can be something that is worth no more than 100 gp. As part of this ritual, you must lay out metal, which can include coins, with a value equal to the creation. The metal irretrievably coalesces and transforms into the creation at the ritual's end, magically forming even nonmetal parts of the creation. The ritual can create a duplicate of a nonmagical item that contains metal, such as a key, if you possess the original during the ritual.`,
      },
      {
        level: 6,
        title: "Soul of the Forge",
        description: `Starting at 6th level, your mastery of the forge grants you special abilities:`,
        list: [
          "You gain resistance to fire damage.",
          "While wearing heavy armor, you gain a +1 bonus to AC.",
        ],
      },
      {
        level: 17,
        title: "Saint of Forge and Fire",
        description: `At 17th level, your blessed affinity with fire and metal becomes more powerful:`,
        list: [
          "You gain immunity to fire damage",
          "While wearing heavy armor, you have resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks.",
        ],
      },
    ],
  },
  {
    key: "grave",
    name: "Grave Domain",
    source: "XGE",
    features: [
      {
        level: 3,
        title: "",
        description: `Gods of the grave watch over the line between life and death. To these deities, death and the afterlife are a foundational part of the multiverse. To desecrate the peace of the dead is an abomination. Deities of the grave include Kelemvor, Wee Jas, the ancestral spirits of the Undying Court, Hades, Anubis, and Osiris. Followers of these deities seek to put wandering spirits to rest, destroy the undead, and ease the suffering of the dying. Their magic also allows them to stave off death for a time, particularly for a person who still has some great work to accomplish in the world. This is a delay of death, not a denial of it, for death will eventually get its due.

At each indicated cleric level, add the listed spells to your spells prepared.`,
      },
      {
        level: 3,
        title: "Grave Domain Spells",
        table: {
          headers: ["Cleric Level", "Spells"],
          rows: [
            ["1st", "bane, false life"],
            ["3rd", "gentle repose, ray of enfeeblement"],
            ["5th", "revivify, vampiric touch"],
            ["7th", "blight, death ward"],
            ["9th", "antilife shell, raise dead"],
          ],
        },
      },
      {
        level: 3,
        title: "Circle of Mortality",
        description: `At 1st level, you gain the ability to manipulate the line between life and death. When you would normally roll one or more dice to restore hit points with a spell to a creature at 0 hit points, you instead use the highest number possible for each die.

In addition, you learn the spare the dying cantrip, which doesn't count against the number of cleric cantrips you know. For you, it has a range of 30 feet, and you can cast it as a bonus action.`,
      },
      {
        level: 3,
        title: "Eyes of the Grave",
        description: `At 1st level, you gain the ability to occasionally sense the presence of the undead, whose existence is an insult to the natural cycle of life. As an action, you can open your awareness to magically detect undead. Until the end of your next turn, you know the location of any undead within 60 feet of you that isn't behind total cover and that isn't protected from divination magic. This sense doesn't tell you anything about a creature's capabilities or identity.

You can use this feature a number of times equal to your Wisdom modifier (minimum of once). You regain all expended uses when you finish a long rest.`,
      },
      {
        level: 3,
        title: "Channel Divinity: Path to the Grave",
        description: `Starting at 2nd level, you can use your Channel Divinity to mark another creature's life force for termination.
As an action, you choose one creature you can see within 30 feet of you, cursing it until the end of your next turn. The next time you or an ally of yours hits the cursed creature with an attack, the creature has vulnerability to all of that attack's damage, and then the curse ends.`,
      },
      {
        level: 6,
        title: "Sentinel at Death's Door",
        description: `At 6th level, you gain the ability to impede death's progress. As a reaction when you or a creature you can see within 30 feet of you suffers a critical hit, you can turn that hit into a normal hit. Any effects triggered by a critical hit are canceled.
You can use this feature a number of times equal to your Wisdom modifier (minimum of once). You regain all expended uses when you finish a long rest.`,
      },
      {
        level: 17,
        title: "Keeper of Souls",
        description: `Starting at 17th level, you can seize a trace of vitality from a parting soul and use it to heal the living. When an enemy you can see dies within 60 feet of you, you or one creature of your choice that is within 60 feet of you regains hit points equal to the enemy's number of Hit Dice. You can use this feature only if you aren't incapacitated. Once you use it, you can't do so again until the start of your next turn.`,
      },
    ],
  },
  {
    key: "knowledge",
    name: "Knowledge Domain",
    source: "PHB'14",
    features: [
      {
        level: 3,
        title: "",
        description: `The gods of knowledge—including Oghma, Boccob, Gilean, Aureon, and Thoth—value learning and understanding above all. Some teach that knowledge is to be gathered and shared in libraries and universities, or promote the practical knowledge of craft and invention. Some deities hoard knowledge and keep its secrets to themselves. And some promise their followers that they will gain tremendous power if they unlock the secrets of the multiverse. Followers of these gods study esoteric lore, collect old tomes, delve into the secret places of the earth, and learn all they can. Some gods of knowledge promote the practical knowledge of craft and invention, including smith deities like Gond, Reorx, Onatar, Moradin, Hephaestus, and Goibhniu.
At each indicated cleric level, you add the listed spells to your spells prepared.`,
      },
      {
        level: 3,
        title: "Knowledge Domain Spells",
        table: {
          headers: ["Cleric Level", "Spells"],
          rows: [
            ["1st", "command, identify"],
            ["3rd", "augury, suggestion"],
            ["5th", "nondetection, speak with dead"],
            ["7th", "arcane eye, confusion"],
            ["9th", "legend lore, scrying"],
          ],
        },
      },
      {
        level: 3,
        title: "Blessings of Knowledge",
        description: `At 1st level, you learn two languages of your choice. You also become proficient in your choice of two of the following skills: Arcana, History, Nature, or Religion.
Your proficiency bonus is doubled for any ability check you make that uses either of those skills.`,
      },
      {
        level: 3,
        title: "Channel Divinity: Knowledge of the Ages",
        description: `Starting at 2nd level, you can use your Channel Divinity to tap into a divine well of knowledge. As an action, you choose one skill or tool. For 10 minutes, you have proficiency with the chosen skill or tool.`,
      },
      {
        level: 6,
        title: "Channel Divinity: Read Thoughts",
        description: `At 6th level, you can use your Channel Divinity to read a creature's thoughts. You can then use your access to the creature's mind to command it.
As an action, choose one creature that you can see within 60 feet of you. That creature must make a Wisdom saving throw. If the creature succeeds on the saving throw, you can't use this feature on it again until you finish a long rest.
If the creature fails its save, you can read its surface thoughts (those foremost in its mind, reflecting its current emotions and what it is actively thinking about) when it is within 60 feet of you. This effect lasts for 1 minute.
During that time, you can use your action to end this effect and cast the suggestion spell on the creature without expending a spell slot. The target automatically fails its saving throw against the spell.`,
      },
      {
        level: 17,
        title: "Visions of the Past",
        description: `Starting at 17th level, you can call up visions of the past that relate to an object you hold or your immediate surroundings. You spend at least 1 minute in meditation and prayer, then receive dreamlike, shadowy glimpses of recent events. You can meditate in this way for a number of minutes equal to your Wisdom score and must maintain concentration during that time, as if you were casting a spell.
Once you use this feature, you can't use it again until you finish a short or long rest.
Object Reading. Holding an object as you meditate, you can see visions of the object's previous owner. After meditating for 1 minute, you learn how the owner acquired and lost the object, as well as the most recent significant event involving the object and that owner. If the object was owned by another creature in the recent past (within a number of days equal to your Wisdom score), you can spend 1 additional minute for each owner to learn the same information about that creature.
Area Reading. As you meditate, you see visions of recent events in your immediate vicinity (a room, street, tunnel, clearing, or the like, up to a 50-foot cube), going back a number of days equal to your Wisdom score. For each minute you meditate, you learn about one significant event, beginning with the most recent. Significant events typically involve powerful emotions, such as battles and betrayals, marriages and murders, births and funerals. However, they might also include more mundane events that are nevertheless important in your current situation.`,
      },
    ],
  },
  {
    key: "life",
    name: "Life Domain",
    source: "PHB'24",
    features: [
      {
        level: 3,
        title: "",
        description: `The Life Domain focuses on the positive energy that helps sustain all life in the multiverse. Clerics who tap into this domain are masters of healing, using that life force to cure many hurts.
Existence itself relies on the positive energy associated with this domain, so a Cleric of almost any religious tradition might choose it. This domain is particularly associated with agricultural deities, gods of healing or endurance, and gods of home and community. Religious orders of healing also seek the magic of this domain.`,
      },
      {
        level: 3,
        title: "Life Domain Spells",
        description: `Your connection to this divine domain ensures you always have certain spells ready. When you reach a Cleric level specified in the Life Domain Spells table, you thereafter always have the listed spells prepared.`,
        table: {
          headers: ["Cleric Level", "Prepared Spells"],
          rows: [
            ["3rd", "Aid, Bless, Cure Wounds, Lesser Restoration"],
            ["5th", "Mass Healing Word, Revivify"],
            ["7th", "Aura of Life, Death Ward"],
            ["9th", "Greater Restoration, Mass Cure Wounds"],
          ],
        },
      },
      {
        level: 3,
        title: "Disciple of Life",
        description: `When a spell you cast with a spell slot restores Hit Points to a creature, that creature regains additional Hit Points on the turn you cast the spell. The additional Hit Points equal 2 plus the spell slot's level.`,
      },
      {
        level: 3,
        title: "Preserve Life",
        description: `As a Magic action, you present your Holy Symbol and expend a use of your Channel Divinity to evoke healing energy that can restore a number of Hit Points equal to five times your Cleric level. Choose Bloodied creatures within 30 feet of yourself (which can include you), and divide those Hit Points among them. This feature can restore a creature to no more than half its Hit Point maximum.`,
      },
      {
        level: 6,
        title: "Blessed Healer",
        description: `The healing spells you cast on others heal you as well. Immediately after you cast a spell with a spell slot that restores Hit Points to one creature other than you, you regain Hit Points equal to 2 plus the spell slot's level.`,
      },
      {
        level: 17,
        title: "Supreme Healing",
        description: `When you would normally roll one or more dice to restore Hit Points to a creature with a spell or Channel Divinity, don't roll those dice for the healing; instead use the highest number possible for each die. For example, instead of restoring 2d6 Hit Points to a creature with a spell, you restore 12.`,
      },
    ],
  },
  {
    key: "light",
    name: "Light Domain",
    source: "PHB'24",
    features: [
      {
        level: 3,
        title: "",
        description: `The Light Domain emphasizes the divine power to bring about blazing fire and revelation. Clerics who wield this power are enlightened souls infused with radiance and the power of their deities' discerning vision, charged with chasing away lies and burning away darkness.

The Light Domain is associated with gods of truth, vigilance, beauty, insight, and renewal. Some of these gods are identified with the sun or as charioteers who guide the sun across the sky. Others are sentinels who pierce deception. Some are deities of beauty and artistry who teach that art is a vehicle for the soul's improvement.`,
      },
      {
        level: 3,
        title: "Light Domain Spells",
        description: `Your connection to this divine domain ensures you always have certain spells ready. When you reach a Cleric level specified in the Light Domain Spells table, you thereafter always have the listed spells prepared.`,
        table: {
          headers: ["Cleric Level", "Prepared Spells"],
          rows: [
            [
              "3rd",
              "Burning Hands, Faerie Fire, Scorching Ray, See Invisibility",
            ],
            ["5th", "Daylight, Fireball"],
            ["7th", "Arcane Eye, Wall of Fire"],
            ["9th", "Flame Strike, Scrying"],
          ],
        },
      },
      {
        level: 3,
        title: "Radiance of the Dawn",
        description: `As a Magic action, you present your Holy Symbol and expend a use of your Channel Divinity to emit a flash of light in a 30-foot Emanation originating from yourself. Any magical Darkness—such as that created by the Darkness spell—in that area is dispelled. Additionally, each creature of your choice in that area must make a Constitution saving throw, taking Radiant damage equal to 2d10 plus your Cleric level on a failed save or half as much damage on a successful one.`,
      },
      {
        level: 3,
        title: "Warding Flare",
        description: `When a creature that you can see within 30 feet of yourself makes an attack roll, you can take a Reaction to impose Disadvantage on the attack roll, causing light to flare before it hits or misses.
You can use this feature a number of times equal to your Wisdom modifier (minimum of once). You regain all expended uses when you finish a Long Rest.`,
      },
      {
        level: 6,
        title: "Improved Warding Flare",
        description: `You regain all expended uses of your Warding Flare when you finish a Short or Long Rest.
In addition, whenever you use Warding Flare, you can give the target of the triggering attack a number of Temporary Hit Points equal to 2d6 plus your Wisdom modifier.`,
      },
      {
        level: 17,
        title: "Corona of Light",
        description: `As a Magic action, you cause yourself to emit an aura of sunlight that lasts for 1 minute or until you dismiss it (no action required). You emit Bright Light in a 60-foot radius and Dim Light for an additional 30 feet. Your enemies in the Bright Light have Disadvantage on saving throws against your Radiance of the Dawn and any spell that deals Fire or Radiant damage.
You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.`,
      },
    ],
  },
  {
    key: "nature",
    name: "Nature Domain",
    source: "PHB'14",
    features: [
      {
        level: 3,
        title: "",
        description: `Gods of nature are as varied as the natural world itself, from inscrutable gods of the deep forests (such as Silvanus, Obad-Hai, Chislev, Balinor, and Pan) to friendly deities associated with particular springs and groves (such as Eldath). Druids revere nature as a whole and might serve one of these deities, practicing mysterious rites and reciting all-but-forgotten prayers in their own secret tongue. But many of these gods have clerics as well, champions who take a more active role in advancing the interests of a particular nature god. These clerics might hunt the evil monstrosities that despoil the woodlands, bless the harvest of the faithful, or wither the crops of those who anger their gods.

At each indicated cleric level, you add the listed spells to your spells prepared.`,
      },
      {
        level: 3,
        title: "Nature Domain Spells",
        table: {
          headers: ["Cleric Level", "Spells"],
          rows: [
            ["1st", "animal friendship, speak with animals"],
            ["3rd", "barkskin, spike growth"],
            ["5th", "plant growth, wind wall"],
            ["7th", "dominate beast, grasping vine"],
            ["9th", "insect plague, tree stride"],
          ],
        },
      },
      {
        level: 3,
        title: "Acolyte of Nature",
        description: `At 1st level, you learn one druid cantrip of your choice. This cantrip doesn't count against the number of cleric cantrips you know. You also gain proficiency in one of the following skills of your choice: Animal Handling, Nature, or Survival.`,
      },
      {
        level: 3,
        title: "Bonus Proficiency",
        description: `Also at 1st level, you gain proficiency with heavy armor.`,
      },
      {
        level: 3,
        title: "Channel Divinity: Charm Animals and Plants",
        description: `Starting at 2nd level, you can use your Channel Divinity to charm animals and plants.
As an action, you present your holy symbol and invoke the name of your deity. Each beast or plant creature that can see you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is charmed by you for 1 minute or until it takes damage. While it is charmed by you, it is friendly to you and other creatures you designate.`,
      },
      {
        level: 6,
        title: "Dampen Elements",
        description: `Starting at 6th level, when you or a creature within 30 feet of you takes acid, cold, fire, lightning, or thunder damage, you can use your reaction to grant resistance to the creature against that instance of the damage.`,
      },
      {
        level: 17,
        title: "Master of Nature",
        description: `At 17th level, you gain the ability to command animals and plant creatures. While creatures are charmed by your Charm Animals and Plants feature, you can take a bonus action on your turn to verbally command what each of those creatures will do on its next turn.`,
      },
    ],
  },
  {
    key: "order",
    name: "Order Domain",
    source: "TCE",
    features: [
      {
        level: 3,
        title: "",
        description: `The Order Domain represents discipline, as well as devotion to a society or an institution and strict obedience to the laws governing it. On Ravnica, the domain is favored by clerics of the Azorius Senate, who use it to maintain and enforce the law, and of the Orzhov Syndicate, who exploit law and order for their personal gain. On other worlds, gods who grant access to this domain include Bane, Tyr, Majere, Erathis, Pholtus, Wee Jas, Aureon, Maglubiyet, Nuada, Athena, Anubis, Forseti, and Asmodeus.
The ideal of order is obedience to the law above all else, rather than to a specific individual or the passing influence of emotion or popular rule. Clerics of order are typically concerned with how things are done, rather than whether an action's results are just. Following the law and obeying its edicts is critical, especially when it benefits these clerics and their guilds or deities.
Law establishes hierarchies. Those selected by the law to lead must be obeyed. Those who obey must do so to the best of their ability. In this manner, law creates an intricate web of obligations that allows society to forge order and security in a chaotic multiverse.
At each indicated cleric level, you add the listed spells to your spells prepared.`,
      },
      {
        level: 3,
        title: "Order Domain Spells",
        table: {
          headers: ["Cleric Level", "Spells"],
          rows: [
            ["1st", "command, heroism"],
            ["3rd", "hold person, zone of truth"],
            ["5th", "mass healing word, slow"],
            ["7th", "compulsion, locate creature"],
            ["9th", "commune, dominate person"],
          ],
        },
      },
      {
        level: 3,
        title: "Bonus Proficiencies",
        description: `When you choose this domain at 1st level, you gain proficiency with heavy armor. You also gain proficiency in the Intimidation or Persuasion skill (your choice).`,
      },
      {
        level: 3,
        title: "Voice of Authority",
        description: `Starting at 1st level, you can invoke the power of law to drive an ally to attack. If you cast a spell with a spell slot of 1st level or higher and target an ally with the spell, that ally can use their reaction immediately after the spell to make one weapon attack against a creature of your choice that you can see.

If the spell targets more than one ally, you choose the ally who can make the attack.`,
      },
      {
        level: 3,
        title: "Channel Divinity: Order's Demand",
        description: `Starting at 2nd level, you can use your Channel Divinity to exert an intimidating presence over others.

As an action, you present your holy symbol, and each creature of your choice that can see or hear you within 30 feet of you must succeed on a Wisdom saving throw or be charmed by you until the end of your next turn or until the charmed creature takes any damage. You can also cause any of the charmed creatures to drop what they are holding when they fail the saving throw.`,
      },
      {
        level: 6,
        title: "Embodiment of the Law",
        description: `At 6th level, you become remarkably adept at channeling magical energy to compel others.
If you cast a spell of the enchantment school using a spell slot of 1st level or higher, you can change the spell's casting time to 1 bonus action for this casting, provided the spell's casting time is normally 1 action.
You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.`,
      },
      {
        level: 17,
        title: "Order's Wrath",
        description: `Starting at 17th level, enemies you designate for destruction wilt under the combined efforts of you and your allies. If you deal your Divine Strike damage to a creature on your turn, you can curse that creature until the start of your next turn. The next time one of your allies hits the cursed creature with an attack, the target also takes 2d8 psychic damage, and the curse ends. You can curse a creature in this way only once per turn.`,
      },
    ],
  },
  {
    key: "peace",
    name: "Peace Domain",
    source: "TCE",
    features: [
      {
        level: 3,
        title: "",
        description: `The balm of peace thrives at the heart of healthy communities, between friendly nations, and in the souls of the kindhearted. The gods of peace inspire people of all sorts to resolve conflict and to stand up against those forces that try to prevent peace from flourishing. See the Peace Deities table for a list of some of the gods associated with this domain.

Clerics of the Peace Domain preside over the signing of treaties, and they are often asked to arbitrate in disputes. These clerics' blessings draw people together and help them shoulder one another's burdens, and the clerics' magic aids those who are driven to fight for the way of peace.`,
      },
      {
        level: 3,
        title: "Peace Deities",
        table: {
          headers: ["Example Deity", "Pantheon"],
          rows: [
            ["Angharradh", "Elven"],
            ["Berronar Truesilver", "Dwarven"],
            ["Boldrei", "Eberron"],
            ["Cyrrollalee", "Halfling"],
            ["Eldath", "Forgotten Realms"],
            ["Gaerdal Ironhand", "Gnomish"],
            ["Paladine", "Dragonlance"],
            ["Rao", "Greyhawk"],
          ],
        },
      },
      {
        level: 3,
        title: "Domain Spells",
        description: `1st-level Peace Domain feature
        You gain domain spells at the cleric levels listed in the Peace Domain Spells table. See the Divine Domain class feature for how domain spells work.
        `,
        table: {
          headers: ["Cleric Level", "Spells"],
          rows: [
            ["1st", "heroism, sanctuary"],
            ["3rd", "aid, warding bond"],
            ["5th", "beacon of hope, sending"],
            ["7th", "aura of purity, Otiluke's resilient sphere"],
            ["9th", "greater restoration, Rary's telepathic bond"],
          ],
        },
      },
      {
        level: 3,
        title: "Implement of Peace",
        description: `1st-level Peace Domain feature
        You gain proficiency in the Insight, Performance, or Persuasion skill (your choice).`,
      },
      {
        level: 3,
        title: "Emboldening Bond",
        description: `1st-level Peace Domain feature
        You can forge an empowering bond among people who are at peace with one another. As an action, you choose a number of willing creatures within 30 feet of you (this can include yourself) equal to your proficiency bonus. You create a magical bond among them for 10 minutes or until you use this feature again. While any bonded creature is within 30 feet of another, the creature can roll a d4 and add the number rolled to an attack roll, an ability check, or a saving throw it makes. Each creature can add the d4 no more than once per turn.
You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
      {
        level: 3,
        title: "Channel Divinity: Balm of Peace",
        description: `2nd-level Peace Domain feature
        You can use your Channel Divinity to make your very presence a soothing balm. As an action, you can move up to your speed, without provoking opportunity attacks, and when you move within 5 feet of any other creature during this action, you can restore a number of hit points to that creature equal to 2d6 + your Wisdom modifier (minimum of 1 hit point). A creature can receive this healing only once whenever you take this action.`,
      },
      {
        level: 6,
        title: "Protective Bond",
        description: `6th-level Peace Domain feature
        The bond you forge between people helps them protect each other. When a creature affected by your Emboldening Bond feature is about to take damage, a second bonded creature within 30 feet of the first can use its reaction to teleport to an unoccupied space within 5 feet of the first creature. The second creature then takes all the damage instead.`,
      },
      {
        level: 17,
        title: "Expansive Bond",
        description: `17th-level Peace Domain feature
        The benefits of your Emboldening Bond and Protective Bond features now work when the creatures are within 60 feet of each other. Moreover, when a creature uses Protective Bond to take someone else's damage, the creature has resistance to that damage.`,
      },
    ],
  },
  {
    key: "tempest",
    name: "Tempest Domain",
    source: "PHB'14",
    features: [
      {
        level: 3,
        title: "",
        description: `Gods whose portfolios include the Tempest domain—including Talos, Umberlee, Kord, Zeboim, the Devourer, Zeus, and Thor—govern storms, sea, and sky. They include gods of lightning and thunder, gods of earthquakes, some fire gods, and certain gods of violence, physical strength, and courage. In some pantheons, a god of this domain rules over other deities and is known for swift justice delivered by thunderbolts. In the pantheons of seafaring people, gods of this domain are ocean deities and the patrons of sailors. Tempest gods send their clerics to inspire fear in the common folk, either to keep those folk on the path of righteousness or to encourage them to offer sacrifices of propitiation to ward off divine wrath.
At each indicated cleric level, you add the listed spells to your spells prepared.`,
      },
      {
        level: 3,
        title: "Tempest Domain Spells",
        table: {
          headers: ["Cleric Level", "Spells"],
          rows: [
            ["1st", "fog cloud, thunderwave"],
            ["3rd", "gust of wind, shatter"],
            ["5th", "call lightning, sleet storm"],
            ["7th", "control water, ice storm"],
            ["9th", "destructive wave, insect plague"],
          ],
        },
      },
      {
        level: 3,
        title: "Bonus Proficiencies",
        description: `At 1st level, you gain proficiency with martial weapons and heavy armor.`,
      },
      {
        level: 3,
        title: "Wrath of the Storm",
        description: `Also at 1st level, you can thunderously rebuke attackers. When a creature within 5 feet of you that you can see hits you with an attack, you can use your reaction to cause the creature to make a Dexterity saving throw. The creature takes 2d8 lightning or thunder damage (your choice) on a failed saving throw, and half as much damage on a successful one.
You can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.`,
      },
      {
        level: 3,
        title: "Channel Divinity: Destructive Wrath",
        description: `Starting at 2nd level, you can use your Channel Divinity to wield the power of the storm with unchecked ferocity.
When you roll lightning or thunder damage, you can use your Channel Divinity to deal maximum damage, instead of rolling.`,
      },
      {
        level: 6,
        title: "Thunderbolt Strike",
        description: `At 6th level, when you deal lightning damage to a Large or smaller creature, you can also push it up to 10 feet away from you.`,
      },
      {
        level: 17,
        title: "Stormborn",
        description: `At 17th level, you have a flying speed equal to your current walking speed whenever you are not underground or indoors.`,
      },
    ],
  },
  {
    key: "trickery",
    name: "Trickery Domain",
    source: "PHB'24",
    features: [
      {
        level: 3,
        title: "",
        description: `The Trickery Domain offers magic of deception, illusion, and stealth. Clerics who wield this magic are a disruptive force in the world, puncturing pride, mocking tyrants, freeing captives, and flouting hollow traditions. They prefer subterfuge and pranks to direct confrontation.
Gods of trickery are mischief-makers and instigators who stand as a constant challenge to the accepted order among both gods and mortals. They embody the forces of change and social upheaval, and they're patrons of thieves, scoundrels, gamblers, rebels, and liberators. Religious orders that operate in secret, especially those that seek to undermine oppressive governments or hierarchies, also draw on the power of the Trickery Domain.`,
      },
      {
        level: 3,
        title: "Trickery Domain Spells",
        table: {
          headers: ["Cleric Level", "Prepared Spells"],
          rows: [
            [
              "3rd",
              "Charm Person, Disguise Self, Invisibility, Pass without Trace",
            ],
            ["5th", "Hypnotic Pattern, Nondetection"],
            ["7th", "Confusion, Dimension Door"],
            ["9th", "Dominate Person, Modify Memory"],
          ],
        },
      },
      {
        level: 3,
        title: "Blessing of the Trickster",
        description: `As a Magic action, you can choose yourself or a willing creature within 30 feet of yourself to have Advantage on Dexterity (Stealth) checks. This blessing lasts until you finish a Long Rest or you use this feature again.`,
      },
      {
        level: 3,
        title: "Invoke Duplicity",
        description: `As a Bonus Action, you can expend one use of your Channel Divinity to create a perfect visual illusion of yourself in an unoccupied space you can see within 30 feet of yourself. The illusion is intangible and doesn't occupy its space. It lasts for 1 minute, but it ends early if you dismiss it (no action required) or have the Incapacitated condition. The illusion is animated and mimics your expressions and gestures. While it persists, you gain the following benefits.
Cast Spells. You can cast spells as though you were in the illusion's space, but you must use your own senses.
Distract. When both you and your illusion are within 5 feet of a creature that can see the illusion, you have Advantage on attack rolls against that creature, given how distracting the illusion is to the target.
Move. As a Bonus Action, you can move the illusion up to 30 feet to an unoccupied space you can see that is within 120 feet of yourself.`,
      },
      {
        level: 6,
        title: "Trickster's Transposition",
        description: `Whenever you take the Bonus Action to create or move the illusion of your Invoke Duplicity, you can teleport, swapping places with the illusion.`,
      },
      {
        level: 17,
        title: "Improved Duplicity",
        description: `The illusion of your Invoke Duplicity has grown more powerful in the following ways.
Shared Distraction. When you and your allies make attack rolls against a creature within 5 feet of the illusion, the attack rolls have Advantage.
Healing Illusion. When the illusion ends, you or a creature of your choice within 5 feet of it regains a number of Hit Points equal to your Cleric level.`,
      },
    ],
  },
  {
    key: "twilight",
    name: "Twilight Domain",
    source: "TCE",
    features: [
      {
        level: 3,
        title: "",
        description: `The twilit transition from light into darkness often brings calm and even joy, as the day's labors end and the hours of rest begin. The darkness can also bring terrors, but the gods of twilight guard against the horrors of the night.
Clerics who serve these deities-examples of which appear on the Twilight Deities table-bring comfort to those who seek rest and protect them by venturing into the encroaching darkness to ensure that the dark is a comfort, not a terror.`,
      },
      {
        level: 3,
        title: "Domain Spells",
        description: `1st-level Twilight Domain feature
You gain domain spells at the cleric levels listed in the Twilight Domain Spells table. See the Divine Domain class feature for how domain spells work.`,
        table: {
          headers: ["Cleric Level", "Spells"],
          rows: [
            ["1st", "faerie fire, sleep"],
            ["3rd", "moonbeam, see invisibility"],
            ["5th", "aura of vitality, Leomund's tiny hut"],
            ["7th", "aura of life, greater invisibility"],
            ["9th", "circle of power, mislead"],
          ],
        },
      },
      {
        level: 3,
        title: "Bonus Proficiencies",
        description: `1st-level Twilight Domain feature
        You gain proficiency with martial weapons and heavy armor.`,
      },
      {
        level: 3,
        title: "Eyes of Night",
        description: `1st-level Twilight Domain feature
        You can see through the deepest gloom. You have darkvision out to a range of 300 feet. In that radius, you can see in dim light as if it were bright light and in darkness as if it were dim light.
As an action, you can magically share the darkvision of this feature with willing creatures you can see within 10 feet of you, up to a number of creatures equal to your Wisdom modifier (minimum of one creature). The shared darkvision lasts for 1 hour. Once you share it, you can't do so again until you finish a long rest, unless you expend a spell slot of any level to share it again.`,
      },
      {
        level: 3,
        title: "Vigilant Blessing",
        description: `1st-level Twilight Domain feature
        The night has taught you to be vigilant. As an action, you give one creature you touch (including possibly yourself) advantage on the next initiative roll the creature makes. This benefit ends immediately after the roll or if you use this feature again.`,
      },
      {
        level: 3,
        title: "Channel Divinity: Twilight Sanctuary",
        description: `2nd-level Twilight Domain feature
        You can use your Channel Divinity to refresh your allies with soothing twilight.
As an action, you present your holy symbol, and a sphere of twilight emanates from you. The sphere is centered on you, has a 30-foot radius, and is filled with dim light. The sphere moves with you, and it lasts for 1 minute or until you are incapacitated or die. Whenever a creature (including you) ends its turn in the sphere, you can grant that creature one of these benefits:
`,
        list: [
          "You grant it temporary hit points equal to 1d6 plus your cleric level.",
          "You end one effect on it causing it to be charmed or frightened.",
        ],
      },
      {
        level: 6,
        title: "Steps of Night",
        description: `6th-level Twilight Domain feature
        You can draw on the mystical power of night to rise into the air. As a bonus action when you are in dim light or darkness, you can magically give yourself a flying speed equal to your walking speed for 1 minute. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
      {
        level: 17,
        title: "Twilight Shroud",
        description: `17th-level Twilight Domain feature
        The twilight that you summon offers a protective embrace: you and your allies have half cover while in the sphere created by your Twilight Sanctuary.`,
      },
    ],
  },
  {
    key: "war",
    name: "War Domain",
    source: "PHB'24",
    features: [
      {
        level: 3,
        title: "",
        description: `War has many manifestations. It can make heroes of ordinary people. It can be desperate and horrific, with acts of cruelty and cowardice eclipsing instances of excellence and courage. Clerics who tap into the magic of the War Domain excel in battle, inspiring others to fight the good fight or offering acts of violence as prayers.
Gods of the War Domain watch over warriors and reward them for their great deeds. They include champions of honor and chivalry as well as gods of destruction and pillage. Other war gods take a more neutral stance, promoting war in all its manifestations and supporting warriors in any circumstance.`,
      },
      {
        level: 3,
        title: "War Domain Spells",
        description: `Your connection to this divine domain ensures you always have certain spells ready. When you reach a Cleric level specified in the War Domain Spells table, you thereafter always have the listed spells prepared.`,
        table: {
          headers: ["Cleric Level", "Spells"],
          rows: [
            [
              "3rd",
              "Guiding Bolt, Magic Weapon, Shield of Faith, Spiritual Weapon",
            ],
            ["5th", "Crusader's Mantle, Spirit Guardians"],
            ["7th", "Fire Shield, Freedom of Movement"],
            ["9th", "Hold Monster, Steel Wind Strike"],
          ],
        },
      },
      {
        level: 3,
        title: "War Priest",
        description: `As a Bonus Action, you can make one attack with a weapon or an Unarmed Strike. You can use this Bonus Action a number of times equal to your Wisdom modifier (minimum of once). You regain all expended uses when you finish a Short or Long Rest.`,
      },
      {
        level: 3,
        title: "Guided Strike",
        description: `When you or a creature within 30 feet of you misses with an attack roll, you can expend one use of your Channel Divinity and give that roll a +10 bonus, potentially causing it to hit. When you use this feature to benefit another creature's attack roll, you must take a Reaction to do so.`,
      },
      {
        level: 6,
        title: "War God's Blessing",
        description: `You can expend a use of your Channel Divinity to cast Shield of Faith or Spiritual Weapon rather than expending a spell slot. When you cast either spell in this way, the spell doesn't require Concentration. Instead the spell lasts for 1 minute, but it ends early if you cast that spell again, have the Incapacitated condition, or die.`,
      },
      {
        level: 17,
        title: "Avatar of Battle",
        description: `You gain Resistance to Bludgeoning, Piercing, and Slashing damage.`,
      },
    ],
  },
];

export default clericSubclass;

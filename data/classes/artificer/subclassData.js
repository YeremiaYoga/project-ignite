 const artificerSubclass = [
  {
    key: "alchemist",
    name: "Alchemist",
    source: "TCE",
    features: [
      {
        level: 3,
        title: "Tool Proficiency",
        description:
          "When you adopt this specialization at 3rd level, you gain proficiency with alchemist's supplies. If you already have this proficiency, you gain proficiency with one other type of artisan's tools of your choice.",
      },
      {
        level: 3,
        title: "Alchemist Spells",
        description:
          "Starting at 3rd level, you always have certain spells prepared after you reach particular levels in this class, as shown in the Alchemist Spells table. These spells count as artificer spells for you, but they don’t count against the number of artificer spells you prepare.",
        table: {
          headers: ["Artificer Level", "Spell"],
          rows: [
            ["3rd", "healing word, ray of sickness"],
            ["5th", "flaming sphere, Melf's acid arrow"],
            ["9th", "gaseous form, mass healing word"],
            ["13th", "blight, death ward"],
            ["17th", "cloudkill, raise dead"],
          ],
        },
      },
      {
        level: 3,
        title: "Experimental Elixir",
        description: `Beginning at 3rd level, whenever you finish a long rest, you can magically produce an experimental elixir in an empty flask you touch. Roll on the Experimental Elixir table for the elixir’s effect, which is triggered when someone drinks the elixir. As an action, a creature can drink the elixir or administer it to an incapacitated creature.

Creating an experimental elixir requires you to have alchemist’s supplies on your person, and any elixir you create with this feature lasts until it is drunk or until the end of your next long rest.

When you reach certain levels in this class, you can make more elixirs at the end of a long rest: two at 6th level and three at 15th level. Roll for each elixir’s effect separately. Each elixir requires its own flask.

You can create additional experimental elixirs by expending a spell slot of 1st level or higher for each one. When you do so, you use your action to create the elixir in an empty flask you touch, and you choose the elixir’s effect from the Experimental Elixir table.`,
        table: {
          headers: ["d6", "Effect"],
          rows: [
            [
              "1",
              "Healing. The drinker regains a number of hit points equal to 2d4 + your Intelligence modifier.",
            ],
            [
              "2",
              "Swiftness. The drinker's walking speed increases by 10 feet for 1 hour.",
            ],
            [
              "3",
              "Resilience. The drinker gains a +1 bonus to AC for 10 minutes.",
            ],
            [
              "4",
              "Boldness. The drinker can roll a d4 and add the number rolled to every attack roll and saving throw they make for the next minute.",
            ],
            [
              "5",
              "Flight. The drinker gains a flying speed of 10 feet for 10 minutes.",
            ],
            [
              "6",
              "Transformation. The drinker's body is transformed as if by the alter self spell for 10 minutes.",
            ],
          ],
        },
        note: "Subclasses source: TCE, page 14. Also found in ERLW, page 58.",
      },
      {
        level: 5,
        title: "Alchemical Savant",
        description:
          "At 5th level, you develop masterful command of magical chemicals, enhancing the healing and damage you create through them. Whenever you cast a spell using your alchemist's supplies as the spellcasting focus, you gain a bonus to one roll of the spell. That roll must restore hit points or be a damage roll that deals acid, fire, necrotic, or poison damage, and the bonus equals your Intelligence modifier (minimum of +1).",
      },
      {
        level: 9,
        title: "Restorative Reagents",
        description: `Starting at 9th level, you can incorporate restorative reagents into some of your works:

- Whenever a creature drinks an *experimental elixir* you created, the creature gains temporary hit points equal to 2d6 + your Intelligence modifier (minimum of 1 temporary hit point).
- You can cast *lesser restoration* without expending a spell slot and without preparing the spell, provided you use alchemist’s supplies as the spellcasting focus. You can do so a number of times equal to your Intelligence modifier (minimum of once), and you regain all expended uses when you finish a long rest.`,
      },

      {
        level: 15,
        title: "Chemical Mastery",
        description: `By 15th level, you have been exposed to so many chemicals that they pose little risk to you, and you can use them to quickly end certain ailments:

- You gain resistance to acid damage and poison damage, and you are immune to the *poisoned* condition.
- You can cast *greater restoration* and *heal* without expending a spell slot, without preparing the spell, and without material components, provided you use alchemist’s supplies as the spellcasting focus. Once you cast either spell with this feature, you can’t cast that spell with it again until you finish a long rest.`,
      },
    ],
  },
  {
    key: "armorer",
    name: "Armorer",
    source: "TCE",
    features: [
      {
        level: 3,
        title: "Tools of the Trade",
        description: `You gain proficiency with heavy armor. You also gain proficiency with smith’s tools. If you already have this tool proficiency, you gain proficiency with one other type of artisan’s tools of your choice.`,
      },
      {
        level: 3,
        title: "Armorer Spells",
        description: `You always have certain spells prepared after you reach particular levels in this class, as shown in the Armorer Spells table. These spells count as artificer spells for you, but they don’t count against the number of artificer spells you prepare.`,
        table: {
          headers: ["Artificer Level", "Spells"],
          rows: [
            ["3rd", "magic missile, thunderwave"],
            ["5th", "mirror image, shatter"],
            ["9th", "hypnotic pattern, lightning bolt"],
            ["13th", "fire shield, greater invisibility"],
            ["17th", "passwall, wall of force"],
          ],
        },
      },
      {
        level: 3,
        title: "Arcane Armor",
        description: `Your metallurgical pursuits have led you to making armor a conduit for your magic. As an action, you can turn a suit of armor you’re wearing into Arcane Armor, provided you have smith’s tools in hand.`,
        subfeatures: [
          {
            title: "Arcane Armor Benefits",
            description: `You gain the following benefits while wearing this armor:
- If the armor normally has a Strength requirement, the arcane armor lacks this requirement for you.
- You can use the arcane armor as a spellcasting focus for your artificer spells.
- The armor attaches to you and can’t be removed against your will. It also expands to cover your entire body and replaces any missing limbs. The armor continues to be Arcane Armor until you don another suit or you die.
- You can don or doff the armor as an action.`,
          },
        ],
      },
      {
        level: 3,
        title: "Armor Model",
        description: `You can customize your Arcane Armor. When you do so, choose one of the following armor models: Guardian or Infiltrator. Each model gives you special benefits while wearing it. You can change the model whenever you finish a short or long rest, provided you have smith’s tools in hand.`,
        subfeatures: [
          {
            title: "Guardian Model",
            description: `You design your armor to be in the front line of conflict. It has the following features:

- **Thunder Gauntlets.** Your armored fists each count as a simple melee weapon dealing 1d8 thunder damage. On a hit, the target has disadvantage on attack rolls against creatures other than you until the start of your next turn.
- **Defensive Field.** As a bonus action, you gain temporary hit points equal to your artificer level, replacing any temporary hit points you already have. You can use this a number of times equal to your proficiency bonus per long rest.`,
          },
          {
            title: "Infiltrator Model",
            description: `You customize your armor for subtle undertakings. It has the following features:

- **Lightning Launcher.** A gem-like node appears on one of your armored fists or chest (your choice). It counts as a simple ranged weapon with a normal range of 90 feet and long range of 300 feet, dealing 1d6 lightning damage on a hit. Once per turn, when you hit a target with it, you can deal an extra 1d6 lightning damage.
- **Powered Steps.** Your walking speed increases by 5 feet.
- **Dampening Field.** You have advantage on Dexterity (Stealth) checks, and if the armor normally imposes disadvantage on such checks, the advantage and disadvantage cancel each other out.`,
          },
        ],
      },
      {
        level: 5,
        title: "Extra Attack",
        description:
          "You can attack twice, rather than once, whenever you take the Attack action on your turn.",
      },
      {
        level: 9,
        title: "Armor Modifications",
        description: `You learn how to use your artificer infusions to specially modify your Arcane Armor. That armor now counts as separate items for the purposes of your Infuse Items feature:\n
- Armor (the chest piece)\n
- Boots\n
- Helmet\n
- The armor's special weapon\n\n
Each of those items can bear one of your infusions, and the infusions transfer over if you change your armor's model with the Armor Model feature.\n\n
Additionally, the maximum number of items you can infuse at once increases by 2. These extra infusions must be part of your Arcane Armor.`,
      },
      {
        level: 15,
        title: "Perfected Armor",
        description: `Your Arcane Armor gains additional benefits based on its model:\n\n
**Guardian**\n
- When a Huge or smaller creature you can see ends its turn within 30 feet of you, you can use your reaction to magically force it to make a Strength saving throw against your spell save DC.\n
- On a failed save, you pull the creature up to 25 feet directly to an unoccupied space.\n
- If you pull it within 5 feet of you, you can make a melee weapon attack against it as part of the same reaction.\n
- You can use this reaction a number of times equal to your proficiency bonus, regaining all uses after a long rest.\n\n
**Infiltrator**\n
- Any creature damaged by your Lightning Launcher glimmers with magical light until the start of your next turn.\n
- The creature sheds dim light in a 5-foot radius and has **disadvantage** on attack rolls against you.\n
- The next attack roll against that creature has **advantage**, and if it hits, the target takes an additional **1d6 lightning damage**.`,
      },
    ],
  },
  {
    key: "artillerist",
    name: "Artillerist",
    source: "TCE",
    features: [
      {
        level: 3,
        title: "Tool Proficiency",
        description: `When you adopt this specialization at 3rd level, you gain proficiency with woodcarver's tools. If you already have this proficiency, you gain proficiency with another type of artisan's tools of your choice.`,
      },
      {
        level: 3,
        title: "Artillerist Spells",
        description: `Starting at 3rd level, you always have certain spells prepared after you reach particular levels in this class, as shown in the Artillerist Spells table. These spells count as artificer spells for you, but they don't count against the number of artificer spells you prepare.`,
        table: {
          headers: ["Artificer Level", "Spells"],
          rows: [
            ["3rd", "shield, thunderwave"],
            ["5th", "scorching ray, shatter"],
            ["9th", "fireball, wind wall"],
            ["13th", "ice storm, wall of fire"],
            ["17th", "cone of cold, wall of force"],
          ],
        },
      },
      {
        level: 3,
        title: "Eldritch Cannon",
        description: `At 3rd level, you learn how to create a magical cannon. You can take an action to magically create a Small or Tiny eldritch cannon in an unoccupied space on a horizontal surface within 5 feet of you.

The cannon has an AC of 18 and a number of hit points equal to five times your artificer level. It is immune to poison damage and psychic damage. If it is forced to make an ability check or a saving throw, treat all its ability scores as 10 (+0). If the *mending* spell is cast on it, it regains 2d6 hit points.

You can only have one cannon at a time. Creating a second cannon causes the first to be destroyed. You can dismiss your cannon at any time (no action required). You must finish a long rest or expend a spell slot to create another cannon after using this feature.

As a bonus action, you can cause the cannon to activate if you are within 60 feet of it. When you do so, choose one of the following effects:`,
        table: {
          headers: ["Cannon Type", "Effect"],
          rows: [
            [
              "Flamethrower",
              `The cannon exhales fire in a 15-foot cone. Each creature in the area must make a Dexterity saving throw against your spell save DC, taking 2d8 fire damage on a failed save, or half as much damage on a successful one. The fire ignites any flammable objects in the area that aren't being worn or carried.`,
            ],
            [
              "Force Ballista",
              `Make a ranged spell attack, originating from the cannon, at one creature or object within 120 feet. On a hit, the target takes 2d8 force damage and is pushed 5 feet away from the cannon.`,
            ],
            [
              "Protector",
              `The cannon emits a burst of positive energy that grants itself and each creature of your choice within 10 feet of it a number of temporary hit points equal to 1d8 + your Intelligence modifier.`,
            ],
          ],
        },
        additional: `The cannon is a magical object. Tiny cannons can be held in one hand. Small cannons have legs and can move 15 feet as part of your bonus action if you choose to give it mobility when you create it.`,
      },
      {
        level: 5,
        title: "Arcane Firearm",
        description: `At 5th level, you know how to turn a wand, staff, or rod into an arcane firearm, a conduit for your destructive spells. When you finish a long rest, you can use woodcarver's tools to carve special sigils into a wand, staff, or rod and thereby turn it into your arcane firearm. The sigils disappear from the object if you later carve them on a different item. The sigils otherwise last indefinitely.

You can use your arcane firearm as a spellcasting focus for your artificer spells. When you cast an artificer spell through the firearm, roll a d8, and you gain a bonus to one of the spell's damage rolls equal to the number rolled.`,
      },
      {
        level: 9,
        title: "Explosive Cannon",
        description: `Starting at 9th level, every eldritch cannon you create is more destructive:

- The cannon's damage rolls all increase by **1d8**.
- As an action, you can command the cannon to **detonate** if you are within 60 feet of it. Doing so destroys the cannon and forces each creature within 20 feet of it to make a Dexterity saving throw against your spell save DC, taking **3d8 force damage** on a failed save or half as much damage on a successful one.`,
      },
      {
        level: 15,
        title: "Fortified Position",
        description: `Starting at 15th level, you're a master at forming well-defended emplacements using Eldritch Cannon:

- You and your allies have **half cover** while within 10 feet of a cannon you create with Eldritch Cannon, as a result of a shimmering field of magical protection that the cannon emits.
- You can now have **two cannons at the same time**. You can create both with the same action (but not the same spell slot), and you can activate both of them with the same bonus action. You determine whether the cannons are identical to each other or different. You can't create a third cannon while you have two.`,
      },
    ],
  },
  {
    key: "battle-smith",
    name: "Battle Smith",
    source: "TCE",
    features: [
      {
        level: 3,
        title: "Tool Proficiency",
        description: `When you adopt this specialization at 3rd level, you gain proficiency with smith’s tools. If you already have this proficiency, you gain proficiency with one other type of artisan’s tools of your choice.`,
      },
      {
        level: 3,
        title: "Battle Smith Spells",
        description: `You always have certain spells prepared after you reach particular levels in this class, as shown in the Battle Smith Spells table. These spells count as artificer spells for you, but they don’t count against the number of artificer spells you prepare.`,
        table: {
          headers: ["Artificer Level", "Spells"],
          rows: [
            ["3rd", "heroism, shield"],
            ["5th", "branding smite, warding bond"],
            ["9th", "aura of vitality, conjure barrage"],
            ["13th", "aura of purity, fire shield"],
            ["17th", "banishing smite, mass cure wounds"],
          ],
        },
      },
      {
        level: 3,
        title: "Battle Ready",
        description: `When you reach 3rd level, your combat training and your experiments with magic have paid off in two ways:

- You gain proficiency with martial weapons.
- When you attack with a magic weapon, you can use your Intelligence modifier, instead of Strength or Dexterity, for the attack and damage rolls.`,
      },
      {
        level: 3,
        title: "Steel Defender",
        description: `By 3rd level, your tinkering has borne you a faithful companion, a Steel Defender. It is friendly to you and your companions and obeys your commands. See this creature’s game statistics in the Steel Defender stat block, which uses your proficiency bonus (PB) in several places.

In combat, the defender shares your initiative count, but it takes its turn immediately after yours. It can move and use its reaction on its own, but the only action it takes on its turn is the Dodge action, unless you take a bonus action on your turn to command it to take another action. That action can be one in its stat block or some other action. If you are incapacitated, the defender can take any action of its choice, not just Dodge.

If the mending spell is cast on it, it regains 2d6 hit points. If it has died within the last hour, you can use your smith’s tools as an action to revive it, provided you are within 5 feet of it. The defender returns to life after 1 minute with all its hit points restored.

At the end of a long rest, you can create a new Steel Defender if you have your smith’s tools with you. If you already have a Steel Defender from this feature, the first one immediately perishes. The defender also perishes if you die.`,
      },
      {
        level: 5,
        title: "Extra Attack",
        description: `Starting at 5th level, you can attack twice, rather than once, whenever you take the Attack action on your turn.`,
      },
      {
        level: 9,
        title: "Arcane Jolt",
        description: `At 9th level, you learn new ways to channel arcane energy to harm or heal. When either you hit a target with a magic weapon attack or your Steel Defender hits a target, you can channel magical energy through the strike to create one of the following effects:

- The target takes an extra 2d6 force damage.
- Choose one creature or object you can see within 30 feet of the target. Healing energy flows into the chosen recipient, restoring 2d6 hit points to it.

You can use this energy a number of times equal to your Intelligence modifier (minimum of once), but you can do so no more than once on a turn. You regain all expended uses when you finish a long rest.`,
      },
      {
        level: 15,
        title: "Improved Defender",
        description: `At 15th level, your Arcane Jolt and Steel Defender become more powerful:

- The extra damage and the healing of your Arcane Jolt both increase to 4d6.
- Your Steel Defender gains a +2 bonus to Armor Class.
- Whenever your Steel Defender uses its Deflect Attack, the attacker takes force damage equal to 1d4 + your Intelligence modifier.`,
      },
    ],
  },
];

export default artificerSubclass;
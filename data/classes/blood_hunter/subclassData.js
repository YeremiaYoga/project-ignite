const bloodhunterSubclass = [
  {
    key: "ghostslayer",
    name: "Order of the Ghostslayer",
    source: "BH2022",
    features: [
      {
        level: 3,
        title: "",
        description:
          "The Order of the Ghostslayer is the oldest of the blood hunter orders, its members having originally rediscovered the secrets of hemocraft and refined them for combat against the scourge of undeath. Ghostslayers seek out and study the moment of death, obsessing over the mystery of the transition from life, and the unholy power that can cause the dead to rise once more. These zealous blood hunters make it their life's work to destroy the scourge of undeath wherever it is found, tuning their abilities to engage undead creatures and those who manipulate the necromancy that creates them.",
      },
      {
        level: 3,
        title: "Rite of the Dawn",
        description:
          "When you join this order at 3rd level, you learn the Rite of the Dawn as part of your Crimson Rite feature. When you activate the Rite of the Dawn, the extra damage dealt by your rite is radiant damage. Additionally, while that rite is active on your weapon, you gain the following benefits:",
        list: [
          "Your weapon sheds bright light out to a range of 20 feet.",
          "You have resistance to necrotic damage.",
          "When you hit an undead creature with a weapon for which the Rite of the Dawn is active, you roll an additional hemocraft die when determining the extra damage from the rite.",
        ],
      },
      {
        level: 3,
        title: "Curse Specialist",
        description:
          "Starting at 3rd level, you learn to master blood curses. You gain an additional use of your Blood Maledict feature. In addition, your blood curses can target any creature, whether it has blood or not.",
      },
      {
        level: 7,
        title: "Aether Walk",
        description:
          "Upon reaching 7th level, at the start of your turn, you can magically step into the veil between the planes as long as you aren't incapacitated. You can move through other creatures and objects as if they were difficult terrain, as well as see and affect creatures and objects on the Ethereal Plane. You take 1d10 force damage if you end your turn inside an object.\n\nThis feature lasts for a number of rounds equal to your Hemocraft modifier (minimum of 1 round). If you are inside an object when it ends, you are immediately shunted to the nearest unoccupied space and you take force damage equal to twice the number of feet you moved.\n\nOnce you use this feature, you must finish a short or long rest before you can use it again. You can use Aether Walk twice between rests starting at 15th level.",
      },
      {
        level: 11,
        title: "Brand of Sundering",
        description:
          "Starting at 11th level, your Brand of Castigation exposes a fragment of your foe's essence, leaving them vulnerable to your Crimson Rite feature. Whenever you hit a creature with a weapon for which you have an active crimson rite, you roll an additional hemocraft die when determining the extra damage from the rite. Additionally, if a branded creature has the Incorporeal Movement trait or a similar feature, it can't move through creatures or objects while branded.",
      },
      {
        level: 15,
        title: "Blood Curse of the Exorcist",
        description:
          "At 15th level, you hone your hemocraft to tear corruption from the minds and bodies of your allies — and to punish those responsible for it. You gain the Blood Curse of the Exorcist for your Blood Maledict feature. This doesn't count against your number of blood curses known.",
      },
      {
        level: 18,
        title: "Rite Revival",
        description:
          "Upon reaching 18th level, you learn to protect your fading life by reabsorbing the energy you feed to your weapons. If you have one or more crimson rites active and you are reduced to 0 hit points but don't die outright, you can choose to have all your active crimson rites end and drop to 1 hit point instead.",
      },
    ],
  },
  {
    key: "lycan",
    name: "Order of the Lycan",
    source: "BH2022",
    features: [
      {
        level: 3,
        title: "",
        description: `The ancient curse of lycanthropy is feared by nearly all peoples and cultures, passed through blood and seeding a host with the savage strength and hunger for violence of a wicked beast. The Order of the Lycan is a proud group of blood hunters who undergo "the Taming"—the ceremonial infliction of lycanthropy by a senior member of the order, for those who do not already carry the curse before seeking this path. These hunters then use the magic of their blood to harness the power of the monster they harbor, without losing themselves to it. Using intense will and secret blood magic rituals, members of the Order of the Lycan learn to control and unleash their hybrid forms for short periods of time. Enhanced physical prowess, unnatural resilience, and razor-sharp claws make these warriors a terrible foe to any evil that crosses their path. Yet no training is perfect, and without care and complete focus, even the greatest of blood hunters can temporarily lose themselves to their own hunger.`,
      },
      {
        level: 3,
        title: "Heightened Senses",
        description: `When you choose this archetype at 3rd level, you gain the improved senses of a natural predator. You have advantage on Wisdom (Perception) checks that rely on hearing or smell.`,
      },
      {
        level: 3,
        title: "Hybrid Transformation",
        description: `Also at 3rd level, you learn to control the lycanthropic curse that courses through your veins. As a bonus action, you transform into a special hybrid form for up to 1 hour. You can speak, use equipment, and wear armor while in this form, and can revert to your normal form as a bonus action. You automatically revert to your normal form if you fall unconscious or die.
This feature replaces the rules for lycanthropy in the Monster Manual. Once you use this feature, you must finish a short or long rest before you can use it again. While you are transformed, you gain the following features:
Feral Might. You have advantage on Strength checks and Strength saving throws, and you have a +1 bonus to melee damage rolls. This bonus increases to +2 at 11th level and to +3 at 18th level.
Resilient Hide. You have resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks not made with silvered weapons. Additionally, while you are not wearing heavy armor, you have a +1 bonus to AC.
Predatory Strikes. You can apply your Crimson Rite feature to your unarmed strikes, which you treat as one weapon. You can use Dexterity instead of Strength for the attack and damage rolls of your unarmed strikes, which deal 1d6 bludgeoning or slashing damage (your choice). This damage increases to 1d8 at 11th level.
Additionally, when you use the Attack action to make an unarmed strike, you can make one additional unarmed strike as a bonus action.
Bloodlust. If you start your turn with fewer hit points than half your hit point maximum, you must succeed on a DC 8 Wisdom saving throw or move directly toward the nearest creature and use the Attack action against that creature. If you're concentrating on a spell or are under an effect that prevents you from concentrating (such as the barbarian's Rage feature), you automatically fail this saving throw.
If you have your Extra Attack feature, you can choose whether to use it for this frenzied attack. If more than one creature is equally near to you, roll randomly to determine your target. Once your attack is resolved, you regain control of yourself.`,
      },
      {
        level: 3,
        title: "The Onus of Lycanthropy",
        notes: `Those inducted into the Order of the Lycan choose this path with conviction, understanding the terrible weight it imposes on them and the challenges it brings. Where most afflicted by the curse of lycanthropy grow wicked, deranged, and even murderous, Lycan blood hunters accept the gifts of the beast while maintaining control through intense training and the power of their blood magic. A member of the Order of the Lycan cannot spread their curse through blood unless they wish to, and one of the most sacred oaths of this order is to never infect another creature without the order's sanction.
If a member of the Order of the Lycan is ever cured of their lycanthropic curse, it brings terrible shame to their name and the order. Members who have been cleansed against their will readily return to the order to undergo a renewed initiation of the Taming, reintroducing the curse to their bodies and restoring their honor.
Lycanthropy comes in many forms bound to specific beasts, with wolf, bear, tiger, boar, and rat the best-known variations. The particular strain of the lycanthropic curse defines the physical traits that manifest in a Lycan blood hunter's hybrid transformation, even as the benefits the curse bestows remain relatively uniform.`,
      },
      {
        level: 7,
        title: "Stalker's Prowess",
        description: `At 7th level, your speed increases by 10 feet, and you add 10 feet to your long jump distance and 3 feet to your high jump distance. Your hybrid form also gains the following additional benefit.`,
      },
      {
        level: 7,
        title: "Improved Predatory Strikes",
        description: `You have a +1 bonus to attack rolls made with your unarmed strike. This bonus increases to +2 at 11th level and to +3 at 18th level. Additionally, when you have an active crimson rite on your unarmed strike while in your hybrid form, your unarmed strikes are considered magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.`,
      },
      {
        level: 11,
        title: "Advanced Transformation",
        description: `At 11th level, you learn to unleash and control more of the beast within. You can use your Hybrid Transformation feature twice, regaining all expended uses when you finish a short or long rest. Your hybrid form also gains the following additional benefit.`,
      },
      {
        level: 11,
        title: "Lycan Regeneration",
        description: `At the start of each of your turns when you have at least 1 hit point but fewer hit points than half your hit point maximum, you gain hit points equal to 1 + your Constitution modifier (minimum of 1). If you are in hybrid form, you gain these hit points before you must make the saving throw for your bloodlust.`,
      },
      {
        level: 15,
        title: "Brand of the Voracious",
        description: `Starting at 15th level, you have advantage on the saving throw for your bloodlust while in hybrid form. Additionally, your Brand of Castigation can now bind a foe to your hunter's ferocity. While in your hybrid form, you have advantage on attack rolls against a creature branded by you.`,
      },
      {
        level: 18,
        title: "Hybrid Transformation Mastery",
        description: `At 18th level, you have mastered your inner predator. You can use your Hybrid Transformation feature an unlimited number of times, and your hybrid form lasts until you revert to your normal form, fall unconscious, or die.
You also gain the Blood Curse of the Howl for your Blood Maledict feature. This doesn't count against your number of blood curses known.`,
      },
    ],
  },
  {
    key: "mutant",
    name: "Order of the Mutant",
    source: "BH2022",
    features: [
      {
        level: 3,
        title: "",
        description: `The process of undertaking the Hunter's Bane ritual is a painful, scarring, and sometimes fatal experience. Those who survive are irrevocably changed—and not always for the better. Over generations of experimentation, a splinter order of blood hunters honed the way in which hemocraft alters the body, using corrupted alchemy and toxic elixirs to alter their blood even further. Over time, they have modified their capabilities in battle, becoming something beyond what they once were. Calling themselves the Order of the Mutant, these blood hunters now specialize in assessing the strengths and weaknesses of their foes, altering their biology to be best prepared for any conflict.`,
      },
      {
        level: 3,
        title: "Mutagencraft",
        description: `When you choose this archetype at 3rd level, you learn to master forbidden alchemical formulas—known as mutagens—that can temporarily alter your mental and physical abilities.
As a bonus action, you consume a mutagen, whose effects and side effects last until you finish a short or long rest unless otherwise specified. While one or more mutagens are affecting you, you can use an action to focus and flush all mutagens from your system, ending their effects and side effects.
Mutagens are designed for the specific biology of the character who concocted them, and your mutagens have no effect on other creatures. They are also unstable by nature, losing their potency over time and becoming inert if not used before you finish your next short or long rest.`,
        table: {
          headers: ["Blood Hunter Level", "Mutagens Created", "Formulas Known"],
          rows: [
            ["3rd", "1", "4"],
            ["7th", "2", "5"],
            ["11th", "2", "6"],
            ["15th", "3", "7"],
            ["18th", "3", "8"],
          ],
        },
      },
      {
        level: 3,
        title: "Formulas",
        description: `The number of mutagens you can concoct when you finish a rest, and the number of formulas you know, increases as you gain levels in the blood hunter class, as shown on the Mutagencraft table above. Additionally, when you learn a new mutagen formula, you can replace one formula you already know with a new mutagen formula. You choose four mutagen formulas to learn from the options detailed at the end of this subclass description, and you can concoct one mutagen when you finish a short or long rest.`,
      },
      {
        level: 3,
        title: "Mutagens",
        description: `These mutagens are presented in alphabetical order. You can learn a mutagen at the same time you meet its prerequisites.
Aether (11th Level Required). You have a flying speed of 20 feet for 1 hour. However, you have disadvantage on Strength checks and Dexterity checks during this time.
Alluring. Your skin and voice become malleable, allowing you to enhance your appearance and presence. You have advantage on Charisma checks. However, you have disadvantage on initiative rolls.
Celerity. Your Dexterity score increases by 3, as does your maximum for that score. However, you have disadvantage on Wisdom saving throws. Your Dexterity score and your maximum increase by 4 if you consume this mutagen at 11th level, and by 5 at 18th level.
Conversant. You have advantage on Intelligence checks. However, you have disadvantage on Wisdom checks.
Cruelty (11th level required). When you use the Attack action, you can make one additional weapon attack as a bonus action. However, you have disadvantage on Intelligence, Wisdom, and Charisma saving throws.
Deftness. You have advantage on Dexterity checks. However, you have disadvantage on Wisdom checks.
Embers. You have resistance to fire damage and vulnerability to cold damage.
Gelid. You have resistance to cold damage and vulnerability to fire damage.
Impermeable. You have resistance to piercing damage and vulnerability to slashing damage.
Mobile. You have immunity to the grappled and restrained conditions. However, you have disadvantage on Strength checks. At 11th level, you are also immune to the paralyzed condition.
Nighteye. You have darkvision out to a range of 60 feet. If you already have darkvision, its range increases by 60 feet. However, you have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.
Percipient. You have advantage on Wisdom checks. However, you have disadvantage on Charisma checks.
Potency. Your Strength score increases by 3, as does your maximum for that score. However, you have disadvantage on Dexterity saving throws. Your Strength score and your maximum increase by 4 if you consume this mutagen at 11th level, and by 5 at 18th level.
Precision (11th level required). Your weapon attacks score a critical hit on a roll of 19 or 20. However, you have disadvantage on Strength saving throws.
Rapidity. Your speed increases by 10 feet. However, you have disadvantage on Intelligence checks. At 15th level, your speed increases by an additional 5 feet.
Reconstruction (7th level required). For 1 hour, at the start of each of your turns when you have at least 1 hit point but fewer hit points than half your hit point maximum, you regain hit points equal to your proficiency bonus. However, your speed is reduced by 10 feet during this time.
Sagacity. Your Intelligence score increases by 3, as does your maximum for that score. However, you have disadvantage on Charisma saving throws. Your Intelligence score and your maximum increase by 4 if you consume this mutagen at 11th level, and by 5 at 18th level.
Shielded. You have resistance to slashing damage, and you have vulnerability to bludgeoning damage.
Unbreakable. You have resistance to bludgeoning damage, and you have vulnerability to piercing damage.
Vermillion. You gain an additional use of your Blood Maledict feature. However, you have disadvantage on death saving throws.`,
      },
      {
        level: 7,
        title: "Strange Metabolism",
        description: `When you reach 7th level, your body begins to adapt to toxins and venoms, ignoring their corrupting effects. You gain immunity to poison damage and the poisoned condition.

Additionally, you can trigger a burst of adrenaline that lets you temporarily resist the negative effects of a mutagen. As a bonus action, you can ignore the negative side effect of one mutagen affecting you for 1 minute. Once you do so, you can't do so again until you finish a long rest.`,
      },
      {
        level: 11,
        title: "Brand of Axiom",
        description: `At 11th level, your mutagenic hemocraft lets your Brand of Castigation reveal a foe's true nature. Any illusion or invisibility in effect on a creature when you brand it ends, and the creature can't benefit from invisibility or illusion effects while branded by you. If a creature branded by you is in an alternative form (by way of the polymorph spell, the Change Shape action or Shapechanger trait, the Wild Shape feature, and similar effects), it must succeed on a Wisdom saving throw or revert to its true form and be stunned until the end of your next turn. Whenever a branded creature attempts to alter its form, it must succeed on a Wisdom saving throw or have the attempt fail, and it is stunned until the end of your next turn.`,
      },
      {
        level: 15,
        title: "Blood Curse of Corrosion",
        description: `Starting at 15th level, your blood curse can infuse a creature's body with terrible toxins. You gain the Blood Curse of Corrosion for your Blood Maledict feature. This doesn't count against your number of blood curses known.`,
      },
      {
        level: 18,
        title: "Exalted Mutation",
        description: `At 18th level, your body has adapted to produce mutagens naturally in a moment of need. As a bonus action, choose one mutagen currently affecting you. Its effects and side effects end, and you can immediately have a mutagen you know the formula for take effect in its place.
You can use this feature a number of times equal to your Hemocraft modifier (minimum of once). You regain all expended uses when you finish a long rest.`,
      },
    ],
  },
  {
    key: "profane-soul",
    name: "Order of the Profane Soul",
    source: "BH2022",
    features: [],
  },
];

export default bloodhunterSubclass;

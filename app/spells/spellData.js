// spellMeta.js

// SCHOOL MAP
export const SCHOOL_MAP = {
  abj: "Abjuration",
  con: "Conjuration",
  div: "Divination",
  enc: "Enchantment",
  evo: "Evocation",
  ill: "Illusion",
  nec: "Necromancy",
  trs: "Transmutation",
};

export const PROPERTY_LABELS = {
  vocal: "Vocal",
  verbal: "Vocal",
  somatic: "Somatic",
  material: "Material",
  concentration: "Concentration",
  ritual: "Ritual",
};

// PROPERTY DESCRIPTIONS (HTML)
export const PROPERTY_DESCRIPTIONS = {
  vocal: `
    <p>
      Most spells require the chanting of mystic words. The words themselves aren't the source of the spell's power; rather, the particular combination of sounds, with specific pitch and resonance, sets the threads of magic in motion.
    </p>
    <p>
      Thus, a character who is gagged or in an area of silence, such as one created by the <em>silence</em> spell, can't cast a spell with a verbal component.
    </p>
  `,
  verbal: `
    <p>
      Most spells require the chanting of mystic words. The words themselves aren't the source of the spell's power; rather, the particular combination of sounds, with specific pitch and resonance, sets the threads of magic in motion.
    </p>
    <p>
      Thus, a character who is gagged or in an area of silence, such as one created by the <em>silence</em> spell, can't cast a spell with a verbal component.
    </p>
  `,
  somatic: `
    <p>
      Spellcasting gestures might include a forceful gesticulation or an intricate set of gestures. If a spell requires a somatic component, the caster must have free use of at least one hand to perform these gestures.
    </p>
  `,
  material: `
    <p>
      Casting some spells requires particular objects, specified in parentheses in the component entry. A character can use a component pouch or a spellcasting focus in place of the components specified for a spell.
    </p>
    <p>
      But if a cost is indicated for a component, a character must have that specific component before they can cast the spell. If a spell states that a material component is consumed by the spell, the caster must provide this component for each casting of the spell.
    </p>
    <p>
      A spellcaster must have a hand free to access a spell's material components or to hold a spellcasting focus, but it can be the same hand that is used to perform somatic components.
    </p>
  `,
  concentration: `
  <p>
    Some spells require you to maintain concentration in order to keep their magic active. If you lose concentration, such a spell ends.
  </p>
  <p>
    If a spell must be maintained with concentration, that fact appears in its Duration entry, and the spell specifies how long you can concentrate on it. You can end concentration at any time (no action required).
  </p>
  <p>
    Normal activity, such as moving and attacking, doesn't interfere with concentration. The following factors can break concentration:
  </p>

  <ul style="list-style-type: disc; margin-left: 1rem; padding-left: 4px;">
    <li>
      <strong>Casting another spell that requires concentration.</strong>
      You lose concentration on a spell if you cast another spell that requires concentration. You can't concentrate on two spells at once.
    </li>
    <li>
      <strong>Taking damage.</strong>
      Whenever you take damage while you are concentrating on a spell, you must make a Constitution saving throw to maintain your concentration. The DC equals 10 or half the damage you take, whichever number is higher. If you take damage from multiple sources, such as an arrow and a dragon's breath, you make a separate saving throw for each source of damage.
    </li>
    <li>
      <strong>Being incapacitated or killed.</strong>
      You lose concentration on a spell if you are incapacitated or if you die.
    </li>
  </ul>

  <p>
    The DM might also decide that certain environmental phenomena, such as a wave crashing over you while you're on a storm-tossed ship, require you to succeed on a DC 10 Constitution saving throw to maintain concentration on a spell.
  </p>
`,

  ritual: `
    <p>
      Certain spells have a special tag: <strong>ritual</strong>. Such a spell can be cast following the normal rules for spellcasting, or the spell can be cast as a ritual.
    </p>
    <p>
      The ritual version of a spell takes 10 minutes longer to cast than normal and doesn't expend a spell slot. A ritual spell can't be cast at a higher level using a higher-level slot.
    </p>
    <p>
      To cast a spell as a ritual, a spellcaster must have a feature that grants the ability to do so, and the spell must be prepared or known unless the character's ritual feature states otherwise.
    </p>
  `,
};

"use client";
import CollapsibleSection from "./CollapseSection";
export default function ArtificerFeatures() {
  return (
    <div className=" text-zinc-100 p-8 rounded-xl mx-auto shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Class Features</h1>
      <p className="mb-6">
        As an artificer, you gain the following class features.
      </p>
      <section
        id="hit-points"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Hit Points">
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>
              <span className="font-semibold text-zinc-100">Hit Dice:</span> 1d8
              per artificer level
            </li>
            <li>
              <span className="font-semibold text-zinc-100">
                Hit Points at 1st Level:
              </span>{" "}
              8 + your Constitution modifier
            </li>
            <li>
              <span className="font-semibold text-zinc-100">
                Hit Points at Higher Levels:
              </span>{" "}
              1d8 (or 5) + your Constitution modifier per artificer level after
              1st
            </li>
          </ul>
        </CollapsibleSection>
      </section>
      <section
        id="proficiencies"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Proficiencies">
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>
              <span className="font-semibold text-zinc-100">Armor:</span> Light
              armor, medium armor, shields
            </li>
            <li>
              <span className="font-semibold text-zinc-100">Weapons:</span>{" "}
              Simple weapons
            </li>
            <li>
              <span className="font-semibold text-zinc-100">Tools:</span>{" "}
              Thieves' tools, tinker's tools, one type of artisan’s tools of
              your choice
            </li>
            <li>
              <span className="font-semibold text-zinc-100">
                Saving Throws:
              </span>{" "}
              Constitution, Intelligence
            </li>
            <li>
              <span className="font-semibold text-zinc-100">Skills:</span>{" "}
              Choose two from Arcana, History, Investigation, Medicine, Nature,
              Perception, Sleight of Hand
            </li>
          </ul>
        </CollapsibleSection>
      </section>
      <section
        id="equipment"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Equipment">
          <p className="text-zinc-300 mb-4">
            You start with the following equipment, in addition to the equipment
            granted by your background:
          </p>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>any two simple weapons</li>
            <li>a light crossbow and 20 bolts</li>
            <li>(a) studded leather armor or (b) scale mail</li>
            <li>thieves' tools and a dungeoneer’s pack</li>
          </ul>
          <p className="text-zinc-400 mt-4 italic">
            Alternatively, you may start with 5d4×10 starting gold.
          </p>
        </CollapsibleSection>
      </section>
      <section
        id="optional-rule-firearm-proficiency"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Optional Rule: Firearm Proficiency">
          <p className="text-zinc-300 leading-relaxed">
            The secrets of gunpowder weapons have been discovered in various
            corners of the D&amp;D multiverse. If your Dungeon Master uses the
            rules on firearms in the <em>Dungeon Master’s Guide</em> and your
            artificer has been exposed to the operation of such weapons, your
            artificer is proficient with them.
          </p>
        </CollapsibleSection>
      </section>

      <section
        id="magical-tinkering"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Magical Tinkering">
          <p className="text-zinc-300 mb-4 leading-relaxed text-base">
            At 1st level, you’ve learned how to invest a spark of magic into
            mundane objects. To use this ability, you must have thieves’ tools
            or artisan’s tools in hand. You then touch a Tiny nonmagical object
            as an action and give it one of the following magical properties of
            your choice:
          </p>
          <ul className="list-disc list-inside text-zinc-300 space-y-2 text-base mb-6">
            <li>
              The object sheds bright light in a 5-foot radius and dim light for
              an additional 5 feet.
            </li>
            <li>
              Whenever tapped by a creature, the object emits a recorded message
              that can be heard up to 10 feet away. You utter the message when
              you bestow this property on the object, and the recording can be
              no more than 6 seconds long.
            </li>
            <li>
              The object continuously emits your choice of an odor or a
              nonverbal sound (wind, waves, chirping, or the like). The chosen
              phenomenon is perceivable up to 10 feet away.
            </li>
            <li>
              A static visual effect appears on one of the object’s surfaces.
              This effect can be a picture, up to 25 words of text, lines and
              shapes, or a mixture of these elements, as you like.
            </li>
          </ul>
          <p className="text-zinc-300 mb-4 leading-relaxed text-base">
            The chosen property lasts indefinitely. As an action, you can touch
            the object and end the property early.
          </p>
          <p className="text-zinc-300 leading-relaxed text-base">
            You can bestow magic on multiple objects, touching one object each
            time you use this feature, though a single object can only bear one
            property at a time. The maximum number of objects you can affect
            with this feature at one time is equal to your Intelligence modifier
            (minimum of one object). If you try to exceed your maximum, the
            oldest property immediately ends, and then the new property applies.
          </p>
        </CollapsibleSection>
      </section>
      <section
        id="spellcasting"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Spellcasting">
          <p className="text-zinc-300 mb-6 leading-relaxed text-base">
            You've studied the workings of magic and how to cast spells,
            channeling the magic through objects. To observers, you don’t appear
            to be casting spells in a conventional way; you appear to produce
            wonders from mundane items and outlandish inventions.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-2">
            Tools Required
          </h3>
          <p className="text-zinc-300 mb-6 leading-relaxed text-base">
            You produce your artificer spell effects through your tools. You
            must have a spellcasting focus – specifically thieves’ tools or some
            kind of artisan’s tools – in hand when you cast any spell with the
            Spellcasting feature (meaning the spell has an “M” component when
            you cast it).
            <br />
            You must be proficient with the tool to use it in this way.
          </p>

          <p className="text-zinc-300 mb-6 leading-relaxed text-base">
            After you gain the Infuse Item feature at 2nd level, you can also
            use any item bearing one of your infusions as a spellcasting focus.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-2">
            Cantrips (0-Level Spells)
          </h3>
          <p className="text-zinc-300 mb-6 leading-relaxed text-base">
            At 1st level, you know two cantrips of your choice from the
            artificer spell list. At higher levels, you learn additional
            artificer cantrips of your choice, as shown in the Cantrips Known
            column of the Artificer table. When you gain a level in this class,
            you can replace one of the artificer cantrips you know with another
            cantrip from the artificer spell list.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-2">
            Preparing and Casting Spells
          </h3>
          <p className="text-zinc-300 mb-6 leading-relaxed text-base">
            The Artificer table shows how many spells you have to cast your
            artificer spells. To cast one of your artificer spells of 1st level
            or higher, you must expend a slot of the spell’s level or higher.
            You regain all expended spell slots when you finish a long rest.
          </p>

          <p className="text-zinc-300 mb-6 leading-relaxed text-base">
            You prepare the list of artificer spells that are available for you
            to cast, choosing from the artificer spell list. When you do so,
            choose a number of artificer spells equal to your Intelligence
            modifier + half your artificer level, rounded down (minimum of one
            spell). The spells must be of a level for which you have spell
            slots.
          </p>

          <p className="text-zinc-300 mb-6 leading-relaxed text-base">
            For example, if you are a 5th-level artificer, you have four
            1st-level and two 2nd-level spell slots. With an Intelligence of 14,
            your list of prepared spells can include four spells of 1st or 2nd
            level, in any combination. If you prepare the 1st-level spell{" "}
            <em>Cure Wounds</em>, you can cast it using a 1st-level or a
            2nd-level slot. Casting the spell doesn’t remove it from your list
            of prepared spells.
          </p>

          <p className="text-zinc-300 mb-6 leading-relaxed text-base">
            You can change your list of prepared spells when you finish a long
            rest. Preparing a new list of artificer spells requires time spent
            tinkering with your spellcasting focuses: at least 1 minute per
            spell level for each spell on your list.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-2">
            Spellcasting Ability
          </h3>
          <p className="text-zinc-300 mb-6 leading-relaxed text-base">
            Intelligence is your spellcasting ability for your artificer spells;
            your understanding of the theory behind magic allows you to wield
            these spells with superior skill. You use your Intelligence whenever
            an artificer spell refers to your spellcasting ability. In addition,
            you use your Intelligence modifier when setting the saving throw DC
            for an artificer spell you cast and when making an attack roll with
            one.
          </p>

          <ul className="list-disc list-inside text-zinc-300 mb-6 text-base">
            <li>
              Spell save DC = 8 + your proficiency bonus + your Intelligence
              modifier
            </li>
            <li>
              Spell attack modifier = your proficiency bonus + your Intelligence
              modifier
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-blue-300 mb-2">
            Ritual Casting
          </h3>
          <p className="text-zinc-300 leading-relaxed text-base mb-10">
            You can cast an artificer spell as a ritual if that spell has the
            ritual tag and you have the spell prepared.
          </p>
        </CollapsibleSection>
      </section>

      <section
        id="infuse-item"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Infuse Item">
          <p className="text-zinc-300 mb-6 leading-relaxed text-base">
            At 2nd level, you’ve gained the ability to imbue mundane items with
            certain magical infusions, turning those objects into magic items.
          </p>

          <h3 className="text-xl font-semibold mb-1 text-blue-300">
            Infusions Known
          </h3>
          <p className="text-zinc-300 mb-2 leading-relaxed text-base">
            When you gain this feature, pick four artificer infusions to learn.
            You learn additional infusions of your choice when you reach certain
            levels in this class, as shown in the Infusions Known column of the
            Artificer table.
          </p>
          <p className="text-zinc-300 mb-4 leading-relaxed text-base">
            Whenever you gain a level in this class, you can replace one of the
            artificer infusions you learned with a new one.
          </p>

          <h3 className="text-xl font-semibold mb-1 text-blue-300">
            Infusing an Item
          </h3>
          <p className="text-zinc-300 mb-2 leading-relaxed text-base">
            Whenever you finish a long rest, you can touch a nonmagical object
            and imbue it with one of your artificer infusions, turning it into a
            magic item. It works only on certain kinds of objects, as specified
            in the infusion’s description. If the item requires attunement, you
            can attune yourself to it the instant you infuse it. If you decide
            to attune to the item later, you must do so using the normal process
            for attunement (see the attunement rules in the{" "}
            <em>Dungeon Master’s Guide</em>).
          </p>
          <p className="text-zinc-300 mb-2 leading-relaxed text-base">
            Your infusion remains in an item indefinitely, but when you die, the
            infusion vanishes after a number of days equal to your Intelligence
            modifier (minimum of 1 day). The infusion also vanishes if you
            replace your knowledge of the infusion.
          </p>
          <p className="text-zinc-300 mb-2 leading-relaxed text-base">
            You can infuse more than one nonmagical object at the end of a long
            rest; the maximum number of objects appears in the Infused Items
            column of the Artificer table. You must touch each of the objects,
            and each of your infusions can be in only one object at a time.
          </p>
          <p className="text-zinc-300 mb-6 leading-relaxed text-base">
            Moreover, you don’t need to infuse all your available items. At 2nd
            level, for example, you have two infusions known and can infuse two
            items. You can choose to infuse only one item or none. If you try to
            exceed your maximum number of infusions, the oldest infusion
            immediately ends, and then the new infusion applies.
          </p>
          <p className="text-zinc-300 mb-6 leading-relaxed text-base">
            If an infusion ends on an item that contains other things (like a
            bag of holding), its contents harmlessly appear in and around its
            space.
          </p>
        </CollapsibleSection>
      </section>
      <section
        id="artificer-specialist"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Artificer Specialist">
          <p className="text-base mb-4">
            At 3rd level, you choose the type of specialist you are. Your choice
            grants you features at 5th level and again at 9th and 15th level.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-zinc-700 text-base text-left">
              <thead className="bg-blue-900 text-blue-200">
                <tr>
                  <th className="py-2 px-4 border-b border-zinc-700">
                    Specialty
                  </th>
                  <th className="py-2 px-4 border-b border-zinc-700">Source</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-700">
                  <td className="py-2 px-4">Alchemist</td>
                  <td className="py-2 px-4">
                    Tasha’s Cauldron of Everything / Eberron: Rising from the
                    Last War
                  </td>
                </tr>
                <tr className="border-b border-zinc-700">
                  <td className="py-2 px-4">Armorer</td>
                  <td className="py-2 px-4">Tasha’s Cauldron of Everything</td>
                </tr>
                <tr className="border-b border-zinc-700">
                  <td className="py-2 px-4">Artillerist</td>
                  <td className="py-2 px-4">
                    Tasha’s Cauldron of Everything / Eberron: Rising from the
                    Last War
                  </td>
                </tr>
                <tr className="border-b border-zinc-700">
                  <td className="py-2 px-4">Battle Smith</td>
                  <td className="py-2 px-4">
                    Tasha’s Cauldron of Everything / Eberron: Rising from the
                    Last War
                  </td>
                </tr>
                <tr className="bg-zinc-800 text-zinc-400">
                  <td
                    className="py-2 px-4 bg-blue-900 text-blue-200"
                    colSpan="2"
                  >
                    Archived Unearthed Arcana
                  </td>
                </tr>
                <tr className="border-b border-zinc-700">
                  <td className="py-2 px-4">Archivist</td>
                  <td className="py-2 px-4">Unearthed Arcana 58 – Artificer</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Armorist</td>
                  <td className="py-2 px-4">
                    Unearthed Arcana 60 – Subclasses, Part 3
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CollapsibleSection>
      </section>
      <section
        id="the-right-tool-for-the-job"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="The Right Tool for the Job">
          <div>
            <p className="text-base">
              At 3rd level, you’ve learned how to produce exactly the tool you
              need: with thieves’ tools or artisan’s tools in hand, you can
              magically create one set of artisan’s tools in an unoccupied space
              within 5 feet of you. This creation requires 1 hour of
              uninterrupted work, which can coincide with a short or long rest.
              Though the product of magic, the tools are nonmagical, and they
              vanish when you use this feature again.
            </p>
          </div>
        </CollapsibleSection>
      </section>
      <section
        id="ability-score-improvement"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Ability Score Improvement">
          <p className="text-base">
            When you reach 4th level, 8th, 12th, 16th, and 19th level, you can
            increase one ability score of your choice by 2, or you can increase
            two ability scores of your choice by 1. As normal, you can’t
            increase an ability score above 20 using this feature.
          </p>
        </CollapsibleSection>
      </section>
      <section
        id="tool-expertise"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Tool Expertise">
          <p className="text-base">
            At 6th level, your proficiency bonus is now doubled for any ability
            check you make that uses your proficiency with a tool.
          </p>
        </CollapsibleSection>
      </section>
      <section
        id="flash-of-genius"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Flash of Genius">
          <p className="text-base">
            At 7th level, you’ve gained the ability to come up with solutions
            under pressure. When you or another creature you can see within 30
            feet of you makes an ability check or a saving throw, you can use
            your reaction to add your Intelligence modifier to the roll. You can
            use this feature a number of times equal to your Intelligence
            modifier (minimum of once). You regain all expended uses when you
            finish a long rest.
          </p>
        </CollapsibleSection>
      </section>
      <section
        id="magic-item-adept"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Magic Item Adept">
          <p className="text-base">
            When you reach 10th level, you achieve a profound understanding of
            how to use and make magic items:
          </p>
          <ul className="list-disc list-inside ml-4 text-base">
            <li>You can attune up to four magic items at once.</li>
            <li>
              If you craft a magic item with a rarity of common or uncommon, it
              takes you a quarter of the normal time, and it costs you half as
              much.
            </li>
          </ul>
        </CollapsibleSection>
      </section>

      <section
        id="spell-storing-item"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Spell-Storing Item">
          <p className="text-base">
            At 11th level, you can now store a spell in an object. Whenever you
            finish a long rest, you can touch one simple or martial weapon or
            one item that you can use as a spellcasting focus, and you store a
            spell in it, choosing a 1st- or 2nd-level spell from the artificer
            spell list that requires 1 action to cast (you don’t need it
            prepared).
          </p>
          <p className="text-base">
            While holding the object, a creature can use an action to produce
            the spell’s effect from it, using your spellcasting ability
            modifier. If the spell requires concentration, the creature must
            concentrate. The spell stays in the object until it’s been used a
            number of times equal to twice your Intelligence modifier (minimum
            of twice), or until you use this feature again to store a spell in
            an object.
          </p>
        </CollapsibleSection>
      </section>
      <section
        id="magic-item-savant"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Magic Item Savant">
          <p className="text-base">
            At 14th level, your skill with magic items deepens more:
          </p>
          <ul className="list-disc list-inside ml-4 text-base">
            <li>You can attune up to five magic items at once.</li>
            <li>
              You ignore all class, race, spell, and level requirements on
              attuning to or using a magic item.
            </li>
          </ul>
        </CollapsibleSection>
      </section>
      <section
        id="magic-item-master"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Magic Item Master">
          <p className="text-base">
            Starting at 18th level, you can attune up to six magic items at
            once.
          </p>
        </CollapsibleSection>
      </section>
      <section
        id="soul-of-artifice"
        className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
      >
        <CollapsibleSection title="Soul of Artifice">
          <p className="text-base">
            At 20th level, you develop a mystical connection to your magic
            items, which you can draw on for protection:
          </p>
          <ul className="list-disc list-inside ml-4 text-base">
            <li>
              You gain a +1 bonus to all saving throws per magic item you are
              currently attuned to.
            </li>
            <li>
              If you’re reduced to 0 hit points but not killed outright, you can
              use your reaction to end one of your artificer infusions, causing
              you to drop to 1 hit point instead of 0.
            </li>
          </ul>
        </CollapsibleSection>
      </section>
    </div>
  );
}

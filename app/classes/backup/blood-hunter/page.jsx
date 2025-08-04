import BloodHunterTable from "./BloodHunterTable";
import BloodHunterFeatures from "./BloodHunterFeatures";
import ClassHeader from "@/components/ClassHeaderName";
export default function BloodHunterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-[#0f172a] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-left border-b border-gray-700 pb-2">
           <ClassHeader className="blood hunter" />
        </header>

        <section className="text-gray-300 space-y-4">
          <p className="italic font-medium">
            Blood hunters are clever warriors driven by an unending
            determination to destroy evils old and new. Armed with rites of
            secretive blood magic and a willingness to sacrifice their own
            vitality and humanity for their cause, they protect the realms from
            the shadows — even as they remain ever vigilant against being drawn
            to the darkness that consumes the monsters they hunt.
          </p>

          <p className="text-sm text-gray-400 italic">Source: DND Beyond</p>

          <p className="text-sm text-gray-400">
            <em>
              You must have an Intelligence score of 13 or higher and a Strength
              or Dexterity score of 13 or higher in order to multiclass in or
              out of this class.
            </em>
          </p>

          <p className="text-sm text-gray-400">
            <em>
              If your blood hunter is part of the Order of the Profane Soul and
              also has warlock levels, add one-third of your blood hunter levels
              (rounded down) to your warlock level and consult the warlock
              progression table for total spell slots, cantrips known, and spell
              slot level. You should consider aligning your Otherworldly Patron
              feature between both classes, but your DM might allow you to have
              two different patrons at their discretion.
            </em>
          </p>

          <p className="text-sm text-gray-400">
            <strong>Variant Hemocraft Ability Score:</strong>{" "}
            <em>
              As a blood hunter, you use your Intelligence modifier for some of
              your class and subclass features. However, with your DM’s
              permission, you can choose to instead use your Wisdom modifier for
              all your blood hunter features that use your Intelligence modifier
              by default.
            </em>
          </p>
        </section>

        <div>
          <BloodHunterTable />
        </div>
        <div>{/* <BloodHunterFeatures /> */}</div>
      </div>
    </main>
  );
}

import universalLinks from "@/data/hyperlink/universal.json";
import raceLinks from "@/data/hyperlink/races.json";
// import featsLinks from "@/data/hyperlink/feats.json";
// import backgroundsLinks from "@/data/hyperlink/backgrounds.json";
import classesLinks from "@/data/hyperlink/classes.json";

const sourcesMap = {
  universal: universalLinks,
  races: raceLinks,
  //   feats: featsLinks,
  //   backgrounds: backgroundsLinks,
    classes: classesLinks,
};

export function linkifyText(text, classNameString = "") {
  if (!text) return "";

  let result = text;
  const classes = classNameString.split(" ");

  Object.entries(sourcesMap).forEach(([key, links]) => {
    if (classes.includes(`${key}Link`)) {
      Object.keys(links).forEach((word) => {
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`\\b${escaped}\\b`, "g");

        result = result.replace(
          regex,
          `<a href="${links[word]}" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline hover:text-blue-300">${word}</a>`
        );
      });
    }
  });

  return result;
}

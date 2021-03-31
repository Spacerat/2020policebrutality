const categories = {
  press: [
    "reporter",
    "journalist",
    "CNN",
    "LA-Times",
    "news crew",
    "newscrew",
    "interview",
    "photographer",
    "press ", // TODO: also match at end of title
    "the press",
    "BBC",
  ],
  filming: ["filming", "people trying to record", "attempting to record"],
  teargas: ["teargas", "tear gas", "tear-gas", "Law enforcement gas"],
  grenades: ["grenade", "flashbang"],
  child: ["child"],
  killing: ["killed"],
  shooting: ["shot", "bullet", "fire on", "shoot", "impact munitions"],
  destruction: ["confiscate medical supplies", "smashing water"],
  pepperspray: ["pepperspray", "pepper spray", "pepper-spray"],
};

export default categories;

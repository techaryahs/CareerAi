// src/utils/jobMatcher.js
function matchJobPaths(userData, paths) {
  const age = parseInt(userData.age, 10) || 0;
  const userInterests = Array.isArray(userData.interests)
    ? userData.interests
    : [];

  const droppedDegree = (userData.degree || "").toLowerCase().trim();

  console.log("JOB matcher userInterests:", userInterests);
  console.log("JOB matcher all paths count:", paths.length);

  return paths.filter((path) => {
    const ageOk =
      !age || (age >= path.minAge && age <= (path.maxAge || 100));

    const lowerSelected = userInterests.map((i) => i.toLowerCase());
    const lowerSuitable = (path.suitableInterests || []).map((i) =>
      i.toLowerCase()
    );

    const interestsOk =
      lowerSelected.length === 0 ||
      lowerSuitable.some((i) => lowerSelected.includes(i));

    const name = path.name.toLowerCase();
    const tagsText = (path.tags || []).join(" ").toLowerCase();

    const degreeKeywords = droppedDegree
      ? droppedDegree
          .split(/[\s/(),]+/)
          .map((k) => k.toLowerCase())
          .filter((k) => k.length > 2)
      : [];

    const isSameDegree =
      degreeKeywords.length > 0 &&
      degreeKeywords.some(
        (kw) => name.includes(kw) || tagsText.includes(kw)
      );

    const degreeOk = !isSameDegree;

    const keep = ageOk && interestsOk && degreeOk;

    console.log("JOB path check:", {
      id: path.id,
      name: path.name,
      ageOk,
      interestsOk,
      degreeOk,
      keep,
      suitableInterests: path.suitableInterests,
    });

    return keep;
  });
}

export default matchJobPaths;

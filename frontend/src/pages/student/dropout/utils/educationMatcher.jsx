// src/utils/educationMatcher.js
function matchEducationPaths(userData, paths) {
  console.log("EDU userData in matcher:", userData);

  const age = parseInt(userData.age, 10) || 0;
  const userInterests = Array.isArray(userData.interests)
    ? userData.interests
    : [];

  const droppedDegree = (userData.degree || "").toLowerCase().trim();

  return paths.filter((path) => {
    // 1) Interests: if any selected → at least one must match
    const interestsOk =
      userInterests.length === 0 ||
      path.interests.some((i) => userInterests.includes(i));

    // 2) Age (optional)
    const ageOk =
      !age ||
      !path.minAge ||
      (age >= path.minAge && age <= (path.maxAge || 100));

    // 3) EXCLUDE paths related to the dropped degree (generic)
    const name = path.name.toLowerCase();
    const routeText = (path.educationRoute || []).join(" ").toLowerCase();
    const careersText = (path.careerOptions || []).join(" ").toLowerCase();

    const degreeKeywords = droppedDegree
      ? droppedDegree
          .split(/[\s/(),]+/)
          .map((k) => k.toLowerCase())
          .filter((k) => k.length > 2)
      : [];

    const isSameDegree =
      degreeKeywords.length > 0 &&
      degreeKeywords.some(
        (kw) =>
          name.includes(kw) ||
          routeText.includes(kw) ||
          careersText.includes(kw)
      );

    const degreeOk = !isSameDegree;

    console.log("EDU", path.id, { interestsOk, ageOk, degreeOk });

    return interestsOk && ageOk && degreeOk;
  });
}

export default matchEducationPaths;

// ResultsList.jsx
import React from "react";
import EducationPathCard from "./EducationPathCard";
import JobPathCard from "./JobPathCard";

const ResultsList = ({ paths, type, onViewDetails }) => {
  if (!paths || paths.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {paths.map((path, index) =>
        type === "education" ? (
          <EducationPathCard
            key={path.id + "-" + index}
            path={path}
            onViewDetails={onViewDetails}
          />
        ) : (
          <JobPathCard
            key={path.id + "-" + index}
            path={path}
            onViewDetails={onViewDetails}
          />
        )
      )}
    </div>
  );
};

export default ResultsList;

import { BestPractice } from "../shared/sharedTypes";
import styles from "../styles/Results.module.css";
import Link from "next/link";
import LinkIcon from "@mui/icons-material/Link";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import Chip from "@mui/material/Chip";
import useLocalStorage from "use-local-storage";

export const fieldNames = [
  "paperName",
  "paperLink",
  "cohorts",
  "subCohorts",
  "keywords",
  "targetAudience",
  "findings",
  "summary",
  "notes",
  "bestPractices",
  "methodology",
  "tools",
  "terminology",
  "notesOfCaution",
  "relatedPapers",
];

export const humanReadableFieldNames = {
  paperName: "Paper name",
  paperLink: "Link to paper",
  cohorts: "Cohorts",
  subCohorts: "Sub-cohorts",
  keywords: "Keywords",
  targetAudience: "Target audience",
  findings: "Findings",
  summary: "Summary",
  notes: "Notes",
  bestPractices: "Best practices",
  methodology: "Methodology used",
  tools: "Tools used",
  terminology: "Terminology",
  notesOfCaution: "Notes of caution",
  relatedPapers: "Related papers",
};

const displayField = (
  fieldData: string | string[] | undefined,
  fieldName: string
) => {
  if (fieldName === "paperLink") {
    return (
      <a
        href={fieldData as string}
        style={{ textDecoration: "underline" }}
        target="_BLANK"
        rel="noreferrer"
      >
        {fieldData}
      </a>
    );
  }

  if (fieldData === undefined) {
    return "[none]";
  } else if (Array.isArray(fieldData)) {
    return fieldData.map((name: string) => <Chip key={name} label={name} />);
  } else {
    return <pre className="font-sans whitespace-pre-wrap">{fieldData}</pre>;
  }
};

interface Props {
  bestPractice: BestPractice;
}

const BestPracticeDisplay = ({ bestPractice }: Props) => {
  const [favourites, setFavourites] = useLocalStorage(
    "favourited-best-practices",
    {}
  );

  const toggleFavourited = (bestPracticeId: string) =>
    setFavourites((prev) => ({
      ...prev,
      [bestPracticeId]:
        !(prev ?? {})[bestPracticeId as keyof typeof prev] ?? true,
    }));

  const isFavourited = (bestPracticeId: string) =>
    bestPracticeId in favourites &&
    favourites[bestPracticeId as keyof typeof favourites] === true;

  if (bestPractice === undefined) {
    return null;
  }

  return (
    <div className={styles.bestPractice} key={bestPractice.id}>
      <div className="flex">
        <div className="pr-3">
          <Link href={`/bestPractice/${bestPractice.id}`}>
            <div>
              <LinkIcon sx={{ cursor: "pointer" }}></LinkIcon>&#9;&#9;Permalink
            </div>
          </Link>{" "}
        </div>
        <button onClick={() => toggleFavourited(bestPractice.id)}>
          {isFavourited(bestPractice.id) ? <div><StarIcon />Unfavourite</div> : <div><StarOutlineIcon />Favourite</div>}
        </button>
      </div>
      {fieldNames
        .filter(
          (fieldName: string) =>
            bestPractice[fieldName as keyof typeof bestPractice] !==
            undefined &&
            JSON.stringify(
              bestPractice[fieldName as keyof typeof bestPractice]
            ) !== "[]"
        )
        .map((fieldName: string) => (
          <div key={`best-practice-${bestPractice.id}-${fieldName}`}>
            <h3 className="pt-5 font-bold">
              {
                humanReadableFieldNames[
                fieldName as keyof typeof humanReadableFieldNames
                ]
              }
            </h3>
            {displayField(
              bestPractice[fieldName as keyof typeof bestPractice],
              fieldName
            )}
          </div>
        ))}
    </div>
  );
};

export default BestPracticeDisplay;

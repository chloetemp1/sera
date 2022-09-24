const path = require("path");
const fs = require("fs/promises");
const {
  default: readExcelFile,
  readSheetNames,
  parseExcelDate,
} = require("read-excel-file/node");
const sha1 = require("sha1");

console.log(readExcelFile, readSheetNames, parseExcelDate);

const fileName = "../framework/spreadsheet/Tool Content.xlsx";
const filePath = path.join(__dirname, fileName);

const writeFolder = path.join(
  __dirname,
  "../framework/content-researchers/bestPractices"
);
const writeFileName = "bestPractices.yaml";
const writeFilePath = path.join(writeFolder, writeFileName);

const schema = {
  "Paper Name": {
    prop: "paperName",
  },
  "Paper Link": {
    prop: "paperLink",
  },
  Cohorts: {
    prop: "cohorts",
  },
  "Sub-cohorts": {
    prop: "subCohorts",
  },
  Keywords: {
    prop: "keywords",
  },
  "Target Audience": {
    prop: "targetAudience",
  },
  Findings: {
    prop: "findings",
  },
  Summary: {
    prop: "summary",
  },
  Notes: {
    prop: "notes",
  },
  "Best Practices": {
    prop: "bestPractices",
  },
  "Methodology Used": {
    prop: "methodology",
  },
  "Tools Used": {
    prop: "tools",
  },
  Terminology: {
    prop: "terminology",
  },
  "Notes of Caution": {
    prop: "notesOfCaution",
  },
  "Related Papers": {
    prop: "relatedPapers",
  },
};

const run = async () => {
  const sheetNames = await readSheetNames(filePath);

  console.log(sheetNames);

  const bestPracticesPerSheet = await Promise.all(
    sheetNames.map(async (sheetName: string, i: number) => {
      if (i > 0) {
        return;
      }

      const data = await readExcelFile(filePath, { sheet: sheetName, schema });

      console.log(data);

      return data;
    })
  );

  const bestPractices = bestPracticesPerSheet.flat()[0].rows;

  const bestPracticesWithIds = bestPractices.map((bestPractice: any) => ({
    ...bestPractice,
    id: sha1(JSON.stringify(bestPractice)).substring(0, 8),
  }));

  await fs.mkdir(writeFolder, { recursive: true });

  await fs.writeFile(writeFilePath, JSON.stringify(bestPracticesWithIds));
};

run();

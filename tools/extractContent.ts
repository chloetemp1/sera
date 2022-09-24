const path = require("path");
const fs = require("fs/promises");
const yaml = require('yaml');
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

const schema = {
  "Paper Name": {
    prop: "paperName",
    required: true,
  },
  "Paper Link": {
    prop: "paperLink",
    required: true,
  },
  Cohorts: {
    prop: "cohorts",
    required: true,
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

const writeBestPractices = async (bestPracticesWithIds: any[]) => {
    await Promise.all(
        bestPracticesWithIds.map(async (bestPractice: any) => {
            const yamlData = yaml.stringify(bestPractice);
    
          await fs.writeFile(
            path.join(writeFolder, `${bestPractice.id}.yaml`),
            yamlData,
          );
        })
      );
}

const run = async () => {
  const sheetNames = await readSheetNames(filePath);

  console.log(sheetNames);

  const bestPracticesPerSheet = await Promise.all(
    sheetNames.map(async (sheetName: string, i: number) => {
      if (i > 0) {
        return;
      }

      const data = await readExcelFile(filePath, { sheet: sheetName, schema });

      return data;
    })
  );

  const bestPractices = bestPracticesPerSheet.flat()[0].rows;

  const bestPracticesWithIds = bestPractices.map((bestPractice: any) => ({
    ...bestPractice,
    cohorts: bestPractice.cohorts.toLowerCase().split(', '),
    subCohorts: bestPractice.subCohorts?.toLowerCase().split(', '),
    keywords: bestPractice.keywords?.toLowerCase().split(', '),
    id: sha1(JSON.stringify(bestPractice)).substring(0, 8),
  }));

  await fs.mkdir(writeFolder, { recursive: true });

  await writeBestPractices(bestPracticesWithIds);
};

run();

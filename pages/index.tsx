import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import content from '../framework/compiledContent';
import { Layout } from "../layouts/Layout";
import Filters from "../components/Filters";
import Results from "../components/Results";
import { CLIENT_ID, REDIRECT_URI } from "../config";

const Home: NextPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [filterCohorts, setFilterCohorts] = useState<Set<string>>(new Set());
  const filterRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {if (showFilters && filterRef.current) {
    filterRef.current.scrollIntoView({ behavior: "smooth" })
  }}, [showFilters, filterRef]);
  const [filterSubCohorts, setFilterSubCohorts] = useState<Set<string>>(
    new Set()
  );
  const [filterKeywords, setFilterKeywords] = useState<Set<string>>(new Set());

  useEffect(() => {if (showResults && resultsRef.current) {
    resultsRef.current.scrollIntoView({ behavior: "smooth" })
  }}, [showResults, resultsRef]);

  return (
    <Layout title="Persona | Software Engineering User Research Tool">

      <main className="max-w-3xl">
       
       <div className="flex flex-col items-center justify-center pb-36 space-y-44 h-[calc(100vh-48px)]">
        <h1 className="text-6xl font-bold">Persona</h1>

        <p className="text-xl text-center">
          Persona is a tool to help <b>software engineering researchers</b>{" "}
          better understand the diverse cohorts they are studying, and to share
          best practices for conducting research with various user cohorts.
        </p>

        <button onClick={() => setShowFilters(true)}>Get Started</button>

        </div>

        {showFilters && (
          <div className="flex flex-col items-center justify-center min-h-screen pt-44 pb-36" ref={filterRef}>
            <Filters
              cohorts={content.cohorts}
              subCohorts={content.metadata[0].subCohorts}
              keywords={content.metadata[0].keywords}
              filterCohorts={filterCohorts}
              setFilterCohorts={setFilterCohorts}
              filterSubCohorts={filterSubCohorts}
              setFilterSubCohorts={setFilterSubCohorts}
              filterKeywords={filterKeywords}
              setFilterKeywords={setFilterKeywords}
              onClick={() => setShowResults(true)}
            />
          </div>
        )}

        {showResults && (
          <div className="flex flex-col items-center justify-center min-h-screen pt-44" ref={resultsRef}>
            <Results
              content={content}
              filterCohorts={filterCohorts}
              filterSubCohorts={filterSubCohorts}
              filterKeywords={filterKeywords}
            />
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Home;

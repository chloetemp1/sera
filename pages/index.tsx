import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import content from '../framework/compiledContent';
import { BestPracticeKind } from "../shared/sharedTypes";
import { Layout } from "../layouts/Layout";
import Filters from "../components/Filters";
import Results from "../components/Results";



const Home: NextPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [filterCohorts, setFilterCohorts] = useState<Set<string>>(new Set());
  const filterRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const [filterBestPracticesKinds, setFilterBestPracticesKinds] = useState<
    Set<BestPracticeKind>
  >(new Set());

  useEffect(() => {if (showFilters && filterRef.current) {
    filterRef.current.scrollIntoView({ behavior: "smooth" })
  }}, [showFilters, filterRef]);


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
          <div className="flex flex-col items-center justify-center h-screen pb-36" ref={filterRef}>
            <Filters
              cohorts={content.cohorts}
              filterCohorts={filterCohorts}
              setFilterCohorts={setFilterCohorts}
              filterBestPracticesKinds={filterBestPracticesKinds}
              setFilterBestPracticesKinds={setFilterBestPracticesKinds}
              onClick={() => setShowResults(true)}
            />
          </div>
        )}

        {showResults && (
          <div className="flex flex-col items-center justify-center h-screen" ref={resultsRef}>
            <Results
              content={content}
              filterCohorts={filterCohorts}
              filterBestPracticesKinds={filterBestPracticesKinds}
            />
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Home;

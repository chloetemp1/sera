import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Filters from "./Filters";
import { useState } from "react";
import Results from "./Results";
import content from '../framework/compiledContent';
import { BestPracticeKind } from "../shared/sharedTypes";
import queryString from 'query-string';
import { CLIENT_ID, REDIRECT_URI } from "../config";

const Home: NextPage = () => {
  const [filterCohorts, setFilterCohorts] = useState<Set<string>>(new Set());

  const [filterBestPracticesKinds, setFilterBestPracticesKinds] = useState<
    Set<BestPracticeKind>
  >(new Set());

  const params = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
  }

  const queryStringified = queryString.stringify(params);

  return (
    <div className={styles.container}>
      <Head>
        <title>Persona | Software Engineering User Research Tool</title>
        <meta
          name="description"
          content="Software engineering user research tool"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <a href={`https://github.com/login/oauth/authorize?${queryStringified}`}>Log in with Github</a>

      <main className={styles.main}>
        <h1 className={styles.title}>Persona</h1>

        <p className={styles.description}>
          Persona is a tool to help <b>software engineering researchers</b>{" "}
          better understand the diverse cohorts they are studying, and to share
          best practices for conducting research with various user cohorts.
        </p>

        <Filters
          cohorts={content.cohorts}
          filterCohorts={filterCohorts}
          setFilterCohorts={setFilterCohorts}
          filterBestPracticesKinds={filterBestPracticesKinds}
          setFilterBestPracticesKinds={setFilterBestPracticesKinds}
        />

        <Results
          content={content}
          filterCohorts={filterCohorts}
          filterBestPracticesKinds={filterBestPracticesKinds}
        />
      </main>
    </div>
  );
};

export default Home;

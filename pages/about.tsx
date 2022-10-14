import { Layout } from '../layouts/Layout';

const AboutPage = () => {
  return (
    <Layout title="Persona | Favourites" backButtonVisible={true}>
      <div>
        <p className="pb-5 text-3xl font-bold text-center">About SERA</p>
        <div className="flex flex-col items-center">
          <div className="flex flex-col text-xl text-center gap-9 max-w-prose">
            <p>
              SERA is an acronym for: Software Engineering Research Assistant,
              but it is more than just a catchy abbreviation. This tool was
              developed by a student team at Monash University in response to
              addressing the challenge of finding best practices, tools, and
              methodologies when preparing to conduct human centric studies.
            </p>
            <p>
              Software engineering research often involves interaction with
              human participants at different stages throughout the software
              development life cycle. All human participants possess differences
              in various human aspects such as age, gender, culture, physical
              and cognitive challenges. Typically, researchers rely on their own
              experience, the experience of their colleagues, or information
              found through a time-consuming investigation on how to best
              interact with different groups of people.
            </p>
            <p>
              There are a number of issues associated with those sources. Some
              information or ethical considerations may be missed, older
              techniques may no longer apply (particularly in the new COVID-era
              of online human centric research), the required knowledge may not
              be accessible, and it can be time consuming to mitigate all these
              risks.
            </p>
            <p>
              The aim is to make SERADiPITy the prime source for researchers
              (particularly software engineering researchers) to find advice on
              how to work with various groups of people. It allows researchers
              to specify their archetype of focus, and easily find information
              on how to best interact with and study that group of people.
              Additionally, researchers will be able to submit their own content
              to give advice to their peers, creating an open community of
              knowledge sharing.
            </p>
            <p>Developed for the betterment of human centric studies.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;

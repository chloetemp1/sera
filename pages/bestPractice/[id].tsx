import content from '../../framework/compiledContent';
import { useRouter } from "next/router";
import Link from "next/link";
import BestPracticeDisplay from "../../components/BestPracticeDisplay";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Layout } from "../../layouts/Layout";

const BestPractice = () => {
  const router = useRouter()
  const { id } = router.query;

  const bestPractice = content.bestPractices.find((bestPractice) => bestPractice.id === id);

  if (bestPractice === undefined) {
    return null;
  }

  return (
    <Layout title="Persona | Software Engineering User Research Tool">
      <div className="flex flex-col dark:bg-black">
        <div className="px-4 mt-10 font-bold row grid place-content-center place-content-center">
          <div className="px-4 mt-4 font-bold row rounded-full absolute">
            <Link href="/">
              <a className=""><ArrowBackIosIcon sx={{ cursor: "pointer" }}></ArrowBackIosIcon>Back</a>
            </Link>
          </div>
          <h1 className="px-10 inline text-3xl">{bestPractice.summary ? bestPractice.summary : bestPractice.paperName}</h1></div>
        <BestPracticeDisplay bestPractice={bestPractice} />
      </div>
    </Layout>
  );
};

export default BestPractice;

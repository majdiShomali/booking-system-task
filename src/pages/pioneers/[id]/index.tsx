import type { NextPage, GetServerSideProps } from "next";
import BookSessionForm from "./components/booking-session-form";

interface PioneerPageProps {
  id: string;
}

const PioneerPage: NextPage<PioneerPageProps> = ({ id }) => {
  return (
    <section className="h-full w-full">
      <div className="mb-5 bg-accent p-5 text-center">
        <h1 className="mb-4 text-center text-4xl font-bold">
          اختر التاريخ و الوقت المناسب
        </h1>
        <p className="mb-6 text-right text-xl"></p>
      </div>
      <BookSessionForm id={id} />
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  return {
    props: { id },
  };
};

export default PioneerPage;

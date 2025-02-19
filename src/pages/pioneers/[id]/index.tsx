import type { NextPage } from "next";
import BookSessionForm from "./components/book-session-form";

const PioneerPage: NextPage = () => {
  return (
    <section className="h-full w-full">
      <div className="mb-5 bg-accent p-5 text-center">
        <h1 className="mb-4 text-center text-4xl font-bold">
           اختر التاريخ و الوقت المناسب
        </h1>
        <p className="mb-6 text-right text-xl"></p>
      </div>
      <BookSessionForm />
    </section>
  );
};

export default PioneerPage;

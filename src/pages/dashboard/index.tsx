import PioneerSessionForm from "./components/pioneer-session-form";

export default function DashboardPage() {
  return (
    <section className="h-full w-full">
      <div className="mb-5 bg-accent p-5 text-center">
        <h1 className="mb-4 text-center text-4xl font-bold">
          اضف مواعيد جديدة
        </h1>
        <p className="mb-6 text-right text-xl"></p>
      </div>
      <PioneerSessionForm />
    </section>
  );
}

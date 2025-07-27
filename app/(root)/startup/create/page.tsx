import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container !min-h-[280px]">
        <h1 className="heading">Submit Your Startup</h1>
        <p className="sub-heading">
          Share your innovative idea with the entrepreneurial community
        </p>
      </section>

      <StartupForm />
    </>
  );
};

export default Page;

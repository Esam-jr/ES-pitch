import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Lightbulb, Target, Users, TrendingUp } from "lucide-react";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="hero-container !min-h-[400px]">
        <div className="hero-badge">
          <Lightbulb className="w-4 h-4 mr-2" />
          <span>Share Your Vision</span>
        </div>
        
        <h1 className="hero-title !text-4xl md:!text-5xl">
          Submit Your Startup Pitch
        </h1>
        
        <p className="hero-subtitle">
          Share your innovative idea with our entrepreneurial community. Get valuable feedback, connect with potential collaborators, and turn your vision into reality.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="section-container bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-neutral-900 mb-12">
            Why Share Your Startup Idea?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Get Feedback
              </h3>
              <p className="text-neutral-600">
                Receive valuable insights and constructive feedback from experienced entrepreneurs and potential customers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Find Collaborators
              </h3>
              <p className="text-neutral-600">
                Connect with like-minded individuals, potential co-founders, and team members who share your vision.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-success-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Gain Visibility
              </h3>
              <p className="text-neutral-600">
                Showcase your idea to a community of entrepreneurs, investors, and industry professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StartupForm />
    </>
  );
};

export default Page;
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react"; // Using Lucide icon

export default function EduSkillsAboutSection() {
  return (
    <section className="w-full py-6 md:py-20 lg:py-14">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 md:px-6 items-start min-h-[600px] align-center">
        {/* LEFT SIDE - Text */}
        <div className="space-y-4 flex flex-col justify-center">
          <Badge variant="outline" className="text-lg px-4 py-1 rounded-full bg-brand_orange text-white">
            About the 2nd Edition of EduSkills HR Summit & Awards 2025
          </Badge>

          <h2 className="text-2xl md:text-2xl tracking-tight text-blue-800">
            Empowering the Future of Work, Today
          </h2>

          <p className="text-gray-700 text-base md:text-sm leading-relaxed text-justify">
            The EduSkills HR Talent Community, in collaboration with <strong>AICTE, Ministry of Education</strong>, proudly presents the <strong>2nd Edition of the EduSkills HR Summit & Awards 2025</strong> — a national flagship initiative that convenes <strong>HR visionaries, academic leaders, policy architects, and industry pioneers</strong> to co-create the future of India’s talent ecosystem.
          </p>

          <p className="text-gray-700 text-base md:text-sm leading-relaxed text-justify">
            Following the resounding success of its inaugural edition, the 2025 summit returns with greater ambition — promising <strong>transformative insights, strategic partnerships, and recognition of HR excellence</strong> that is actively driving innovation across sectors.
          </p>

          <p className="text-blue-800 text-base md:text-sm leading-relaxed text-justify font-bold italic">
            Theme: “AI for AI – Artificial Intelligence for Academia & Industry”
          </p>

          <p className="text-gray-700 text-base md:text-sm leading-relaxed text-justify">
            This year’s theme highlights the disruptive potential of AI in reimagining the future of human capital. From intelligent talent acquisition to data-driven learning pathways, the summit will deep-dive into how AI is shaping workforce readiness, institutional transformation, and inclusive growth.
          </p>

          <p className="text-gray-700 text-base md:text-sm leading-relaxed text-justify">
            Set against the serene backdrop of <strong>Shimla</strong>, the summit offers an immersive platform for <strong>dialogue, discovery, and distinction</strong> — celebrating HR leaders and institutions who are leading with empathy, innovation, and strategic foresight.
          </p>

          <p className="text-gray-700 text-base md:text-sm leading-relaxed text-justify">
            Join us for a defining experience that bridges academia and industry, technology and talent, vision and action.
          </p>
        </div>

        {/* RIGHT SIDE - Highlight Points */}
        <div className="relative border-l-4 border-brand_blue space-y-2 pl-6 flex flex-col justify-center">
          <Badge variant="outline" className="text-lg px-4 py-1 rounded-full bg-brand_orange text-white">
            What Sets This Summit Apart?
          </Badge>

          {[
            {
              title: "Visionary Dialogues",
              desc: "Hard-hitting, future-focused conversations led by top CHROs, business leaders, and HR strategists—no theory, just real impact.",
            },
            {
              title: "Innovation Pods",
              desc: "Participate in high-impact breakout sessions focused on solving real HR challenges with bold, tech-enabled solutions.",
            },
            {
              title: "Real-World Insights & Frameworks",
              desc: "Hear firsthand how companies are applying AI, automation, and people analytics to enhance productivity, agility, and employee well-being.",
            },
            {
              title: "Next-Gen HR Awards",
              desc: "Honoring those who are pushing boundaries, redefining roles, and driving people-powered performance at scale.",
            },
            {
              title: "People + Technology + Purpose",
              desc: "Discover how to build HR ecosystems that blend automation with empathy, and strategy with soul—for a workforce that thrives.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md ${idx % 2 === 0 ? "bg-blue-50" : "bg-orange-50"}`}
            >
              <div className="flex items-start gap-2">
                <CheckCircle className="text-brand_orange mt-1" size={20} />
                <div>
                  <h3 className="text-blue-900 font-semibold text-base">{item.title}</h3>
                  <p className="text-gray-700 text-sm">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
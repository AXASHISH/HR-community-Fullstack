import { Award, BookOpenCheck, MessageSquareText } from "lucide-react";

const features = [
  {
    title: "Learning Management System",
    label: "LMS",
    icon: BookOpenCheck,
    accent: "from-[#1161A0] to-[#0b87bd]",
    description:
      "Structured learning tracks, expert-led resources, and progress-focused programs designed for HR community members.",
    points: ["Role-based HR learning paths", "Certificates and resource library", "Member-only skill programs"],
  },
  {
    title: "Community Chat",
    label: "Connect",
    icon: MessageSquareText,
    accent: "from-[#F47B34] to-[#f59f26]",
    description:
      "A focused space for HR leaders to exchange ideas, ask questions, and stay connected with peers.",
    points: ["Topic-wise member discussions", "Peer support and knowledge sharing", "Announcements and updates"],
  },
  {
    title: "Awards Section",
    label: "Recognize",
    icon: Award,
    accent: "from-[#18324f] to-[#1161A0]",
    description:
      "A dedicated hub for nominations, jury updates, voting activity, and recognition moments across the community.",
    points: ["Nomination and award updates", "Voting and finalist visibility", "Winner stories and highlights"],
  },
];

const MemberFeatures = () => {
  return (
    <section id="member-features" className="bg-[#F8FBFE] py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1161A0]">
            Member Experience
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Built for learning, connection, and recognition
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            A richer digital space for community members to grow their HR practice,
            collaborate with peers, and participate in award journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`h-2 bg-gradient-to-r ${feature.accent}`} />
                <div className="p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${feature.accent} text-white shadow-lg`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-[#1161A0]">
                      {feature.label}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 min-h-[96px] text-sm leading-6 text-gray-600">
                    {feature.description}
                  </p>

                  <div className="mt-6 space-y-3">
                    {feature.points.map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[#F47B34]" />
                        <p className="text-sm font-medium text-gray-700">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MemberFeatures;

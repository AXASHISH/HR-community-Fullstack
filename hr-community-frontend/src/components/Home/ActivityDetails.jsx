import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Footer } from 'react-day-picker';
import AppFooter from '../../pages/Footer';

const ActivityDetail = () => {
    const { id } = useParams();

    const activities = [
        {
            id: 1,
            title: "HR Development Programs (HRDP)",
            description: "The HR Development Programs (HRDP) under the EduSkills HR Talent Community are meticulously curated learning tracks designed to upskill and empower HR professionals across all levels. These programs are built to address the evolving needs of the human resource function in the age of digital transformation, hybrid work models, and skills-based talent strategies. With a focus on practical application, industry relevance, and global best practices, HRDP offers participants a unique opportunity to stay ahead of the curve in a rapidly changing HR landscape",
            extendedDescription: "The HR Development Programs (HRDP) are a cornerstone of professional growth for HR practitioners, offering a blend of foundational, intermediate, and advanced learning tracks. These programs are co-developed with industry leaders and academic institutions to ensure alignment with current and future HR demands. Participants engage in immersive learning experiences, including virtual reality-based simulations, peer-to-peer coaching, and capstone projects that address real-world HR challenges. HRDP also provides mentorship from seasoned CHROs and access to a global network of HR professionals, fostering collaboration and innovation.",
            image: "https://media.istockphoto.com/id/1172797625/photo/corporate-law.webp?a=1&b=1&s=612x612&w=0&k=20&c=QYsOtslrX0WZ4f-3_w2L3D6DgRz8KUzzqvzu0vixjkA=",
            highlights: [
                {
                    subtitle: "Competency-Based Curriculum",
                    text: "Each program is aligned to specific HR competencies —ranging from talent acquisition, employee engagement, HR analytics, DEI (Diversity, Equity, Inclusion), learning & development, and strategic workforce planning."
                },
                {
                    subtitle: "Global Certifications & Credentials",
                    text: "Participants gain access to international certification pathways and micro-credentials from leading universities and institutions, enhancing both credibility and career mobility."
                },
                {
                    subtitle: "Experiential Learning Modules",
                    text: "Live case studies, simulations, role plays, and real-time problem-solving sessions make learning engaging and application-oriented."
                }
            ],
            additionalHighlights: [
                {
                    subtitle: "Personalized Learning Paths",
                    text: "Tailored learning journeys based on individual career goals and skill gaps, supported by AI-driven assessments."
                },
                {
                    subtitle: "Industry Mentorship",
                    text: "One-on-one guidance from industry veterans to help navigate career transitions and strategic roles."
                }
            ]
        },
        {
            id: 2,
            title: "HR Leadership Magazine",
            description: "HR Leadership Magazine Inspiring Minds. Sharing Wisdom. Shaping the Future. The HR Leadership Magazine is a flagship knowledge-sharing initiative by the EduSkills HR Talent Community, curated exclusively for HR, Talent Acquisition, and Early Careers professionals. It serves as a high-impact platform for showcasing thought leadership, celebrating innovation, and spotlighting transformative practices across the HR ecosystem. This quarterly publication features a rich blend of insights, case studies, interviews, trend analysis, and member contributions, making it an essential read for anyone committed to shaping the future of work.",
            extendedDescription: "Published quarterly, the HR Leadership Magazine is a premier resource for HR professionals seeking to stay informed and inspired. Each issue is curated with contributions from global HR thought leaders, featuring in-depth analyses of emerging trends, interviews with industry pioneers, and success stories from the EduSkills community. The magazine also includes exclusive research reports, interactive digital content, and access to webinars with featured contributors. It’s a platform where ideas converge, fostering dialogue and innovation among HR leaders worldwide.",
            image: "https://media.istockphoto.com/id/1424987910/photo/coworkers-with-stacked-hands-at-the-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=dAFAmmCMY0r4hcBxZMTbUJWMHKTrDnqLMxYTDvBAFhk=",
            highlights: [
                {
                    subtitle: "Expert Columns & Thought Leadership",
                    text: "Articles from CHROs, HR strategists, and industry experts on emerging trends, policy innovations, digital transformation, and leadership development."
                },
                {
                    subtitle: "Research & Insights",
                    text: "Data-driven insights and case studies on the evolving dynamics of talent, DEI, hybrid work, and employee well-being."
                },
                {
                    subtitle: "Member Spotlights",
                    text: "Stories and achievements of HR community members making impactful contributions in their organizations and beyond."
                }
            ],
            additionalHighlights: [
                {
                    subtitle: "Interactive Content",
                    text: "Digital editions with embedded videos, podcasts, and interactive infographics for an engaging reading experience."
                },
                {
                    subtitle: "Global Reach",
                    text: "Distributed to HR professionals across 50+ countries, amplifying the community’s impact."
                }
            ]
        },
        {
            id: 3,
            title: "Cross-Industry Exposure",
            description: "In today’s fast-changing talent landscape, HR innovation thrives on diverse perspectives and inter-sector collaboration. The Cross-Industry Exposure initiative by EduSkills HR Talent Community offers members the opportunity to collaborate with HR leaders from a wide range of sectors—including IT, manufacturing, BFSI, healthcare, education, retail, startups, and government. This initiative is designed to foster learning beyond organizational boundaries, enabling HR professionals to access new approaches, benchmark practices, and design more agile, inclusive, and forward-looking people strategies.",
            extendedDescription: "The Cross-Industry Exposure initiative is a dynamic platform for HR professionals to break silos and gain insights from diverse sectors. Through structured programs like cross-sector secondments, virtual roundtables, and collaborative projects, participants explore innovative HR practices tailored to different industry challenges. The initiative also includes access to a digital knowledge hub with sector-specific case studies, trend reports, and benchmarking data, empowering HR leaders to adopt best practices and drive transformation in their organizations.",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aHJ8ZW58MHx8MHx8fDA%3D",
            highlights: [
                {
                    subtitle: "Pan-Industry Collaboration",
                    text: "Engage with HR leaders from startups to Fortune 500s—sharing insights, learning from sector-specific challenges, and co-developing talent solutions that scale."
                },
                {
                    subtitle: "Best Practice Exchange Forums",
                    text: "Participate in moderated discussion groups, panel talks, and peer learning sessions focused on hiring innovation, employer branding, workforce analytics, and more."
                },
                {
                    subtitle: "Thematic Knowledge Circles",
                    text: "Join focused knowledge circles on emerging themes like AI in HR, future skills, hybrid workforce, and inclusive hiring—curated with leaders across sectors."
                }
            ],
            additionalHighlights: [
                {
                    subtitle: "Cross-Sector Projects",
                    text: "Collaborate on real-world projects addressing common HR challenges across industries."
                },
                {
                    subtitle: "Digital Knowledge Hub",
                    text: "Access a repository of resources, including templates, toolkits, and industry benchmarks."
                }
            ]
        },
        {
            id: 4,
            title: "Future of Work, Workplace & Workforce",
            description: "The world of work is undergoing a seismic transformation driven by emerging technologies, demographic shifts, hybrid models, and evolving workforce expectations. The Future of Work, Workplace & Workforce initiative by EduSkills HR Talent Community is designed to equip HR professionals with the insights, foresight, and tools needed to navigate this transition with confidence and clarity. This initiative helps HR leaders and practitioners stay ahead of the curve by offering a deep dive into macro trends, policy changes, and disruptive innovations shaping the HR landscape—ensuring they are not just reacting to change, but actively driving it.",
            extendedDescription: "The Future of Work, Workplace & Workforce initiative is a forward-thinking program that prepares HR leaders for the next decade of work. Through a combination of research, workshops, and strategic foresight sessions, participants explore topics like AI-driven talent management, gig economy integration, and sustainable workplace design. The initiative also offers access to global thought leaders, proprietary research, and scenario planning tools to help HR professionals anticipate and shape future trends. It’s a roadmap for building resilient, adaptable, and human-centric organizations.",
            image: "https://media.istockphoto.com/id/1172797625/photo/corporate-law.webp?a=1&b=1&s=612x612&w=0&k=20&c=QYsOtslrX0WZ4f-3_w2L3D6DgRz8KUzzqvzu0vixjkA=",
            highlights: [
                {
                    subtitle: "Trend Intelligence & Research Briefs",
                    text: "Regular reports, webinars, and insights focused on the future of jobs, AI in HR, skill shifts, automation, and socio-economic disruptions impacting talent strategies."
                },
                {
                    subtitle: "Global Practices & Future-Ready Models",
                    text: "Access to case studies and models from leading global companies that are redefining organizational culture, leadership, and work design."
                },
                {
                    subtitle: "Hybrid Work & Digital Workplace Strategies",
                    text: "Explore how organizations are adapting to remote, hybrid, and asynchronous work environments—along with tools and frameworks to implement them effectively."
                }
            ],
            additionalHighlights: [
                {
                    subtitle: "Scenario Planning Workshops",
                    text: "Interactive sessions to model future workforce scenarios and develop adaptive strategies."
                },
                {
                    subtitle: "Tech Integration Guides",
                    text: "Practical frameworks for leveraging AI, VR, and analytics in HR processes."
                }
            ]
        },
        {
            id: 5,
            title: "Policy Lab",
            description: "The Policy Lab is a signature initiative of the EduSkills HR Talent Community that brings together HR leaders, policy thinkers, legal experts, and academic partners to co-develop, evaluate, and benchmark human resource policies aligned with the future of work. In an era of constant disruption and changing workforce expectations, organizations must rethink their policies on flexibility, well-being, inclusion, and hiring. The Policy Lab serves as a collaborative sandbox where members can experiment, exchange, and evolve HR frameworks that are not only compliant and forward-thinking — but also people-centric and inclusive.",
            extendedDescription: "The Policy Lab is a collaborative think tank for reimagining HR policies in a rapidly evolving world. Members work in cross-functional teams to design policies on topics like flexible work arrangements, mental health support, and equitable hiring practices. The Lab also conducts policy audits, benchmarks against global standards, and provides templates for implementation. With input from legal and academic experts, the Policy Lab ensures policies are robust, compliant, and scalable, empowering HR leaders to drive organizational change with confidence.",
            image: "https://media.istockphoto.com/id/1424987910/photo/coworkers-with-stacked-hands-at-the-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=dAFAmmCMY0r4hcBxZMTbUJWMHKTrDnqLMxYTDvBAFhk=",
            highlights: [
                {
                    subtitle: "Remote & Hybrid Work",
                    text: "Design policies that support productivity, flexibility, and work-life balance in a post-pandemic world."
                },
                {
                    subtitle: "Mental Health & Well-being",
                    text: "Develop compassionate HR frameworks for emotional wellness, burnout prevention, and employee assistance programs (EAPs)."
                },
                {
                    subtitle: "Diversity, Equity & Inclusion (DEI)",
                    text: "Create actionable DEI strategies and policies that promote fairness, representation, and belonging across all levels of the organization."
                }
            ],
            additionalHighlights: [
                {
                    subtitle: "Policy Audit Tools",
                    text: "Access frameworks to evaluate and refine existing HR policies for compliance and impact."
                },
                {
                    subtitle: "Legal Expertise",
                    text: "Guidance from legal advisors to ensure policies meet regional and global regulations."
                }
            ]
        },
        {
            id: 6,
            title: "Advisory Role to Government, Academia Leaders & Education Ministry",
            description: "As a trusted collective of HR thought leaders and industry practitioners, the EduSkills HR Talent Community plays an active advisory role in shaping national policies related to workforce development, skill education, and industry-academia collaboration. Through structured engagements with the Ministry of Education, AICTE, Skill Development Missions, UGC, and academic leadership across states, the community contributes practical, future-ready recommendations that bridge skill gaps and ensure alignment between education outcomes and employability.",
            extendedDescription: "The Advisory Role initiative positions the EduSkills HR Talent Community as a key influencer in national workforce and education policy. Members collaborate with government bodies, academic institutions, and industry stakeholders to develop frameworks for skill development, internship programs, and curriculum reform. The initiative also facilitates pilot projects, such as industry-academia partnerships and skill certification programs, to test and scale innovative solutions. By shaping policy at the national level, the community drives systemic change in employability and talent readiness.",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aHJ8ZW58MHx8MHx8fDA%3D",
            highlights: [
                {
                    subtitle: "Policy Advocacy & Whitepapers",
                    text: "Contribute to research-based whitepapers, policy briefs, and working documents that address pressing HR and workforce development challenges."
                },
                {
                    subtitle: "Representation in National Forums",
                    text: "Participate in government-led consultations, roundtables, and task forces focused on skills, internships, employability, and youth development."
                },
                {
                    subtitle: "Guidance to Academic Institutions",
                    text: "Offer structured feedback and advisory support to universities and colleges on curriculum design, internship models, and career readiness programs."
                }
            ],
            additionalHighlights: [
                {
                    subtitle: "Pilot Projects",
                    text: "Lead experimental initiatives to test new models for skill development and employability."
                },
                {
                    subtitle: "Stakeholder Collaboration",
                    text: "Facilitate partnerships between industry, academia, and government for systemic impact."
                }
            ]
        }
    ];

    const activity = activities.find((a) => a.id === parseInt(id));

    if (!activity) {
        return (
            <section className="bg-white py-12 px-4 md:px-10">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#F18517] mb-6">
                        Activity Not Found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        The activity you’re looking for doesn’t exist or has been removed.
                    </p>
                    <Link
                        to="/#Activity"
                        className="inline-flex items-center bg-[#1161A0] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#1161A0]/90 transition-all duration-300"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Activities
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <>
        <section className="bg-white py-12 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">
                <Link
                    to="/#Activity"
                    className="inline-flex items-center text-[#1161A0] font-semibold mb-6 hover:underline"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Activities
                </Link>

                <div className="relative mb-8">
                    <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-[400px] object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
                    <h1 className="absolute bottom-6 left-6 text-3xl md:text-4xl font-bold text-white">
                        {activity.title}
                    </h1>
                </div>

                <div className="prose prose-lg max-w-none">
                    {/* <h2 className="text-2xl font-semibold text-[#F18517] mb-4">Overview</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        {activity.description}
                    </p> */}

                    <h2 className="text-2xl font-semibold text-[#F18517] mb-4">Detailed Insights</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        {activity.extendedDescription}
                    </p>

                    <h2 className="text-2xl font-semibold text-[#F18517] mb-4">Key Highlights</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {activity.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <ChevronRight className="text-[#F18517] mt-1 flex-shrink-0" size={20} />
                                <div>
                                    <h3 className="font-semibold text-gray-800">{highlight.subtitle}</h3>
                                    <p className="text-gray-600">{highlight.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {activity.additionalHighlights && (
                        <>
                            <h2 className="text-2xl font-semibold text-[#F18517] mb-4">Additional Features</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {activity.additionalHighlights.map((highlight, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <ChevronRight className="text-[#F18517] mt-1 flex-shrink-0" size={20} />
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{highlight.subtitle}</h3>
                                            <p className="text-gray-600">{highlight.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
            <AppFooter />
        </>
        
    );
};

export default ActivityDetail;
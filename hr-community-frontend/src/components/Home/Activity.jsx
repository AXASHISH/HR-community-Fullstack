import React, { useState } from 'react';
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Activity = () => {
    const activities = [
        {
            id: 1,
            title: "HR Development Programs (HRDP)",
            description: "The HR Development Programs (HRDP) under the EduSkills HR Talent Community are meticulously curated learning tracks designed to upskill and empower HR professionals across all levels. These programs are built to address the evolving needs of the human resource function in the age of digital transformation, hybrid work models, and skills-based talent strategies. With a focus on practical application, industry relevance, and global best practices, HRDP offers participants a unique opportunity to stay ahead of the curve in a rapidly changing HR landscape",
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
            ]
        },
        {
            id: 2,
            title: "HR Leadership Magazine",
            description: "HR Leadership Magazine Inspiring Minds. Sharing Wisdom. Shaping the Future. The HR Leadership Magazine is a flagship knowledge-sharing initiative by the EduSkills HR Talent Community, curated exclusively for HR, Talent Acquisition, and Early Careers professionals. It serves as a high-impact platform for showcasing thought leadership, celebrating innovation, and spotlighting transformative practices across the HR ecosystem. This quarterly publication features a rich blend of insights, case studies, interviews, trend analysis, and member contributions, making it an essential read for anyone committed to shaping the future of work.",
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
            ]
        },
        {
            id: 3,
            title: "Cross-Industry Exposure",
            description: "In today’s fast-changing talent landscape, HR innovation thrives on diverse perspectives and inter-sector collaboration. The Cross-Industry Exposure initiative by EduSkills HR Talent Community offers members the opportunity to collaborate with HR leaders from a wide range of sectors—including IT, manufacturing, BFSI, healthcare, education, retail, startups, and government. This initiative is designed to foster learning beyond organizational boundaries, enabling HR professionals to access new approaches, benchmark practices, and design more agile, inclusive, and forward-looking people strategies.",
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
            ]
        },
        {
            id: 4,
            title: "Future of Work, Workplace & Workforce",
            description: "The world of work is undergoing a seismic transformation driven by emerging technologies, demographic shifts, hybrid models, and evolving workforce expectations. The Future of Work, Workplace & Workforce initiative by EduSkills HR Talent Community is designed to equip HR professionals with the insights, foresight, and tools needed to navigate this transition with confidence and clarity. This initiative helps HR leaders and practitioners stay ahead of the curve by offering a deep dive into macro trends, policy changes, and disruptive innovations shaping the HR landscape—ensuring they are not just reacting to change, but actively driving it.",
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
            ]
        },
        {
            id: 5,
            title: "Policy Lab",
            description: "The Policy Lab is a signature initiative of the EduSkills HR Talent Community that brings together HR leaders, policy thinkers, legal experts, and academic partners to co-develop, evaluate, and benchmark human resource policies aligned with the future of work. In an era of constant disruption and changing workforce expectations, organizations must rethink their policies on flexibility, well-being, inclusion, and hiring. The Policy Lab serves as a collaborative sandbox where members can experiment, exchange, and evolve HR frameworks that are not only compliant and forward-thinking — but also people-centric and inclusive.",
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
            ]
        },
        {
            id: 6,
            title: "Advisory Role to Government, Academia Leaders & Education Ministry",
            description: "As a trusted collective of HR thought leaders and industry practitioners, the EduSkills HR Talent Community plays an active advisory role in shaping national policies related to workforce development, skill education, and industry-academia collaboration. Through structured engagements with the Ministry of Education, AICTE, Skill Development Missions, UGC, and academic leadership across states, the community contributes practical, future-ready recommendations that bridge skill gaps and ensure alignment between education outcomes and employability.",
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
            ]
        }
    ];

    const [selectedId, setSelectedId] = useState(activities[0].id);
    const selectedActivity = activities.find((a) => a.id === selectedId);

    return (
        <>
            <section className="bg-white py-12 px-4 md:px-10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-3xl  text-brand_orange text-center mb-10">
                        Initiatives
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            {activities.map((activity) => (
                                <button
                                    key={activity.id}
                                    onClick={() => setSelectedId(activity.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium text-sm border ${selectedId === activity.id
                                        ? "bg-[#1161A0] text-white border-[#1161A0]"
                                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                                        }`}
                                >
                                    {activity.title}
                                </button>
                            ))}
                        </div>

                        <div className="md:col-span-2">
                            <div className="relative bg-[#F9FAFB] border border-gray-200 rounded-xl shadow-md overflow-hidden min-h-[300px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedId}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative h-full"
                                    >
                                        <div className="absolute inset-0">
                                            <img
                                                src={selectedActivity.image}
                                                alt={selectedActivity.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4, delay: 0.2 }}
                                            className="relative z-10 p-6 h-full flex flex-col justify-end text-white"
                                        >
                                            <h3 className="text-2xl font-bold mb-3">
                                                {selectedActivity.title}
                                            </h3>

                                            <p className="text-white/90 text-sm leading-relaxed mb-6 max-w-3xl bg-white/30 backdrop-blur-sm rounded-lg p-4">
                                                {selectedActivity.description}
                                            </p>

                                            {/* <div className="grid md:grid-cols-2 gap-4"> */}
                                                {/* {selectedActivity.highlights.map((highlight, index) => (
                                                    <div key={index} className="flex items-start gap-3 bg-white/30 backdrop-blur-sm rounded-lg p-4">
                                                        <ChevronRight className="text-[#F18517] mt-0.5 flex-shrink-0" size={16} />
                                                        <div>
                                                            <p className="font-semibold text-sm text-white">
                                                                {highlight.subtitle}
                                                            </p>
                                                            <p className="text-sm text-white/80 mt-1">
                                                                {highlight.text}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))} */}
                                            {/* </div> */}

                                            <Link
                                                to={`/activity/${selectedActivity.id}`}
                                                className="mt-6 inline-block text-white font-semibold py-2 px-4"
                                            >

                                                <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
                                                    <button
                                                        className="group bg-gradient-to-r from-brand_orange to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2"
                                                    >
                                                        View More
                                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Activity;
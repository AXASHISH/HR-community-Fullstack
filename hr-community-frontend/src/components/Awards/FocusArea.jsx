import {
    BookMarked,
    BarChart4,
    Wrench,
    Users,
    ClipboardList,
    ShieldCheck,
    Lightbulb,
    Rocket,
} from 'lucide-react';

const focusItems = [
    { icon: BookMarked, text: 'Strategic Planning and Business Development Solutions' },
    { icon: BarChart4, text: 'Advanced Data Analytics and Market Research' },
    { icon: Wrench, text: 'Digital Transformation and Technology Integration' },
    { icon: Users, text: 'Customer Experience Optimization and Engagement' },
    { icon: ClipboardList, text: 'Performance Monitoring and Quality Assurance' },
    { icon: ShieldCheck, text: 'Risk Management and Compliance Frameworks' },
    { icon: Lightbulb, text: 'Innovation Workshops and Creative Problem Solving' },
    { icon: Rocket, text: 'Continuous Improvement and Operational Excellence' },
];

const img = "https://connect.eduskillsfoundation.org/ultron.jpg"
const FocusArea = () => {
    const getColorClass = (index) =>
        index % 2 === 0 ? 'bg-brand_blue' : 'bg-brand_orange';

    return (
        <>
            {/* Timeline Style Section */}
            <section className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-brand_orange mb-16">Focus Areas</h2>
                <div
                    style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                className="flex flex-col lg:flex-row-reverse items-center gap-12">
                    {/* Image */}
                    {/* <div className="w-full lg:w-1/2 flex justify-center">
                        <img
                            src="https://connect.eduskillsfoundation.org/ultron.jpg"
                            alt="AI Illustration"
                            className="max-h-[800px] object-cover rounded-3xl"
                        />
                    </div> */}
                    {/* Timeline */}
                    <div className="w-full lg:w-1/2 flex justify-center md:justify-center ">
                        <div className="relative border-l-4 border-brand_orange space-y-10 pl-6">
                            {focusItems.map((item, idx) => (
                                <div key={idx} className="relative">
                                    <div
                                        className={`absolute -left-3 -top-2 ${getColorClass(
                                            idx
                                        )} text-white rounded-full p-2`}
                                    >
                                        <item.icon size={20} />
                                    </div>
                                    <p className="text-gray-700 ml-10 mt-1">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default FocusArea;
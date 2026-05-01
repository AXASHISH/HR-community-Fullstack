import { CheckCircle } from "lucide-react";
import { InfiniteSlider } from "../ui/infinite-slider";

const highlights = [
    "Keynote Session By Policy Makers",
    "Keynote Session By CEO & CHRO",
    "HR Roundtables & Panel Discussions",
    "Focused Panel Discussions",
    "Awards & Recognitions",
];
const images = [
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111746/pic21_ppxjrg.jpg",
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111746/pic19_g0v78y.jpg",
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111746/pic20_n7ijdw.jpg",
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111746/pic15_xf1nyx.jpg",
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111746/pic16_q3kfq1.jpg",
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111745/pic17_ufwnkk.jpg",
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111745/pic9_ayvxys.jpg",
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111745/pic14_lkhjbw.jpg",
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111745/pic13_rmlvid.jpg",
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111745/pic12_bptvkf.jpg",
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111744/pic10_wfwxrd.jpg",
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111744/pic7_qtdd5i.jpg",
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111744/pic5_eij959.jpg",
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111743/pic4_cmpc9s.jpg",
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111743/pic6_2_it0wvz.jpg",
    "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111743/pic2_b058ld.jpg",
]

const EventHighlight = () => {
    return (
        <section className="bg-white py-16 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                {/* Left: Highlights Text */}
                <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl text-brand_orange mb-6 relative inline-block">
                        Event Highlights
                        <span className="block w-16 h-0.5 bg-brand_orange mt-2 rounded-full"></span>
                    </h2>

                    <ul className="space-y-6">
                        {highlights?.map((text, index) => (
                            <li
                                key={index}
                                className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md border border-gray-100"
                            >
                                <div className="bg-brand_blue p-2 rounded-xl text-white shadow">
                                    <CheckCircle size={24} />
                                </div>
                                <span className="text-lg font-medium text-gray-800">
                                    {text}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-2xl bg-black/90 max-h-[600px]">
                    <div className="h-[350px] sm:h-[500px] relative">
                        <InfiniteSlider
                            direction="vertical"
                            duration={30}
                            className="transform rotate-[-10deg] scale-110 translate-x-[100%] md:translate-x-[70%]"
                        >
                            {Array.from({ length: Math.ceil(images.length / 2) }).map((_, index) => (
                                <div key={index} className="flex gap-2 mb-2 justify-center">
                                    {/* First image always shows */}
                                    <img
                                        src={images[index * 2]}
                                        alt={`Event highlight ${index * 2}`}
                                        className="aspect-square w-60 rounded-2xl object-cover"
                                    />

                                    {/* Second image hidden on small screens */}
                                    {images[index * 2 + 1] && (
                                        <img
                                            src={images[index * 2 + 1]}
                                            alt={`Event highlight ${index * 2 + 1}`}
                                            className="aspect-square w-60 rounded-2xl object-cover hidden sm:block"
                                        />
                                    )}
                                </div>
                            ))}
                        </InfiniteSlider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventHighlight;

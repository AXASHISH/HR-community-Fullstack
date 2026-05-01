import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ThumbsUp, MessageSquare, Plus } from "lucide-react";

const features = [
  "Connect with HR professionals who share your industry interests",
  "Showcase your HR thought leadership",
  "Network and collaborate with HR experts",
];

 function ExpandHr() {
  return (
    <div className="relative w-full min-h-screen bg-white flex items-center justify-center p-4 overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="w-3 h-3 bg-red-400 rounded-full"></span>
            <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
            Expand your HR community
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* Left Column: Info Card */}
          <div className="w-full max-w-md">
            <Card className="p-8 shadow-2xl rounded-2xl border-none">
              <CardContent className="p-0">
                <ul className="space-y-6">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-lg text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-10 h-14 text-lg font-bold text-white bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 rounded-full transition-all duration-300 transform hover:scale-105">
                  Explore All Groups
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Image and Floating UIs */}
          <div className="relative w-full max-w-lg h-96 lg:h-[500px] mt-12 lg:mt-0">
            {/* Floating UI Mockup 1 */}
            <div className="absolute top-0 left-0 w-[80%] -rotate-12 origin-bottom-left transform transition-transform duration-500 hover:rotate-[-15deg] hover:scale-105">
               <img src="/ui-mockup-1.png" alt="UI Mockup 1" className="rounded-xl shadow-2xl" />
            </div>

            {/* Floating UI Mockup 2 */}
            <div className="absolute bottom-0 right-0 w-[70%] rotate-6 origin-bottom-right transform transition-transform duration-500 hover:rotate-[8deg] hover:scale-105">
               <img src="/ui-mockup-2.png" alt="UI Mockup 2" className="rounded-xl shadow-2xl" />
            </div>

            {/* Main Person Image */}
            <div className="absolute inset-0 flex items-center justify-center">
                <img src="/hero-person.png" alt="Smiling professional" className="w-full h-auto max-w-[85%] object-contain drop-shadow-2xl" />
            </div>
            
            {/* Floating Icons */}
            <div className="absolute top-[10%] left-[5%] w-16 h-16 bg-red-400 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12">
                <ThumbsUp className="w-8 h-8 text-white" />
            </div>
            <div className="absolute top-[20%] right-0 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                <Plus className="w-6 h-6 text-white" />
            </div>
            <div className="absolute bottom-[5%] right-[15%] w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg transform rotate-6">
                <MessageSquare className="w-8 h-8 text-white" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
export default ExpandHr
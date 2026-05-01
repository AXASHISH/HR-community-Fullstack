import React, { useState } from "react";

const GuidelinesSection = () => {
  const [activeTab, setActiveTab] = useState("Who Can Nominate ?");
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  const contentMap = {
    "Who Can Nominate ?": {
      text: (
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Self-nomination by the HR or Talent Leader</li>
          <li>Nominated by peers, reporting managers, or CXOs</li>
          <li>Organisation-led nominations for exceptional performers</li>
        </ul>
      ),
      image:
        "https://images.unsplash.com/photo-1660795864368-9004d4ee2a16?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fGhyJTIwYXdhcmRzJTIwY2VyZW1vbnl8ZW58MHx8MHx8fDA%3D",
    },
    "Eligibility Criteria": {
      text: (
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>
            Must be currently working in an HR, Talent Acquisition, L&D, DEI, or
            People Management role
          </li>
          <li>
            Should have 3+ years of relevant experience in the HR domain
            (exceptions may apply for young achievers)
          </li>
          <li>
            Must have led or contributed significantly to initiatives in
            innovation, workforce development, culture transformation,
            inclusion, or skilling
          </li>
          <li>
            Should be based in India or have contributed to India-focused HR
            initiatives
          </li>
          <li>Must be willing to provide verifiable documentation</li>
        </ul>
      ),
      image:
        "https://images.unsplash.com/photo-1651975414388-f33abc8f82a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjEwfHxhd2FyZHMlMjBjZXJlbW9ueXxlbnwwfHwwfHx8MA%3D%3D",
    },
    "Who Can Vote?": {
      text: (
        <div className="text-gray-700 space-y-4">
          <ul className="list-disc pl-5">
            <li>Employees of your own organization </li>
            <li>
              HR fraternity members or professional colleagues (from within or
              outside your organization)
            </li>
            <li>
              Institutional partners you hire from (Training & Placement
              Officers / Institutional Leaders)
            </li>
          </ul>
          <div>
            <strong>Voting Guidelines:</strong>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>
                Voters must use their official domain email ID (e.g.,
                name@company.com or name@college.edu)
              </li>
              <li>
                Personal email IDs (e.g., Gmail, Yahoo) will not be accepted
              </li>
              <li>One vote per award category per domain ID is allowed</li>
            </ul>
          </div>
        </div>
      ),
      image:
        "https://images.unsplash.com/photo-1609320813545-5bb7ce318cf7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDUyfHxhd2FyZHMlMjBjZXJlbW9ueXxlbnwwfHwwfHx8MA%3D%3D",
    },
  };

  const handleTermsClick = () => {
    setShowTermsPopup(true);
  };

  const closeTermsPopup = () => {
    setShowTermsPopup(false);
  };

  const handleSampleNominationClick = () => {
    setShowPdfModal(true);
  };

  const closePdfModal = () => {
    setShowPdfModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 ">
      <div className="w-full px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left side - Content */}
          <div className="flex-1 rounded-lg p-6 flex flex-col">
            <h2 className="text-3xl  mb-6  text-brand_orange text-center">
              <span className="text-3xl tracking-wide">Guidelines</span>
            </h2>

            {/* Tab Navigation */}
            <div className="flex mb-6 border-b border-gray-300 flex-wrap">
              {Object.keys(contentMap).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-yellow-500 text-yellow-600"
                      : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}

              {/* Sample Nomination Tab */}
              <button
                onClick={handleSampleNominationClick}
                className="px-4 py-3 font-medium border-b-2 border-transparent text-gray-600 hover:text-gray-800 transition-colors"
              >
                Sample Nomination From
              </button>

              {/* Terms and Conditions Tab */}
              <button
                onClick={handleTermsClick}
                className="px-4 py-3 font-medium border-b-2 border-transparent text-gray-600 hover:text-gray-800 transition-colors"
              >
                Terms & Conditions
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-grow min-h-[150px]">
              {contentMap[activeTab].text}
            </div>
          </div>
        </div>
      </div>

      {/* Sample Nomination PDF Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl text-brand_orange">Sample Nomination</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={closePdfModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            {/* PDF Content */}
            <div className="h-[70vh] w-full">
              <iframe
                src="/sample-nomination.pdf"
                className="w-full h-full border-0"
                title="Sample Nomination PDF"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Use this sample as a reference for your nomination submission
              </p>
              <button
                onClick={closePdfModal}
                className="bg-brand_orange text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions Popup */}
      {showTermsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Popup Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl text-brand_orange">Terms & Conditions</h3>
              <button
                onClick={closeTermsPopup}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Popup Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="-700 space-y-2">
                <h4 className=" text-md text-brand_blue">
                   Application Validity
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    Only complete applications that meet the eligibility
                    criteria will be considered.
                  </li>
                  <li>
                    Incomplete, falsified, or unverifiable applications will be
                    rejected without notice.
                  </li>
                </ul>

                <h4 className="text-md text-brand_blue">
                  Accuracy of Information
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    It is the applicant's responsibility to ensure all data and
                    documents are accurate, truthful, and verifiable.
                  </li>
                  <li>
                    Any misrepresentation, at any stage, will result in
                    disqualification.
                  </li>
                </ul>

                <h4 className="text-md text-brand_blue">
                  Submission Deadline
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    All entries must be submitted on or before the deadline as
                    published on the EduSkills Portal.
                  </li>
                  <li>
                    Late submissions will not be accepted under any
                    circumstances.
                  </li>
                </ul>

                <h4 className="text-md text-brand_blue">Due Diligence</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    {" "}
                    The organizing team may reach out for additional information
                    or clarification.
                  </li>
                  <li>
                    Applicants must respond promptly or risk disqualification.
                  </li>
                </ul>

                <h4 className="text-md text-brand_blue">
                  Award Notification
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    Winners will be notified at least 10 days prior to the
                    EduSkills HR Summit & Awards Ceremony2025.
                  </li>
                  <li>
                    All decisions by the jury and organizers will be final and
                    binding.
                  </li>
                </ul>
                <h4 className="text-md text-brand_blue">Rights and Usage</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    By applying, applicants consent to EduSkills using submitted
                    content (excluding confidential data) for non-commercial
                    promotional purposes, including event brochures, media, and
                    publications.
                  </li>
                </ul>
                <h4 className="text-md text-brand_blue">
                  Withdrawal & Cancellation
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    Applicants may withdraw their application by writing to the
                    organizing team before the screening round.
                  </li>
                  <li>
                    EduSkills Foundation reserves the right to modify or cancel
                    any category or award in exceptional circumstances.
                  </li>
                </ul>
              </div>
            </div>

            {/* Popup Footer */}
            <div className="p-6 border-t bg-gray-50">
              <button
                onClick={closeTermsPopup}
                className="bg-brand_orange text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidelinesSection;

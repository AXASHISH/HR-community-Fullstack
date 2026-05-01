import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HRNominationForm from '../components/HrNominationForm';
import { Share2, AlertCircle } from 'lucide-react';

const HrSummit = () => {
  const token = sessionStorage.getItem('authToken');
  const [userNominations, setUserNominations] = useState([]);
  const [nominationsLoading, setNominationsLoading] = useState(false);
  const [nominationsError, setNominationsError] = useState(null);

  useEffect(() => {
    const fetchNominations = async () => {
      if (!token) {
        return;
      }

      try {
        setNominationsLoading(true);
        const apiUrl = `${import.meta.env.VITE_API_URL}/get-nomination-by-user`;
        const res = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserNominations(res.data || []);
        setNominationsError(null);
      } catch (err) {
        console.error('Error fetching nominations:', err);
        setNominationsError('Unable to load nomination history');
        setUserNominations([]);
      } finally {
        setNominationsLoading(false);
      }
    };

    fetchNominations();
  }, [token]);

  const isAlreadyNominated =
    userNominations.length > 0 && userNominations[0].final_submit === true;

  // Check if results should be displayed (after 2nd September 2025)
  const shouldShowResults = () => {
    const currentDate = new Date();
    const resultsDate = new Date('2025-09-02T10:00:00');
    return currentDate > resultsDate;
  };

  // Winner or Appreciation Message
  const getWinnerMessage = (nomination) => {
    if (!shouldShowResults()) return null;

    if (nomination.is_winner) {
      return {
        type: 'winner',
        title: '🏆 Congratulations!',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-700',
        titleColor: 'text-green-800',
      };
    } else {
      return {
        type: 'appreciation',
        title: '🌟 Thank You',
        message: 'Better luck next time! We appreciate your effort.',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-700',
        titleColor: 'text-blue-800',
      };
    }
  };

  // Status Checker
  const getNominationStatus = (nomination) => {
    const currentDate = new Date();
    const voteStartDate = new Date(nomination.vote_start_date);
    const voteEndDate = new Date(nomination.vote_end_date);

    const isVotingActive = currentDate >= voteStartDate && currentDate <= voteEndDate;

    if (nomination.status === 'pending') {
      return {
        status: 'verification',
        message: 'Nomination Submitted Successfully',
        icon: '⏳',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
      };
    }

    if (nomination.status === 'approved') {
      if (isVotingActive) {
        return {
          status: 'voting_active',
          message: 'Voting is Active - You can share',
          icon: '🗳️',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
        };
      } else if (
        currentDate > voteEndDate &&
        currentDate < new Date('2025-09-02T23:59:59')
      ) {
        return {
          status: 'voting_closed',
          message:
            'Voting is now closed. Stay tuned — winners will be announced on 2nd September 2025.',
          icon: '📢',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
        };
      } else {
        return {
          status: 'accepted',
          message: 'Nomination Status',
          icon: '🎉',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
        };
      }
    }

    return {
      status: 'unknown',
      message: 'Status Unknown',
      icon: '❓',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
    };
  };

  // Voting Check
  const isVotingOpen = (nomination) => {
    const currentDate = new Date();
    const voteStartDate = new Date(nomination.vote_start_date);
    const voteEndDate = new Date(nomination.vote_end_date);
    return currentDate >= voteStartDate && currentDate <= voteEndDate;
  };

  // Share
  const handleShare = async (link) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Vote for me - HR Community Awards',
          text: 'Please support me by voting in the HR Community Awards!',
          url: link,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(link);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Error Banner - Non-blocking */}
      {nominationsError && (
        <div className="mb-4 max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-yellow-700 font-medium">{nominationsError}</p>
            <p className="text-yellow-600 text-sm">You can still submit a new nomination below.</p>
          </div>
        </div>
      )}

      {/* Show Form if not already nominated */}
      {!isAlreadyNominated ? (
        <HRNominationForm userNomination={userNominations?.[0]} />
      ) : (
        /* Show Existing Nomination Details */
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          {userNominations?.map((nomination) => {
            const voteStartDate = new Date(nomination.vote_start_date);
            const voteEndDate = new Date(nomination.vote_end_date);
            const votingIsOpen = isVotingOpen(nomination);
            const statusInfo = getNominationStatus(nomination);
            const winnerInfo = getWinnerMessage(nomination);

            return (
              <div key={nomination?.nomination_id} className="text-center space-y-6">
                {/* Winner/Results Message */}
                {winnerInfo && (
                  <div
                    className={`${winnerInfo.bgColor} border ${winnerInfo.borderColor} rounded-lg p-6 mb-6`}
                  >
                    <h2
                      className={`text-2xl font-bold mb-3 ${winnerInfo.titleColor}`}
                    >
                      {winnerInfo.title}
                    </h2>
                    <p className={`text-lg font-medium ${winnerInfo.textColor}`}>
                      {winnerInfo.message}
                    </p>

                    {winnerInfo.type === 'winner' ? (
                      <div className={`mt-4 space-y-3 ${winnerInfo.textColor}`}>
                        <p>
                          🎉 You are the{' '}
                          <strong>winner of the HR Excellence Award 2025</strong> in
                          the <strong>{nomination.category_name}</strong> category.
                        </p>
                        <p>
                          You are cordially invited to attend the{' '}
                          <strong>HR Summit at Shimla</strong> on{' '}
                          <strong>19<sup>th</sup> September 2025</strong> as a
                          distinguished <strong>1-day participant</strong>.
                        </p>
                        <p className="italic">
                          Your Stay is <strong>complementary</strong> in recognition
                          of your outstanding achievement.
                        </p>
                        <p className="text-sm text-gray-700 mt-4">
                          📞 For more details, contact <strong>Mr. Paritosh</strong> at{' '}
                          <strong>+91-8093254919</strong>.
                        </p>
                      </div>
                    ) : (
                      <div className={`mt-4 ${winnerInfo.textColor}`}>
                        <p className={`text-sm`}>
                          Thank you for participating in the{' '}
                          <strong>{nomination.category_name}</strong> category. Your
                          contribution to the HR community is valued.
                        </p>
                        <p className="text-sm text-gray-700 mt-3">
                          📞 For more details, contact <strong>Mr. Paritosh</strong> at{' '}
                          <strong>+91-8093254919</strong>.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Nomination Status if no results yet */}
                {!winnerInfo && (
                  <div className="space-y-3">
                    <h1 className={`text-3xl ${statusInfo.color}`}>
                      {statusInfo.icon} {statusInfo.message}
                    </h1>

                    {statusInfo.status === 'verification' && (
                      <p className="text-lg text-gray-700">
                        Your nomination is currently under review. We'll notify you once it's
                        processed.
                      </p>
                    )}

                    {statusInfo.status === 'accepted' && (
                      <p className="text-lg text-gray-700">
                        Your nomination has been successfully accepted!
                      </p>
                    )}

                    {statusInfo.status === 'voting_active' && (
                      <>
                        <p className="text-lg text-gray-700">
                          Voting is now live! Share your link to get votes.
                        </p>
                        <p className="text-md text-gray-600">
                          Share your vote link with your network.
                        </p>
                      </>
                    )}

                    {statusInfo.status === 'voting_closed' && (
                      <p className="text-lg text-red-700">
                        Voting has ended. Stay tuned — winners will be declared on{' '}
                        <strong>2nd September 2025</strong>.
                      </p>
                    )}
                  </div>
                )}

                {/* Voting Info */}
                {!winnerInfo && statusInfo.status === 'voting_active' && votingIsOpen && (
                  <div
                    className={`${statusInfo.bgColor} border ${statusInfo.borderColor} rounded-lg p-6 space-y-4`}
                  >
                    <h2 className="text-2xl text-green-600">🔗 Voting is Live!</h2>
                    <p className="text-lg text-green-700">Share your voting link now!</p>

                    {nomination?.sharable_link && (
                      <div className="bg-white border-2 border-green-300 rounded-lg p-4 flex items-center justify-between">
                        <a
                          href={nomination.sharable_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-800 underline font-medium break-all"
                        >
                          {nomination.sharable_link}
                        </a>
                        <button
                          onClick={() => handleShare(nomination.sharable_link)}
                          className="ml-3 p-2 rounded-full hover:bg-green-100 transition"
                          title="Share voting link"
                        >
                          <Share2 className="w-5 h-5 text-green-600" />
                        </button>
                      </div>
                    )}

                    <p className="text-md font-medium text-green-700">
                      Voting ends on{' '}
                      {voteEndDate.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                      })}
                    </p>
                  </div>
                )}

                {/* Terms for Voting */}
                {!winnerInfo &&
                  statusInfo.status === 'voting_active' &&
                  votingIsOpen && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Who can vote - Terms and Conditions:
                        </h3>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 text-start">
                          <li>Employees of your own organization</li>
                          <li>
                            HR fraternity members or professional colleagues (from within or
                            outside your organization)
                          </li>
                          <li>
                            Institutional partners you hire from (Training & Placement
                            Officers / Institutional Leaders)
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Voting Guidelines:
                        </h3>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 text-start">
                          <li>
                            Voters must use their official domain email ID (e.g.,
                            name@company.com or name@college.edu)
                          </li>
                          <li>
                            Personal email IDs (e.g., Gmail, Yahoo) will not be accepted
                          </li>
                          <li>
                            One vote per award category per domain ID is allowed
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HrSummit;

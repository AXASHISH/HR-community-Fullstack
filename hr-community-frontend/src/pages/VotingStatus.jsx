import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Vote, CheckCircle, Clock, Award } from "lucide-react";

const VotingStatus = () => {
  const votingData = {
    votesLeft: 3,
    totalVotes: 5,
    categories: ["Innovation Leader", "Team Builder", "Emerging Leader"],
    votedCategories: [
      {
        name: "Innovation Leader",
        votedDate: "2024-01-20",
        nominee: "John Smith"
      },
      {
        name: "Team Builder", 
        votedDate: "2024-01-22",
        nominee: "Maria Garcia"
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Voting Status
        </h1>
        <p className="text-muted-foreground">
          Track your voting progress and see your completed votes
        </p>
      </div>

      {/* Voting Overview */}
      <Card className="shadow-soft mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5 text-teal" />
            Voting Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Votes Remaining:</span>
              <span className="font-bold text-teal">{votingData.votesLeft}</span>
            </div>
            <Progress 
              value={(votingData.totalVotes - votingData.votesLeft) / votingData.totalVotes * 100} 
              className="h-3"
            />
            <p className="text-sm text-muted-foreground">
              {votingData.totalVotes - votingData.votesLeft} of {votingData.totalVotes} votes cast
            </p>
          </div>
          
          <div className="space-y-2">
            <span className="text-sm font-medium">Available Categories:</span>
            <div className="flex flex-wrap gap-2">
              {votingData.categories.map((category, index) => (
                <Badge key={index} variant="outline">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <Link to="/vote">
            <Button className="w-full" disabled={votingData.votesLeft === 0}>
              {votingData.votesLeft > 0 ? "Continue Voting" : "All Votes Cast"}
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Completed Votes */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Completed Votes
          </CardTitle>
          <CardDescription>
            Review your voting history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {votingData.votedCategories.map((vote, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="font-medium">{vote.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Voted for: {vote.nominee}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {vote.votedDate}
                  </div>
                  <Badge className="bg-success text-success-foreground">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Voted
                  </Badge>
                </div>
              </div>
            ))}
            
            {votingData.votedCategories.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Vote className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No votes cast yet</p>
                <p className="text-sm">Start voting to see your progress here</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VotingStatus;
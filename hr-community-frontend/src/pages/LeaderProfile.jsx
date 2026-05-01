import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building, Award, FileText, Users, Star, TrendingUp } from "lucide-react";

const LeaderProfile = () => {
  const nominee = {
    name: "Alex Chen",
    company: "TechCorp",
    role: "Senior Software Engineer",
    category: "Innovation Leader",
    verified: true,
    joinDate: "2022-03-15",
    totalScore: 87
  };

  const scores = {
    student: {
      label: "Self Assessment",
      score: 85,
      maxScore: 100,
      breakdown: [
        { category: "Innovation", score: 90 },
        { category: "Leadership", score: 82 },
        { category: "Impact", score: 88 },
        { category: "Collaboration", score: 80 }
      ]
    },
    spoc: {
      label: "Peer Evaluation", 
      score: 82,
      maxScore: 100,
      breakdown: [
        { category: "Innovation", score: 85 },
        { category: "Leadership", score: 78 },
        { category: "Impact", score: 85 },
        { category: "Collaboration", score: 82 }
      ]
    },
    documentation: {
      label: "Documentation Review",
      score: 92,
      maxScore: 100,
      status: "verified"
    }
  };

  const achievements = [
    "Led 3 major innovation projects in 2023",
    "Mentored 5+ junior engineers", 
    "Implemented cost-saving solution worth $200K",
    "95% positive peer feedback rating"
  ];

  const getScoreColor = (score) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadgeVariant = (score) => {
    if (score >= 85) return "default";
    if (score >= 70) return "secondary";
    return "destructive";
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Leader Profile</h1>
        <p className="text-muted-foreground">
          Detailed evaluation and scoring breakdown
        </p>
      </div>

      {/* Profile Header */}
      <Card className="shadow-elevated mb-6">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                {getInitials(nominee.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">{nominee.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Building className="h-4 w-4" />
                    <span>{nominee.role} at {nominee.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      {nominee.category}
                    </Badge>
                    {nominee.verified && (
                      <Badge className="bg-success text-success-foreground">
                        <FileText className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {nominee.totalScore}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Score</div>
                  <Badge 
                    variant={getScoreBadgeVariant(nominee.totalScore)}
                    className="mt-2"
                  >
                    {nominee.totalScore >= 85 ? "Excellent" : nominee.totalScore >= 70 ? "Good" : "Average"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Self Assessment */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              {scores.student.label}
            </CardTitle>
            <CardDescription>Nominee's self-evaluation scores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Overall Score</span>
              <span className={`text-2xl font-bold ${getScoreColor(scores.student.score)}`}>
                {scores.student.score}/100
              </span>
            </div>
            
            <div className="space-y-3">
              {scores.student.breakdown.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.category}</span>
                    <span className="font-medium">{item.score}%</span>
                  </div>
                  <Progress value={item.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Peer Evaluation */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-teal" />
              {scores.spoc.label}
            </CardTitle>
            <CardDescription>Average scores from peer voting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Overall Score</span>
              <span className={`text-2xl font-bold ${getScoreColor(scores.spoc.score)}`}>
                {scores.spoc.score}/100
              </span>
            </div>
            
            <div className="space-y-3">
              {scores.spoc.breakdown.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.category}</span>
                    <span className="font-medium">{item.score}%</span>
                  </div>
                  <Progress value={item.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Documentation Score */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-success" />
              {scores.documentation.label}
            </CardTitle>
            <CardDescription>Quality and completeness of submitted documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(scores.documentation.score)}`}>
                {scores.documentation.score}/100
              </div>
              <Badge className="bg-success text-success-foreground">
                Documentation Verified
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Key Achievements */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-warning" />
              Key Achievements
            </CardTitle>
            <CardDescription>Notable accomplishments and contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Award className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaderProfile;
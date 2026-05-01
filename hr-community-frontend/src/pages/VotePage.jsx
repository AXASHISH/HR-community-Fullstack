import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building, User, Vote, Star } from "lucide-react";

const VotePage = () => {
  const [selectedNominee, setSelectedNominee] = useState("");
  const [answers, setAnswers] = useState({});

  const category = {
    name: "Innovation Leader",
    description: "Recognizes individuals who drive innovation and creative solutions"
  };

  const nominees = [
    {
      id: "1",
      name: "Alex Chen",
      company: "TechCorp",
      role: "Senior Software Engineer",
      category: "Innovation Leader",
      verified: true
    },
    {
      id: "2", 
      name: "Maria Rodriguez",
      company: "TechCorp",
      role: "Product Manager",
      category: "Innovation Leader",
      verified: true
    },
    {
      id: "3",
      name: "David Kim",
      company: "TechCorp", 
      role: "UX Designer",
      category: "Innovation Leader",
      verified: false
    },
    {
      id: "4",
      name: "Sarah Johnson",
      company: "TechCorp",
      role: "Data Scientist",
      category: "Innovation Leader",
      verified: true
    }
  ];

  const evaluationQuestions = [
    {
      id: "innovation",
      question: "How would you rate this nominee's innovation capabilities?",
      options: [
        { value: "excellent", label: "Excellent - Consistently delivers groundbreaking solutions" },
        { value: "good", label: "Good - Regularly contributes innovative ideas" },
        { value: "average", label: "Average - Occasionally provides creative input" },
        { value: "limited", label: "Limited - Rarely demonstrates innovation" }
      ]
    },
    {
      id: "leadership",
      question: "How effectively does this nominee lead innovation initiatives?",
      options: [
        { value: "excellent", label: "Excellent - Inspires and guides team innovation" },
        { value: "good", label: "Good - Supports team in innovative thinking" },
        { value: "average", label: "Average - Participates in innovation efforts" },
        { value: "limited", label: "Limited - Minimal leadership in innovation" }
      ]
    },
    {
      id: "impact",
      question: "What is the impact of this nominee's innovative contributions?",
      options: [
        { value: "high", label: "High - Significant positive impact on organization" },
        { value: "medium", label: "Medium - Noticeable improvements in processes/products" },
        { value: "low", label: "Low - Minor contributions to innovation" },
        { value: "minimal", label: "Minimal - Limited measurable impact" }
      ]
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedNominee || Object.keys(answers).length !== evaluationQuestions.length) {
      alert("Please select a nominee and answer all questions.");
      return;
    }
    
    console.log("Vote submission:", {
      nominee: selectedNominee,
      category: category.name,
      answers: answers
    });
    
    alert("Vote submitted successfully!");
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Cast Your Vote</h1>
        <p className="text-muted-foreground">
          Evaluate nominees for the {category.name} award
        </p>
      </div>

      {/* Category Info */}
      <Card className="shadow-soft mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            {category.name}
          </CardTitle>
          <CardDescription>{category.description}</CardDescription>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nominee Selection */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-teal" />
              Select Nominee
            </CardTitle>
            <CardDescription>
              Choose the nominee you'd like to evaluate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedNominee} onValueChange={setSelectedNominee}>
              <div className="grid md:grid-cols-2 gap-4">
                {nominees.map((nominee) => (
                  <div key={nominee.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={nominee.id} id={nominee.id} />
                    <Label 
                      htmlFor={nominee.id} 
                      className="flex items-center gap-3 cursor-pointer flex-1 p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {getInitials(nominee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{nominee.name}</span>
                          {nominee.verified && (
                            <Badge className="bg-success text-success-foreground text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Building className="h-3 w-3" />
                          {nominee.role} at {nominee.company}
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Evaluation Questions */}
        {selectedNominee && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5 text-primary" />
                Evaluation Questions
              </CardTitle>
              <CardDescription>
                Rate the selected nominee based on the following criteria
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {evaluationQuestions.map((question, index) => (
                <div key={question.id} className="space-y-3">
                  <Label className="text-base font-medium">
                    {index + 1}. {question.question}
                  </Label>
                  <RadioGroup 
                    value={answers[question.id] || ""} 
                    onValueChange={(value) => setAnswers(prev => ({ ...prev, [question.id]: value }))}
                  >
                    <div className="space-y-2">
                      {question.options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                          <Label 
                            htmlFor={`${question.id}-${option.value}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="lg"
            disabled={!selectedNominee || Object.keys(answers).length !== evaluationQuestions.length}
            className="px-8"
          >
            Submit Vote
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VotePage;
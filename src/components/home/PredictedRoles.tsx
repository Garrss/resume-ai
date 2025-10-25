"use client";
import React from 'react';
import { Target, TrendingUp, Award, Zap, Lightbulb, MessageSquare, BarChart3, Book, Leaf, Key } from 'lucide-react';

function PredictedRoles() {
  const predictedRole = {
    title: "AI Engineer",
    confidence: 92,
    matchLevel: "Excellent Match",
    experience: "3-5 years",
    marketDemand: "High",
    
  };

  const feedback = {
    overallScore: 8.5,
    strengths: [
      "Expertise in modern React ecosystem and hooks",
      "Strong TypeScript and component architecture skills",
      "Experience with Next.js and SSR applications",
      "Proficient in responsive design and CSS frameworks"
    ],
    improvements: [
      "Expand backend knowledge with Node.js/Express",
      "Learn testing frameworks (Jest, React Testing Library)",
      "Explore advanced state management (Zustand, Redux Toolkit)",
      "Gain experience with DevOps"
    ],
    recommendations: [
      "Target senior-level positions at tech startups",
      "Showcase complex projects in your portfolio",
      "Contribute to open-source React projects",
      "Network through React conferences and meetups"
    ]
  };

  const getMatchColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'excellent match':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800';
      case 'strong match':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800';
      case 'good match':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/30 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 8) return 'text-blue-600 dark:text-blue-400';
    if (score >= 7) return 'text-amber-600 dark:text-amber-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Main Card */}
      <div className="relative overflow-hidden rounded-xl p-8 shadow-lg backdrop-blur-sm 
        bg-white/80 dark:bg-neutral-900/80
        border border-neutral-100 dark:border-neutral-800
        hover:shadow-xl transition-all duration-300 group">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-70" />
        
        {/* Top Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-center gap-4 mb-8">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              AI Career Analysis
            </p>
            <h3 className="text-xl font-semibold text-foreground">
              Role Prediction & Feedback
            </h3>
          </div>
        </div>

        {/* Role Prediction Section */}
        <div className="relative z-10 mb-10">
          <div className="text-center space-y-6">
            {/* Role Title */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-4">
                {predictedRole.title}
              </h2>
              
    
            </div>
          </div>
        </div>

        {/* Feedback & Analysis Section */}
        <div className="relative z-10 border-t border-neutral-200/50 dark:border-neutral-700/50 pt-8">
          {/* Feedback Header */}
        

          {/* Analysis Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Strengths */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <Award className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h5 className="font-semibold text-foreground">Key Strengths</h5>
                  <p className="text-xs text-muted-foreground">Areas of expertise</p>
                </div>
              </div>
              <ul className="space-y-3 text-left">
                {feedback.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <Zap className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h5 className="font-semibold text-foreground">Growth Areas</h5>
                  <p className="text-xs text-muted-foreground">Skills to develop</p>
                </div>
              </div>
              <ul className="space-y-3 text-left">
                {feedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <Lightbulb className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h5 className="font-semibold text-foreground">Career Advice</h5>
                  <p className="text-xs text-muted-foreground">Strategic next steps</p>
                </div>
              </div>
              <ul className="space-y-3 text-left">
                {feedback.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Analysis Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Strengths */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-red-500/10 rounded-lg border border-red-500/20">
                  <Key className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h5 className="font-semibold text-foreground">Key Strengths</h5>
                  <p className="text-xs text-muted-foreground">Areas of expertise</p>
                </div>
              </div>
              <ul className="space-y-3 text-left">
                {feedback.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <Leaf className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <h5 className="font-semibold text-foreground">Growth Areas</h5>
                  <p className="text-xs text-muted-foreground">Skills to develop</p>
                </div>
              </div>
              <ul className="space-y-3 text-left">
                {feedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <Book className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <h5 className="font-semibold text-foreground">Career Advice</h5>
                  <p className="text-xs text-muted-foreground">Strategic next steps</p>
                </div>
              </div>
              <ul className="space-y-3 text-left">
                {feedback.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* Footer Note */}
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Analysis generated based on your skills, experience, and current market trends. 
          Updated in real-time as you enhance your profile.
        </p>
      </div>
    </div>
  );
}

export default PredictedRoles;
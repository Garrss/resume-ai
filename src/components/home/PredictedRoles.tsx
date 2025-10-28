"use client";
import React, { useContext } from 'react';

import { DataContext } from '../DataProvider';
import Markdown from 'react-markdown'
import ReactMarkdown from 'react-markdown';

function PredictedRoles() {
  const { data } = useContext(DataContext);

  console.log(data);

  const predictedRole = {
    title: data.role,
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



  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10">
  {/* Main Card */}
  <div className="relative overflow-hidden rounded-xl p-8 shadow-sm 
    bg-white dark:bg-neutral-900
    border border-neutral-200 dark:border-neutral-800
    hover:shadow-md transition-all duration-300">

    {/* Header */}
    <div className="flex items-center justify-center mb-8">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
          AI Career Analysis
        </p>
        <h3 className="text-2xl font-semibold text-foreground">
          Role Prediction & Feedback
        </h3>
      </div>
    </div>

    {/* Role Prediction Section */}
    <div className="mb-10">
      <div className="text-center space-y-6">
        {/* Role Title */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {predictedRole.title}
          </h2>
        </div>
      </div>
    </div>

    {/* Feedback & Analysis Section */}
    <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
      
      {/* Analysis Grid */}
      <div className="grid grid-cols-1 gap-8">
        {/* Professional JSON Data Display */}
        <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">

          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-foreground"></span>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Real-time Analysis</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-950 rounded-md border border-gray-200 dark:border-gray-800 p-6">
            <pre className="text-left text-base text-foreground whitespace-pre-wrap font-mono leading-relaxed">
              <Markdown>{data.feedback}</Markdown>
            </pre>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
            <span>{Object.keys(data.feedback || {}).length} key insights</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default PredictedRoles;

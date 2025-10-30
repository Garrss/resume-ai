"use client";
import React, { useContext } from 'react';
import { DataContext } from '../DataProvider';
import { Progress } from "@/components/ui/progress";
import { Pie, PieChart, Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

interface FeedbackData {
  overall_assessment: string[];
  detailed_improvements: {
    area: string;
    current: string;
    improved: string;
  }[];
  skill_evaluation: {
    technical_skills: number;
    experience_relevance: number;
    presentation_clarity: number;
    overall_readiness: number;
  };
  summary_of_readiness: {
    level: string;
    explanation: string;
  };
}

function PredictedRoles() {
  const { data } = useContext(DataContext);
  
  // Handle potential undefined or invalid data
  if (!data?.feedback) {
    return <div>No feedback data available</div>;
  }

  // Clean and parse the feedback data
  let feedback: FeedbackData;
  try {
    if (typeof data.feedback === 'string') {
      // Remove any potential backticks and clean the string
      const cleanJson = data.feedback
        .replace(/^```json\s*/, '')  // Remove starting ```json
        .replace(/```$/, '')         // Remove ending ```
        .trim();                     // Remove extra whitespace
      feedback = JSON.parse(cleanJson);
    } else {
      feedback = data.feedback;
    }
  } catch (error) {
    console.error('Error parsing feedback:', error);
    return <div>Error processing feedback data</div>;
  }

  // Validate the parsed data has the required structure
  if (!feedback?.overall_assessment || !feedback?.detailed_improvements || 
      !feedback?.skill_evaluation || !feedback?.summary_of_readiness) {
    return <div>Invalid feedback data structure</div>;
  }

  // Transform skill evaluation data for the bar chart
  const skillChartData = Object.entries(feedback.skill_evaluation).map(([skill, score]) => ({
    skill: skill.replace(/_/g, ' '),
    score: score
  }));

  // Chart configuration
  const chartConfig = {
    score: {
      label: "Score",
      color: "var(--chart-2)",
    },
    label: {
      color: "var(--background)",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10">
      <div className="relative overflow-hidden rounded-xl bg-white dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-neutral-800">
        {/* Header Section */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-neutral-100 to-white dark:from-neutral-800/50 dark:to-neutral-900 p-8">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">Feedback Analysis</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">Comprehensive CV analysis and recommendations</p>
        </div>

        <div className="p-8 space-y-10">
          {/* Overall Assessment */}
          <section className="rounded-lg p-6 border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-lg font-semibold mb-5 flex items-center gap-3 text-neutral-800 dark:text-neutral-200">
              <span className="h-8 w-8 flex items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              Overall Assessment
            </h3>
            <ul className="space-y-3 pl-4">
              {feedback.overall_assessment?.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
                  <span className="text-neutral-400">•</span>
                  <span className="text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Skill Evaluation */}
            <section className="rounded-lg p-6 border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-neutral-800 dark:text-neutral-200">
              <span className="h-8 w-8 flex items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              Skill Evaluation
            </h3>
            <div className="grid gap-6">
              {Object.entries(feedback.skill_evaluation).map(([skill, score]) => (
                <div key={skill} className="space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium capitalize text-neutral-700 dark:text-neutral-300">
                      {skill.replace(/_/g, ' ')}
                    </span>
                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {score}/10
                    </span>
                  </div>
                  
                    <Progress 
                      value={score * 10} 
                      className="h-1.5 bg-neutral-100 dark:bg-neutral-800 
                        [&>div]:bg-blue-600 dark:[&>div]:bg-blue-400 
                        [&>div]:transition-all [&>div]:duration-300"
                    />
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Improvements */}
          <section className="rounded-lg p-6 border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-neutral-800 dark:text-neutral-200">
              <span className="h-8 w-8 flex items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Detailed Improvements
            </h3>

            <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
              {/* Table Header */}
              <div className="grid grid-cols-12 bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700">
                <div className="col-span-3 p-4 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  AREA
                </div>
                <div className="col-span-4 p-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 border-l border-neutral-200 dark:border-neutral-700">
                  CURRENT STATE
                </div>
                <div className="col-span-5 p-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 border-l border-neutral-200 dark:border-neutral-700">
                  RECOMMENDED IMPROVEMENT
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {feedback.detailed_improvements.map((improvement, index) => (
                  <div key={index} className="grid grid-cols-12 hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">
                    <div className="col-span-3 p-4 flex items-center">
                      <span className="text-left text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {improvement.area}
                      </span>
                    </div>
                    <div className="col-span-4 p-4 border-l border-neutral-200 dark:border-neutral-700">
                      <p className="text-left text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {improvement.current}
                      </p>
                    </div>
                    <div className="col-span-5 p-4 border-l border-neutral-200 dark:border-neutral-700">
                      <p className="text-left text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {improvement.improved}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Summary of Readiness */}
          <section className="rounded-lg p-6 bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-3 text-neutral-800 dark:text-neutral-200">
              <span className="h-8 w-8 flex items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Summary of Readiness
            </h3>
            <div className="space-y-3">
              <p className="text-base font-medium text-neutral-800 dark:text-neutral-200">{feedback.summary_of_readiness.level}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {feedback.summary_of_readiness.explanation}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PredictedRoles;

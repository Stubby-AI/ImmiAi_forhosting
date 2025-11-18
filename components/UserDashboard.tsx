import React from 'react';
import { AIAnalysisResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Check, X, AlertTriangle, GraduationCap, Briefcase, Calendar, TrendingUp } from 'lucide-react';

interface UserDashboardProps {
  results: AIAnalysisResult;
  onBookConsultation: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ results, onBookConsultation }) => {
  const scoreData = [
    { name: 'Success', value: results.overallSuccessProbability },
    { name: 'Risk', value: 100 - results.overallSuccessProbability },
  ];

  const COLORS = ['#16a34a', '#f3f4f6'];

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header Section */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-900">Your Immigration Assessment</h1>
        <p className="text-gray-600 mt-2">Powered by MaplePath AI Engine</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Score & CRS */}
        <div className="space-y-6">
          {/* Success Probability Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="text-red-600" size={20}/>
              Success Probability
            </h3>
            <div className="h-48 w-full relative flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {scoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-gray-900">{results.overallSuccessProbability}%</span>
                <span className="text-xs text-gray-500">Likelihood</span>
              </div>
            </div>
            <p className="text-sm text-center text-gray-600 mt-2">
              Based on current Canadian immigration trends and your profile data.
            </p>
          </div>

          {/* CRS Prediction */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
             <h3 className="text-lg font-semibold text-gray-800 mb-2">CRS Prediction</h3>
             <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-blue-600">{results.crsScorePrediction}</span>
                <span className="text-sm text-gray-500">points</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(results.crsScorePrediction / 600) * 100}%` }}></div>
             </div>
             <p className="text-xs text-gray-500 mt-2">Current cut-off trends hover around 480-520 for general draws.</p>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
            <h3 className="font-bold text-red-900 mb-2">Need Professional Help?</h3>
            <p className="text-sm text-red-800 mb-4">
              Your profile has potential, but there are complexities. Book a consultation with a Regulated Canadian Immigration Consultant (RCIC).
            </p>
            <button 
              onClick={onBookConsultation}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition shadow-sm"
            >
              Book Consultation ($50)
            </button>
          </div>
        </div>

        {/* Middle & Right Column: Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Strategic Advice */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">AI Strategic Advice</h3>
            <div className="p-4 bg-blue-50 text-blue-900 rounded-lg text-sm leading-relaxed border border-blue-100">
              {results.strategicAdvice}
            </div>
          </div>

          {/* Pathways */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Pathways</h3>
            <div className="space-y-4">
              {results.recommendedPathways.map((path, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{path.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${path.type === 'Federal' ? 'bg-purple-100 text-purple-700' : path.type === 'Provincial' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                        {path.type}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-green-600">{path.eligibilityScore}% Match</span>
                      <span className="text-xs text-gray-500 flex items-center justify-end gap-1">
                        <Calendar size={12}/> {path.timeline}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{path.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Risks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Check className="text-green-500" size={18} /> Key Strengths
              </h3>
              <ul className="space-y-2">
                {results.strengths.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" size={18} /> Risk Factors
              </h3>
               <ul className="space-y-2">
                {results.riskFactors.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Study Recommendations (Conditional) */}
          {results.studyRecommendations && results.studyRecommendations.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                 <GraduationCap className="text-blue-600" size={20} /> Recommended Study Programs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.studyRecommendations.map((study, idx) => (
                   <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 className="font-bold text-gray-900">{study.programName}</h4>
                      <p className="text-sm text-blue-600 font-medium mb-2">{study.institution}</p>
                      <p className="text-xs text-gray-500">{study.matchReason}</p>
                   </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
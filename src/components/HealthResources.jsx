import React from 'react';
import { BookOpen, Video, FileText } from 'lucide-react';

const resources = [
  {
    title: 'Understanding Common Cold Symptoms',
    description: 'Learn to differentiate between cold, flu, and other respiratory conditions...',
    icon: <FileText className="w-5 h-5 text-blue-500" />,
    time: '5 min read',
    link: 'https://www.healthline.com/health/cold-flu/common-cold',
  },
  {
    title: 'Basic First Aid Techniques',
    description: 'Essential first aid skills everyone should know for emergency situations...',
    icon: <Video className="w-5 h-5 text-blue-500" />,
    time: '12 min video',
    link: 'https://www.redcross.org/take-a-class/first-aid',
  },
  {
    title: 'Heart Health: Prevention Tips',
    description: 'Daily tips for maintaining a strong and healthy heart...',
    icon: <BookOpen className="w-5 h-5 text-blue-500" />,
    time: '8 min read',
    link: 'https://www.cdc.gov/heartdisease/prevention.htm',
  },
];

export default function HealthResources() {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        Health Resources
      </h3>
      <div className="space-y-3">
        {resources.map((res, idx) => (
          <a
            key={idx}
            href={res.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block border p-3 rounded-md hover:bg-blue-50 transition"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
              {res.icon}
              {res.title}
            </div>
            <p className="text-xs text-gray-600 mt-1">{res.description}</p>
            <div className="text-xs text-gray-400 mt-1">{res.time}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

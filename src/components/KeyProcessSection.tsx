import React from 'react';
import { Tractor, Sparkles, Cpu, Award, PackageCheck } from 'lucide-react';

export function KeyProcessSection() {
  const steps = [
    {
      id: 'step-1',
      number: '01',
      title: 'Farming & Origin Chain',
      description: 'Direct procurement from verified Gujarat & Rajasthan APMC farmer clusters',
      icon: Tractor,
    },
    {
      id: 'step-2',
      number: '02',
      title: 'Sortex & Grading',
      description: 'Multi-stage optical colour sorting and magnetic destoning to 99.5% purity',
      icon: Sparkles,
    },
    {
      id: 'step-3',
      number: '03',
      title: 'Processing Technique',
      description: 'Low-temperature cryogenic grinding and hygiene-controlled pulse de-husking',
      icon: Cpu,
    },
    {
      id: 'step-4',
      number: '04',
      title: 'Quality & Ageing',
      description: 'Laboratory moisture audit, volatile oil testing, and strict aflatoxin verification',
      icon: Award,
    },
    {
      id: 'step-5',
      number: '05',
      title: 'Packaging & Dispatch',
      description: 'Retail stand-up barrier pouches (100g–1kg) & 25kg–50kg export container loads',
      icon: PackageCheck,
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching Screenshot 1 */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">
            STANDARDIZED AGRICULTURAL WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F] tracking-tight">
            KEY <span className="text-[#D4AF37]">PROCESS</span>
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* 5 Circular Process Steps */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="flex flex-col items-center text-center group"
              >
                {/* Circular Outline Icon with Gold Border on Hover */}
                <div className="relative mb-5">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-slate-200 group-hover:border-[#D4AF37] bg-[#FAF8F5] flex items-center justify-center transition-all duration-300 shadow-xs group-hover:shadow-md">
                    <Icon className="w-10 h-10 sm:w-11 sm:h-11 text-[#0A192F] group-hover:text-[#D4AF37] transition-colors stroke-[1.5]" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#0A192F] text-[#D4AF37] text-xs font-mono font-bold flex items-center justify-center border border-[#D4AF37]/50 shadow-xs">
                    {step.number}
                  </span>
                </div>

                {/* Step Label matching Screenshot 1 */}
                <h3 className="text-sm sm:text-base font-bold text-[#0A192F] font-serif mb-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

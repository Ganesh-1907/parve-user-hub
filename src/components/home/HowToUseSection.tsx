import { Droplets, Sparkles, Sun, Moon, Waves } from "lucide-react";

const routineSteps = [
  {
    number: "1",
    title: "Cleanser",
    description: "Start with a fresh base",
    icon: Waves,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    number: "2",
    title: "Serum",
    description: "Deep treatment & repair",
    icon: Droplets,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    number: "3",
    title: "Moisturizer",
    description: "Lock in hydration",
    icon: Sparkles,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    number: "4",
    title: "Sunscreen",
    description: "Daily skin protection",
    icon: Sun,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    number: "5",
    title: "Night Cream",
    description: "Overnight rejuvenation",
    icon: Moon,
    color: "bg-indigo-500/10 text-indigo-500",
  },
];

export function HowToUseSection() {
  return (
    <section className="py-12 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/2 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary rounded-full">
            Daily Ritual
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
            How To Use
          </h2>
          <p className="text-lg text-muted-foreground">
            Follow our signature 5-step routine for scientifically proven results and a radiant, healthy glow.
          </p>
        </div>

        {/* Mobile Layout (Standard List) - Visible only on mobile */}
        <div className="block md:hidden space-y-8">
          {/* Mobile Hub Header */}
          <div className="text-center mb-10">
            <div className="inline-flex flex-col items-center justify-center w-32 h-32 bg-white rounded-full shadow-lg border border-primary/5 mb-6">
              <h3 className="font-serif text-lg font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent uppercase tracking-tight">
                Parve
              </h3>
              <p className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground/80 uppercase">
                Skin Routine
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 px-2">
             {routineSteps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center bg-white p-6 rounded-[2.5rem] shadow-md border border-primary/5 animate-fade-in-up">
                {/* Number Badge */}
                <div className="absolute top-4 right-6 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md z-10">
                  {step.number}
                </div>
                
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${step.color} relative overflow-hidden backdrop-blur-sm`}>
                   <div className={`absolute inset-0 ${step.color.split(' ')[0]} opacity-20`} />
                   <step.icon size={32} className="relative z-10" />
                </div>
                
                <h4 className="font-serif text-xl font-bold text-foreground mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed px-4">{step.description}</p>
                
                {/* Visual Connector for mobile list (except last item) */}
                {idx < routineSteps.length - 1 && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-6 border-l-2 border-dashed border-primary/20" />
                )}
              </div>
             ))}
          </div>
        </div>

        {/* Desktop Circular Layout - Hidden on mobile */}
        <div className="hidden md:flex relative max-w-4xl mx-auto md:h-[600px] items-center justify-center">
          
          {/* Main Circle Outline */}
          <div className="absolute w-[450px] h-[450px] border border-primary/10 rounded-full" />

          {/* Center Hub */}
          <div className="relative z-20 w-56 h-56 bg-white rounded-full p-4 shadow-2xl flex items-center justify-center text-center animate-scale-in border border-primary/5">
            <div className="absolute inset-2 border-2 border-dashed border-primary/10 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent uppercase tracking-tight">
                Parve
              </h3>
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground/80 uppercase">
                Skin Routine
              </p>
            </div>
          </div>

          {/* Desktop Circular Distribution */}
          <div className="absolute inset-0">
            {routineSteps.map((step, idx) => {
              const angle = (idx * 72 - 90) * (Math.PI / 180);
              const radius = 240;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={idx}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group w-48 h-48 z-30 transition-all duration-700 hover:z-40"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  }}
                >
                  <div className="w-full h-full bg-white rounded-full shadow-xl border border-primary/5 flex flex-col items-center justify-center p-6 transition-transform duration-500 group-hover:scale-110">
                    <div className="absolute top-2 right-6 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white font-bold text-[10px] shadow-lg z-20 border-2 border-white">
                      {step.number}
                    </div>
                    
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-2 ${step.color} relative overflow-hidden backdrop-blur-sm`}>
                       <div className={`absolute inset-0 ${step.color.split(' ')[0]} opacity-20`} />
                       <step.icon size={28} className="relative z-10" />
                    </div>
                    
                    <div className="text-center">
                      <h4 className="font-serif text-base font-bold text-foreground mb-0.5">{step.title}</h4>
                      <p className="text-[10px] text-muted-foreground leading-tight px-2">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

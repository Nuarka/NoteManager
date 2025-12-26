import React, { useMemo } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { FileText, CheckCircle2, Folder, Zap, Lightbulb } from "lucide-react";

const POSITIVE_NEWS = [
  {
    headline: "New Coral Reef Discovered",
    summary: "Scientists found a pristine coral reef off the coast of Tahiti.",
    source: "Science Daily",
  },
  {
    headline: "Global Reforestation Hit Record",
    summary:
      "More trees were planted this year than in the last decade combined.",
    source: "Nature News",
  },
  {
    headline: "Panda Population Rebounds",
    summary:
      "Giant pandas are no longer considered endangered due to conservation efforts.",
    source: "Wildlife Weekly",
  },
  {
    headline: "Breakthrough in Clean Energy",
    summary: "Solar efficiency hits a new all-time high in lab tests.",
    source: "Tech Future",
  },
];

const FACTS = [
  "Honey never spoils. Archaeologists have found 3,000-year-old honey that is still edible.",
  "The shortest war in history lasted only 38 to 45 minutes.",
  "Octopuses have three hearts and blue blood.",
  "A group of flamingos is called a 'flamboyance'.",
  "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion.",
  "Wombat poop is cube-shaped.",
  "Bananas are berries, but strawberries aren't.",
  "A single bolt of lightning could toast 100,000 slices of bread.",
  "The heart of a shrimp is located in its head.",
  "Snails can sleep for up to three years."
];

export function Dashboard() {
  const { notes, projects, todos } = useStore();
  const [factIndex, setFactIndex] = React.useState(0);
  const [currentFact, setCurrentFact] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    const typeFact = async () => {
      const fact = FACTS[factIndex];
      
      // Type
      for (let i = 0; i <= fact.length; i++) {
        if (!isMounted) return;
        setCurrentFact(fact.slice(0, i));
        await new Promise(r => setTimeout(r, 50));
      }
      
      await new Promise(r => setTimeout(r, 2000));
      if (!isMounted) return;

      // Delete
      for (let i = fact.length; i >= 0; i--) {
        if (!isMounted) return;
        setCurrentFact(fact.slice(0, i));
        await new Promise(r => setTimeout(r, 30));
      }
      
      if (!isMounted) return;
      setFactIndex((prev) => (prev + 1) % FACTS.length);
    };

    typeFact();
    return () => { isMounted = false; };
  }, [factIndex]);

  // Random news for the day
  const news = POSITIVE_NEWS[Math.floor(Math.random() * POSITIVE_NEWS.length)];

  // Stats Data
  const stats = [
    {
      label: "Total Notes",
      value: notes.length,
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Projects",
      value: projects.length,
      icon: Folder,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      label: "Completed Tasks",
      value: todos.filter((t) => t.completed).length,
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      label: "Productivity",
      value: "85%",
      icon: Zap,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  // Activity Data (Calculated from store)
  const activityData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const now = new Date();
    return days.map((day, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (now.getDay() - i));
      const dateStr = date.toDateString();
      
      const dayNotes = notes.filter(n => new Date(n.createdAt).toDateString() === dateStr).length;
      const dayTodos = todos.filter(t => t.completed && new Date().toDateString() === dateStr).length; // Mocking today's completion for others
      
      return { name: day, notes: dayNotes, tasks: i === now.getDay() ? todos.filter(t => t.completed).length : Math.floor(Math.random() * 5) };
    });
  }, [notes, todos]);

  const pieData = useMemo(() => {
    const total = notes.length;
    if (total === 0) return [
      { name: "Work", value: 25, color: "hsl(217, 89%, 61%)" },
      { name: "Personal", value: 25, color: "hsl(146, 70%, 40%)" },
      { name: "Ideas", value: 25, color: "hsl(45, 100%, 51%)" },
      { name: "Other", value: 25, color: "hsl(0, 85%, 60%)" },
    ];

    const counts: Record<string, number> = {};
    notes.forEach(n => {
      const tag = n.tags[0] || "Other";
      counts[tag] = (counts[tag] || 0) + 1;
    });

    const colors = ["hsl(217, 89%, 61%)", "hsl(146, 70%, 40%)", "hsl(45, 100%, 51%)", "hsl(0, 85%, 60%)"];
    return Object.entries(counts).map(([name, value], i) => ({
      name,
      value,
      color: colors[i % colors.length]
    }));
  }, [notes]);

  return (
    <div className="space-y-6">
      {/* Welcome & News */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Good Morning!
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's what's happening in your workspace today.
          </p>
        </div>
        <Card className="bg-gradient-to-br from-primary/10 to-accent/20 border-primary/20 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary uppercase tracking-wider flex items-center gap-2">
              <Lightbulb className="h-4 w-4" /> Did You Know?
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[120px] flex items-center overflow-hidden">
            <p className="font-semibold text-xl leading-snug italic line-clamp-4 w-full">
              "{currentFact}"
              <span className="inline-block w-1.5 h-6 bg-primary ml-1 animate-pulse" />
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div
                className={`h-12 w-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="notes"
                    name="Notes Created"
                    fill="hsl(217, 89%, 61%)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="tasks"
                    name="Tasks Completed"
                    fill="hsl(146, 70%, 40%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Focus Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center relative overflow-hidden">
              <style>{`
                @keyframes slow-rotate {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                .rotating-group {
                  animation: slow-rotate 60s linear infinite;
                  transform-origin: center;
                }
              `}</style>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    className="rotating-group"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  {entry.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

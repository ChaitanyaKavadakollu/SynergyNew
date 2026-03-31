import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

interface SkillRadarChartProps {
  data: SkillData[];
  height?: number;
}

export function SkillRadarChart({ data, height = 300 }: SkillRadarChartProps) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#2A2A2A" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1C1C1C', 
              borderColor: '#2A2A2A',
              borderRadius: '8px',
              color: '#F1F5F9'
            }} 
            itemStyle={{ color: '#D4A373' }}
          />
          <Radar
            name="Skill Proficiency"
            dataKey="A"
            stroke="#D4A373"
            fill="#D4A373"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

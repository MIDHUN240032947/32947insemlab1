import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
  isActive?: boolean;
}

export function MetricCard({ title, value, icon: Icon, color, onClick, isActive }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card 
        className={`cursor-pointer transition-all duration-300 ${
          isActive 
            ? 'ring-2 ring-offset-2 shadow-lg' 
            : 'hover:shadow-md'
        }`}
        style={{ 
          borderColor: isActive ? color : undefined,
          ringColor: isActive ? color : undefined 
        }}
        onClick={onClick}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm">{title}</CardTitle>
          <div 
            className="h-10 w-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="text-2xl"
            key={value}
            initial={{ scale: 1.2, color }}
            animate={{ scale: 1, color: 'inherit' }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.div>
          <p className="text-xs text-muted-foreground mt-1">
            Click to view details
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

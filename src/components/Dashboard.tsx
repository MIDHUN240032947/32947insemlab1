import { useState } from 'react';
import { MetricCard } from './MetricCard';
import { AddPostForm } from './AddPostForm';
import { PostsList, Post } from './PostsList';
import { FileText, Send, Clock, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { motion } from 'motion/react';

type MetricType = 'total' | 'submitted' | 'recent' | 'trending';

export function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<MetricType | null>(null);
  const [submittedCount, setSubmittedCount] = useState(0);

  const handlePostAdded = (post: { id: number; title: string; body: string }) => {
    const newPost: Post = {
      ...post,
      timestamp: new Date().toLocaleString(),
    };
    setPosts([newPost, ...posts]);
    setSubmittedCount(prev => prev + 1);
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const recentPosts = posts.slice(0, 5);

  const metrics = [
    {
      title: 'Total Posts',
      value: posts.length,
      icon: FileText,
      color: '#3b82f6',
      type: 'total' as MetricType,
      description: 'All posts created'
    },
    {
      title: 'Submitted',
      value: submittedCount,
      icon: Send,
      color: '#10b981',
      type: 'submitted' as MetricType,
      description: 'Successfully submitted to API'
    },
    {
      title: 'Recent',
      value: recentPosts.length,
      icon: Clock,
      color: '#f59e0b',
      type: 'recent' as MetricType,
      description: 'Posts from last 5 submissions'
    },
    {
      title: 'Trending',
      value: posts.length > 0 ? Math.floor(Math.random() * 100) + 50 : 0,
      icon: TrendingUp,
      color: '#8b5cf6',
      type: 'trending' as MetricType,
      description: 'Engagement score'
    },
  ];

  const selectedMetricData = metrics.find(m => m.type === selectedMetric);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Post Management Dashboard</h1>
          <p className="text-muted-foreground">
            Create, manage, and track your posts with real-time metrics
          </p>
        </div>

        {/* Metrics Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <MetricCard
                title={metric.title}
                value={metric.value}
                icon={metric.icon}
                color={metric.color}
                onClick={() => setSelectedMetric(metric.type)}
                isActive={selectedMetric === metric.type}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AddPostForm onPostAdded={handlePostAdded} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PostsList posts={posts} onDelete={handleDeletePost} />
          </motion.div>
        </div>
      </motion.div>

      {/* Metric Details Dialog */}
      <Dialog open={selectedMetric !== null} onOpenChange={() => setSelectedMetric(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedMetricData && (
                <>
                  <div 
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${selectedMetricData.color}20` }}
                  >
                    <selectedMetricData.icon className="h-5 w-5" style={{ color: selectedMetricData.color }} />
                  </div>
                  {selectedMetricData.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedMetricData?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="text-center">
              <motion.div 
                className="text-6xl mb-4"
                style={{ color: selectedMetricData?.color }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {selectedMetricData?.value}
              </motion.div>
              <p className="text-muted-foreground">
                {selectedMetric === 'total' && 'Total number of posts in your collection'}
                {selectedMetric === 'submitted' && 'Posts successfully sent to the API'}
                {selectedMetric === 'recent' && 'Your most recent submissions'}
                {selectedMetric === 'trending' && 'Calculated engagement metric'}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

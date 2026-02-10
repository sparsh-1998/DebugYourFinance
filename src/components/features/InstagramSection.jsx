import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Instagram, Loader2, AlertCircle } from 'lucide-react';

export default function InstagramSection() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Instagram feed from serverless function
  useEffect(() => {
    async function fetchInstagramFeed() {
      try {
        setLoading(true);
        setError(null);

        // Fetch from Vercel serverless function
        const response = await fetch('/api/instagram');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.videos) {
          setReels(data.videos);
        } else {
          throw new Error(data.message || 'Failed to load Instagram feed');
        }
      } catch (err) {
        console.error('Error fetching Instagram feed:', err);
        setError(err.message);
        // Set fallback placeholder data
        setReels([
          {
            id: 1,
            title: 'Follow us on Instagram',
            thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=700&fit=crop',
            permalink: 'https://instagram.com/debugyourfinance'
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagramFeed();
  }, []);

  return (
    <section id="socials" className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Instagram className="h-8 w-8 text-pink-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Latest from @DebugYourFinance
            </h2>
          </div>
          <p className="text-lg text-slate-600">
            Follow us for daily financial tips, tricks, and insights
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 text-pink-600 animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8 flex items-start space-x-3"
          >
            <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">Unable to load Instagram feed</h3>
              <p className="text-yellow-700 text-sm">
                {error}. Please check your Instagram API configuration or visit our Instagram profile directly.
              </p>
            </div>
          </motion.div>
        )}

        {/* Reels Grid */}
        {!loading && reels.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reels.map((reel, index) => (
              <motion.a
                key={reel.id}
                href={reel.permalink || 'https://instagram.com/debugyourfinance'}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                {/* Thumbnail */}
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4 group-hover:bg-accent group-hover:scale-110 transition-all">
                    <Play className="h-8 w-8 text-primary group-hover:text-white fill-current" />
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-lg drop-shadow-lg line-clamp-2">
                    {reel.title}
                  </p>
                  {reel.timestamp && (
                    <p className="text-white/80 text-xs mt-1">
                      {new Date(reel.timestamp).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://instagram.com/debugyourfinance"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            <Instagram className="h-5 w-5" />
            <span>Follow on Instagram</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

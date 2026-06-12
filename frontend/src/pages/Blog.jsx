import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Lightbulb,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Footer from "../components/Home/Footer";
import { estimateReadTime, fetchBlogJson, formatBlogDate, resolveAssetUrl } from "../utils/blogApi";

const insightCards = [
  "Career clarity starts with self-awareness, not pressure.",
  "Good decisions compare fit, effort, affordability, and future scope.",
  "Your roadmap should change as your skills and interests mature.",
];

const Blog = () => {
  const [adminPosts, setAdminPosts] = useState([]);
  const [failedImages, setFailedImages] = useState({});

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await fetchBlogJson("/api/blogs");
        setAdminPosts(data.blogs || []);
      } catch (err) {
        console.error("Failed to load blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  const allPosts = [
    ...adminPosts.map((post) => ({
      ...post,
      date: formatBlogDate(post.createdAt),
      readTime: estimateReadTime(`${post.title} ${post.excerpt}`),
      image: resolveAssetUrl(post.image),
    })),
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <section className="relative overflow-hidden bg-[#020B24] px-6 py-20 text-white md:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.35),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.32),_transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
              <Sparkles size={16} />
              CareerGenAI Blog
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Career advice that makes the next step feel clearer.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Explore practical guides on student guidance, study abroad,
              resumes, career quizzes, and planning a future that fits your
              strengths.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/careerquiz"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Take Career Quiz
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/free-counseling"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Book Free Counseling
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-6 text-slate-950">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <BookOpen size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                    Featured Guide
                  </p>
                  <h2 className="text-xl font-bold">Career Roadmap Starter</h2>
                </div>
              </div>
              <p className="text-slate-600">
                Use this simple framework to decide what to explore first, what
                to postpone, and when to ask an expert for help.
              </p>
              <div className="mt-6 space-y-3">
                {insightCards.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 text-emerald-500" size={18} />
                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-semibold text-blue-600">Latest Articles</p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                Fresh guidance for smarter career decisions
              </h2>
            </div>
            <p className="max-w-xl text-slate-600">
              Short, useful reads built for students and parents who want clear
              next steps without the overwhelm.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {allPosts.map((post) => {
              const hasImage = Boolean(post.image && !failedImages[post.slug]);

              return (
              <Link
                key={post.title}
                to={`/blog/${post.slug}`}
                className={`user-blog-card group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition ${
                  hasImage ? "user-blog-card-with-image" : "user-blog-card-no-image p-6 md:col-span-3"
                }`}
              >
                {hasImage && (
                  <div className="user-blog-image-wrap w-full overflow-hidden bg-blue-50">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [post.slug]: true }))
                      }
                    />
                  </div>
                )}
                <div className={hasImage ? "user-blog-card-body p-6" : "user-blog-no-image-content"}>
                <div className="user-blog-category mb-5 inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                  {post.category}
                </div>
                <h3 className="user-blog-title text-xl font-bold leading-snug text-slate-950 group-hover:text-blue-700">
                  {post.title}
                </h3>
                <p className="user-blog-excerpt mt-4 text-sm leading-6 text-slate-600">
                  {post.excerpt}
                </p>
                <div className="user-blog-meta mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={16} />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={16} />
                    {post.readTime}
                  </span>
                </div>
                <div className="user-blog-read mt-6 inline-flex items-center gap-2 font-semibold text-blue-700">
                  Read full article
                  <ArrowRight size={17} />
                </div>
                </div>
              </Link>
            );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-blue-600 p-7 text-white">
            <GraduationCap size={34} />
            <h3 className="mt-5 text-2xl font-bold">For Students</h3>
            <p className="mt-3 text-blue-50">
              Stream selection, skill building, career discovery, and exam
              planning made easier.
            </p>
          </div>
          <div className="rounded-3xl bg-[#020B24] p-7 text-white">
            <TrendingUp size={34} />
            <h3 className="mt-5 text-2xl font-bold">For Parents</h3>
            <p className="mt-3 text-slate-300">
              Clear ways to support major education decisions with less stress
              and better context.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <Lightbulb className="text-amber-500" size={34} />
            <h3 className="mt-5 text-2xl font-bold">For Career Planning</h3>
            <p className="mt-3 text-slate-600">
              Roadmaps, resume ideas, consultation tips, and practical action
              plans for each stage.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white md:p-12">
          <h2 className="text-3xl font-bold md:text-4xl">
            Want advice for your exact career situation?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-blue-50">
            Talk to CareerGenAI counsellors and get a personalized direction
            based on your goals, marks, interests, and constraints.
          </p>
          <Link
            to="/free-counseling"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50"
          >
            Schedule Consultation
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;

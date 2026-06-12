import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  GraduationCap,
  Share2,
  Sparkles,
} from "lucide-react";
import Footer from "../components/Home/Footer";
import { estimateReadTime, fetchBlogJson, formatBlogDate, resolveAssetUrl } from "../utils/blogApi";

const BlogArticle = () => {
  const { slug } = useParams();
  const [dynamicPost, setDynamicPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
    let isMounted = true;

    const fetchPost = async () => {
      try {
        const data = await fetchBlogJson(`/api/blogs/${slug}`);
        if (isMounted) setDynamicPost(data.blog);

        const listData = await fetchBlogJson("/api/blogs");
        if (isMounted) {
          setRelatedPosts(
            (listData.blogs || []).filter((item) => item.slug !== slug).slice(0, 2)
          );
        }
      } catch (err) {
        console.error("Failed to load blog article:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-24 text-center text-slate-600">
        Loading blog article...
      </div>
    );
  }

  const post = dynamicPost
    ? {
        ...dynamicPost,
        date: formatBlogDate(dynamicPost.createdAt),
        readTime: estimateReadTime(dynamicPost.content),
        image: resolveAssetUrl(dynamicPost.image),
        isDynamic: true,
      }
    : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <section className="relative overflow-hidden bg-[#020B24] px-6 py-16 text-white md:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,_rgba(37,99,235,0.42),_transparent_32%),radial-gradient(circle_at_80%_15%,_rgba(168,85,247,0.32),_transparent_30%)]" />
        <div className="relative mx-auto max-w-5xl">
          <Link
            to="/blog"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 transition hover:bg-white/15"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-100">
            <Sparkles size={16} />
            {post.category}
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {post.excerpt}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              <CalendarDays size={16} />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              <Clock3 size={16} />
              {post.readTime}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              <Share2 size={16} />
              CareerGenAI Guide
            </span>
          </div>
        </div>
      </section>

      <main className="px-6 py-12 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-10">
            {post.image && !imageFailed && (
              <img
                src={post.image}
                alt={post.title}
                className="user-blog-article-image mb-8 w-full rounded-[1.5rem] object-cover"
                onError={() => setImageFailed(true)}
              />
            )}
            <div className="prose max-w-none">
              <div
                className="blog-article-html text-lg leading-8 text-slate-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <GraduationCap size={24} />
              </div>
              <h2 className="mt-5 text-2xl font-bold">Need personal guidance?</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Get a counselling session and understand which path fits your
                marks, interests, budget, and goals.
              </p>
              <Link
                to="/free-counseling"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Book Free Counseling
                <ArrowRight size={17} />
              </Link>
            </div>

            {relatedPosts.length > 0 && (
              <div className="rounded-[2rem] bg-[#020B24] p-6 text-white">
                <h2 className="text-xl font-bold">Related Reads</h2>
                <div className="mt-5 space-y-4">
                  {relatedPosts.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/blog/${item.slug}`}
                      className="block rounded-2xl bg-white/10 p-4 transition hover:bg-white/15"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-200">
                        {item.category}
                      </p>
                      <h3 className="mt-2 font-semibold leading-snug">
                        {item.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogArticle;

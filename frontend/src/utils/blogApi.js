export const API_BASE =
  import.meta.env.REACT_APP_API_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:5009";

const LOCAL_API_BASE = "http://localhost:5009";

const getApiCandidates = () => {
  const candidates = [API_BASE];

  if (window.location.hostname === "localhost" && API_BASE !== LOCAL_API_BASE) {
    candidates.push(LOCAL_API_BASE);
  }

  return candidates;
};

export const fetchBlogJson = async (path, options = {}) => {
  let lastError = null;

  for (const baseUrl of getApiCandidates()) {
    try {
      const res = await fetch(`${baseUrl}${path}`, options);
      const contentType = res.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          `Blog API at ${baseUrl} returned ${contentType || "non-JSON response"}`
        );
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Blog API request failed");
      }

      return data;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("Blog API request failed");
};

export const resolveAssetUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;

  const assetBase =
    window.location.hostname === "localhost" && url.startsWith("/uploads")
      ? LOCAL_API_BASE
      : API_BASE;

  return `${assetBase}${url.startsWith("/") ? url : `/${url}`}`;
};

export const formatBlogDate = (date) => {
  if (!date) return "June 11, 2026";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const estimateReadTime = (text = "") => {
  const words = text.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean);
  return `${Math.max(1, Math.ceil(words.length / 180))} min read`;
};

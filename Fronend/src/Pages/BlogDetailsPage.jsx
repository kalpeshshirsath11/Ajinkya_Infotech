import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { slug } = useParams();

  return (
    <section className="min-h-screen pt-28 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-orange-600 mb-6">
          Blog Title Here
        </h1>

        <p className="text-gray-500 text-sm mb-8">
          Published on Jan 10, 2025
        </p>

        <div className="prose max-w-none text-gray-700">
          Blog content rendered here...
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;

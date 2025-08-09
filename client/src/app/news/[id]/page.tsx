import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router";

export default function NewsDetailsPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <main
      id="main-content"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <article
        id="news-article"
        className="rounded-lg shadow-sm overflow-hidden"
      >
        <div className="p-8">
          <div id="article-header" className="mb-8">
            <h1 className="font-bold text-3xl md:text-4xl leading-tight mb-6">
              IICT Launches New AI Research Lab to Advance Machine Learning
              Studies {id}
            </h1>

            <div
              id="article-meta"
              className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6"
            >
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={["fas", "calendar"]}
                  className="text-primary"
                />
                <span>December 15, 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={["fas", "user"]}
                  className="text-primary"
                />
                <span>IICT Communications</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={["fas", "tag"]}
                  className="text-primary"
                />

                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                  Research
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  AI
                </span>
              </div>
            </div>
          </div>

          <div id="featured-image" className="mb-8">
            <img
              className="w-full h-80 object-cover rounded-lg"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/575df4d319-483388d357a6283304ee.png"
              alt="modern AI research laboratory with students and faculty working on computers, high-tech equipment, professional academic setting"
            />
          </div>

          <div id="article-content" className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              The Institute of Information and Communication Technology (IICT)
              at Shahjalal University of Science and Technology is proud to
              announce the establishment of a cutting-edge Artificial
              Intelligence Research Lab, marking a significant milestone in the
              institute's commitment to advancing technological innovation and
              research excellence.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              This state-of-the-art facility will serve as a hub for
              groundbreaking research in machine learning, deep learning,
              natural language processing, and computer vision. The lab is
              equipped with high-performance computing systems, GPU clusters,
              and advanced software tools necessary for conducting
              world-className AI research.
            </p>

            <h2 className="font-semibold text-2xl mt-8 mb-4">
              Research Focus Areas
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              The new AI Research Lab will concentrate on several key areas:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Machine Learning algorithms and applications</li>
              <li>Computer Vision and Image Processing</li>
              <li>Natural Language Processing for Bangla and English</li>
              <li>Healthcare AI and Medical Imaging</li>
              <li>Agricultural Technology and Smart Farming</li>
            </ul>

            <blockquote className="border-l-4 border-red-600 pl-6 py-4 my-8 bg-gray-50 rounded-r-lg">
              <p className="italic text-lg leading-relaxed">
                "This new AI Research Lab represents our commitment to staying
                at the forefront of technological advancement. We aim to
                contribute meaningfully to the global AI research community
                while addressing local challenges through innovative solutions."
              </p>
              <footer className="text-gray-600 mt-3">
                — Dr. Rahman Ahmed, Director of IICT
              </footer>
            </blockquote>

            <h2 className="font-semibold text-2xl mt-8 mb-4">
              Collaborative Opportunities
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              The lab will foster collaboration between faculty members,
              graduate students, and industry partners. Research projects will
              focus on solving real-world problems while contributing to the
              academic understanding of artificial intelligence technologies.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
              <h3 className="font-semibold text-lg text-blue-900 mb-3">
                <FontAwesomeIcon
                  icon={["fas", "lightbulb"]}
                  className="mr-2 text-blue-600"
                />
                Key Features
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li>• High-performance GPU computing cluster</li>
                <li>• Advanced data storage and processing capabilities</li>
                <li>• Collaborative research spaces</li>
                <li>• Industry partnership programs</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              Students and faculty interested in AI research are encouraged to
              explore opportunities within the new lab. The facility will begin
              operations in January 2025, with several research projects already
              in the planning stages.
            </p>
          </div>

          <div
            id="social-sharing"
            className="border-t border-gray-200 pt-6 mt-8"
          >
            <h3 className="font-semibold text-lg mb-4">Share this article</h3>
            <div className="flex space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition">
                <FontAwesomeIcon icon={["fab", "facebook-f"]} />

                <span>Facebook</span>
              </button>
              <button className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition">
                <FontAwesomeIcon icon={["fab", "twitter"]} />
                <span>Twitter</span>
              </button>
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition">
                <FontAwesomeIcon icon={["fab", "linkedin-in"]} />

                <span>LinkedIn</span>
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition">
                <FontAwesomeIcon icon={["fas", "link"]} />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      </article>

      <div
        id="navigation-links"
        className="mt-8 flex justify-between items-center"
      >
        <Link to={"/news"}>
          <Button>
            <FontAwesomeIcon icon={["fas", "arrow-left"]} />
            <span>Back to All News</span>
          </Button>
        </Link>
      </div>

      <section id="related-articles" className="mt-12">
        <h2 className="font-bold text-2xl mb-6">Related Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <article className="rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
            <img
              className="w-full h-48 object-cover"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/84dfa57642-d876c54029f94823ce13.png"
              alt="students working on computer programming projects in modern classroomName setting"
            />
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2 hover:text-primary transition">
                <span className="cursor-pointer">
                  New Programming Bootcamp Launches for Students
                </span>
              </h3>
              <p className="text-gray-600 text-sm mb-3">December 10, 2024</p>
              <p className="text-gray-700 text-sm">
                IICT announces a comprehensive programming bootcamp designed to
                enhance students' coding skills...
              </p>
            </div>
          </article>

          <article className="rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
            <img
              className="w-full h-48 object-cover"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/11bc4b468f-f55ba447c45ceaa0e926.png"
              alt="research conference with faculty presenting technology innovations, academic setting"
            />
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2 hover:text-primary transition">
                <span className="cursor-pointer">
                  Faculty Research Achievements Recognition
                </span>
              </h3>
              <p className="text-gray-600 text-sm mb-3">December 8, 2024</p>
              <p className="text-gray-700 text-sm">
                Several IICT faculty members receive national recognition for
                their outstanding research contributions...
              </p>
            </div>
          </article>

          <article className="rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
            <img
              className="w-full h-48 object-cover"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c07cb59bc6-c2aaab13ddf4781ab93a.png"
              alt="industry partnership meeting with technology professionals and university representatives"
            />
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2 hover:text-primary transition">
                <span className="cursor-pointer">
                  Industry Partnership Program Expansion
                </span>
              </h3>
              <p className="text-gray-600 text-sm mb-3">December 5, 2024</p>
              <p className="text-gray-700 text-sm">
                IICT expands its industry partnership program to provide more
                internship opportunities...
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

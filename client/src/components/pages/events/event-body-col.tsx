import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EventBodyCol() {
  return (
    <div className="lg:col-span-2">
      <div id="event-banner" className="mb-6">
        <img
          className="w-full h-64 object-cover rounded-lg"
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/172dfe7964-55b5f8f0dbbfb495acb5.png"
          alt="modern tech workshop with students learning AI and machine learning in university lab setting"
        />
      </div>

      <div id="event-title" className="mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">
          AI &amp; Machine Learning Workshop: Building Tomorrow's Technology
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <Badge>Workshop</Badge>
        </div>
      </div>
      <section id="event-description" className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">About This Workshop</h2>
            <p className="text-gray-600 mb-6">
              Join us for an intensive hands-on workshop exploring the
              fascinating world of Artificial Intelligence and Machine Learning.
              This comprehensive session is designed for students,
              professionals, and enthusiasts looking to gain practical
              experience with cutting-edge AI technologies.
            </p>

            <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Fundamentals of Machine Learning algorithms</li>
              <li>Hands-on experience with Python and TensorFlow</li>
              <li>Building and training neural networks</li>
              <li>Real-world applications of AI in various industries</li>
              <li>
                Best practices for data preprocessing and model evaluation
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Workshop Agenda</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">9:00 AM - 10:30 AM</span>
                  <span>Introduction to AI &amp; ML</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">10:45 AM - 12:00 PM</span>
                  <span>Python for Data Science</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">1:00 PM - 2:30 PM</span>
                  <span>Building Your First Model</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">2:45 PM - 4:00 PM</span>
                  <span>Neural Networks Deep Dive</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">4:15 PM - 5:00 PM</span>
                  <span>Q&amp;A and Project Showcase</span>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3">Target Audience</h3>
            <p className="text-gray-600 mb-6">
              This workshop is perfect for undergraduate and graduate students
              in computer science, engineering, and related fields. Basic
              programming knowledge is recommended but not required.
            </p>

            <h3 className="text-xl font-semibold mb-3">Requirements</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
              <li>
                Laptop with Python installed (setup guide will be provided)
              </li>
              <li>Basic understanding of programming concepts</li>
              <li>Enthusiasm to learn and experiment</li>
            </ul>
          </div>

          <div id="attachments" className="mt-8">
            <h3 className="text-xl font-semibold mb-4">
              Downloads &amp; Resources
            </h3>
            <div className="space-y-3">
              <span className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <FontAwesomeIcon
                  icon={["fas", "file-pdf"]}
                  className="text-primary mr-3"
                />
                <div>
                  <div className="font-medium">Workshop Brochure</div>
                  <div className="text-sm text-gray-500">
                    Detailed information and prerequisites (PDF, 2.1 MB)
                  </div>
                </div>
              </span>
              <span className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <FontAwesomeIcon
                  icon={["fas", "code"]}
                  className="text-blue-600 mr-3"
                />
                <div>
                  <div className="font-medium">Setup Guide</div>
                  <div className="text-sm text-gray-500">
                    Python and TensorFlow installation instructions
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

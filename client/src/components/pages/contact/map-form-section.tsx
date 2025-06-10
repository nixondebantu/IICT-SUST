import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MapFormSection() {
  return (
    <section id="map-form-section" className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div id="map-container">
            <h2 className="font-bold text-3xl mb-8 text-center lg:text-left">
              Find Us
            </h2>
            <div className="h-[500px] flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435.21503837877106!2d91.83081294516616!3d24.91808819592443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3750ff8abc36900f%3A0xaf63c6d13271d74f!2sIICT!5e0!3m2!1sen!2sbd!4v1749576133481!5m2!1sen!2sbd"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="w-full rounded-lg shadow-lg"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div id="contact-form-container">
            <h2 className="font-bold text-3xl mb-8 text-center lg:text-left">
              Send Message
            </h2>
            <form id="contact-form" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+880-1711-123456"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>General Inquiry</option>
                  <option>Admission Information</option>
                  <option>Research Collaboration</option>
                  <option>Technical Support</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Please describe your inquiry in detail..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary/90 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary hover:cursor-pointer transition-colors"
              >
                <FontAwesomeIcon
                  icon={["fas", "paper-plane"]}
                  className="mr-2"
                />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

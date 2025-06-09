import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer id="footer" className="bg-footer-bg text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-montserrat font-semibold mb-6">
              About IICT
            </h3>
            <p className="mb-6">
              The Institute of Information and Communication Technology (IICT)
              at SUST is dedicated to excellence in ICT education, research, and
              innovation.
            </p>
            <div className="flex space-x-4">
              <span className="text-white hover:text-primary transition-colors cursor-pointer">
                <FontAwesomeIcon
                  icon={["fab", "facebook-f"]}
                  className="text-lg"
                />
              </span>
              <span className="text-white hover:text-primary transition-colors cursor-pointer">
                <FontAwesomeIcon
                  icon={["fab", "twitter"]}
                  className="text-lg"
                />
              </span>
              <span className="text-white hover:text-primary transition-colors cursor-pointer">
                <FontAwesomeIcon
                  icon={["fab", "instagram"]}
                  className="text-lg"
                />
              </span>
              <span className="text-white hover:text-primary transition-colors cursor-pointer">
                <FontAwesomeIcon
                  icon={["fab", "linkedin"]}
                  className="text-lg"
                />
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-montserrat font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  About Us
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Academic Programs
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Research
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Faculty &amp; Staff
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  News &amp; Events
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Contact Us
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h3 className="text-xl font-montserrat font-semibold mb-6">
              Programs
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  B.Sc. in Software Engineering
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  M.Sc. in Information Technology
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  PG Diploma in IT
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Certificate Courses
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Short Courses
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-xl font-montserrat font-semibold mb-6">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FontAwesomeIcon
                  icon={["fas", "location-dot"]}
                  className="mr-3"
                />
                <span>
                  Information and Communication Technology, Shahjalal University
                  of Science and Technology, Sylhet-3114, Bangladesh
                </span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={["fas", "phone"]} className="mr-3" />
                <span>+880-821-XXXXXXX</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={["fas", "envelope"]} className="mr-3" />
                <span>info@iict.sust.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>
              &copy; {new Date().getFullYear()} Institute of Information and
              Communication Technology, SUST. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <span className="mr-4 hover:text-primary transition-colors cursor-pointer">
                Privacy Policy
              </span>
              <span className="hover:text-primary transition-colors cursor-pointer">
                Terms of Use
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

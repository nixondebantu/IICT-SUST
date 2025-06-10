import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer id="footer" className="bg-footer-bg text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">IICT SUST</h3>
            <p className="text-gray-400">
              Institute of Information and Communication Technology, Shahjalal
              University of Science and Technology
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/programs"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Programs
                </Link>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white cursor-pointer">
                  Admissions
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white cursor-pointer">
                  Research
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <FontAwesomeIcon icon={["fas", "phone"]} className="mr-2" />
                +880-821-713491
              </li>
              <li>
                <FontAwesomeIcon icon={["fas", "envelope"]} className="mr-2" />
                info@iict.sust.edu
              </li>
              <li>
                <FontAwesomeIcon
                  icon={["fas", "location-dot"]}
                  className="mr-2"
                />
                SUST, Sylhet, Bangladesh
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <span className="text-gray-400 hover:text-white cursor-pointer">
                <FontAwesomeIcon
                  icon={["fab", "facebook"]}
                  className="text-xl"
                />
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                <FontAwesomeIcon
                  icon={["fab", "twitter"]}
                  className="text-xl"
                />
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                <FontAwesomeIcon
                  icon={["fab", "linkedin"]}
                  className="text-xl"
                />
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                <FontAwesomeIcon
                  icon={["fab", "youtube"]}
                  className="text-xl"
                />
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Institute of Information and
            Communication Technology, SUST. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

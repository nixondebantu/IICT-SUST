import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContactInfo() {
  return (
    <section id="contact-info" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div
            id="address-card"
            className="text-center p-8 bg-gray-100 rounded-xl"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon
                icon={["fas", "location-dot"]}
                className="text-primary-foreground text-2xl"
              />
            </div>
            <h3 className="font-montserrat font-semibold text-xl mb-4">
              Address
            </h3>
            <p className="text-accent-gray leading-relaxed">
              Institute of Information and Communication Technology
              <br />
              Shahjalal University of Science and Technology
              <br />
              Sylhet-3114, Bangladesh
            </p>
          </div>

          <div
            id="phone-card"
            className="text-center p-8 bg-gray-100 rounded-xl"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon
                icon={["fas", "phone"]}
                className="text-primary-foreground text-2xl"
              />
            </div>
            <h3 className="font-montserrat font-semibold text-xl mb-4">
              Phone
            </h3>
            <p className="text-accent-gray">
              Office: +880-821-713491
              <br />
              Mobile: +880-1711-123456
            </p>
          </div>

          <div
            id="email-card"
            className="text-center p-8 bg-gray-100 rounded-xl"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon
                icon={["fas", "envelope"]}
                className="text-primary-foreground text-2xl"
              />
            </div>
            <h3 className="font-montserrat font-semibold text-xl mb-4">
              Email
            </h3>
            <p className="text-accent-gray">
              info@iict.sust.edu
              <br />
              admission@iict.sust.edu
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

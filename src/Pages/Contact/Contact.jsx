import React from "react";

const Contact = () => {
  return (
    <section className="min-h-screen bg-gray-50 px-6 py-20">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Contact
        </h1>

        <p className="text-gray-600 mb-12">
          For inquiries regarding orders, production tracking, or platform support, 
          reach us using the information below.
        </p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              Email
            </h3>
            <a
              href="mailto:support@orderloom.com"
              className="text-gray-900 hover:text-indigo-600 transition"
            >
              support@orderloom.com
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              Phone
            </h3>
            <a
              href="tel:+8801234567890"
              className="text-gray-900 hover:text-indigo-600 transition"
            >
              +880 1234 567890
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              Office Location
            </h3>
            <p className="text-gray-900">
              Dhaka, Bangladesh
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              Working Hours
            </h3>
            <p className="text-gray-900">
              Sunday – Thursday, 9:00 AM – 6:00 PM
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;

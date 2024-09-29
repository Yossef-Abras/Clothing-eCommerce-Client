import React from "react";

export default function TermsOfService() {
  return (
    <div className="container mx-auto p-6 max-w-3xl bg-gray-100 shadow-lg rounded-lg my-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Terms of Service
      </h1>
      <div className="space-y-6 text-gray-700">
        <p>
          Welcome to <span className="font-bold">Saramoda</span>. These
          terms and conditions outline the rules and regulations for the use of
          our website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing and using our website, you accept and agree to be bound
          by the terms and conditions outlined in this agreement. If you do not
          agree to these terms, please do not use our services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          2. Modifications to Terms
        </h2>
        <p>
          We reserve the right to update or modify these terms at any time
          without prior notice. Your continued use of the website following any
          changes constitutes your acceptance of the new terms.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          3. Use of the Website
        </h2>
        <p>
          {
            "You agree to use the website for lawful purposes only and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website."
          }
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          4. Intellectual Property
        </h2>
        <p>
          All content on this website, including text, graphics, logos, images,
          and software, is the property of [Your Store Name] or its content
          suppliers and is protected by copyright laws. Unauthorized use of any
          content is prohibited.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          5. Limitation of Liability
        </h2>
        <p>
          Saramoda shall not be liable for any damages that result from the use
          or inability to use the materials on this website, even if [Your Store
          Name] or an authorized representative has been notified orally or in
          writing of the possibility of such damage.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          6. Governing Law
        </h2>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of saramoda, and you irrevocably submit to the exclusive
          jurisdiction of the courts in that location.
        </p>

        <p>
          If you have any questions about these Terms, please contact us at
          [Contact Email].
        </p>
      </div>
    </div>
  );
}

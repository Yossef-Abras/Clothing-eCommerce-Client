import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-6 max-w-3xl shadow-lg rounded-lg my-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
      <div className="space-y-6 text-gray-700">
        <p>
          At <span className="text-primary">Saramoda</span>, we value your
          privacy and are committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, and share your data
          when you visit or make a purchase from our website.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800">
          Information We Collect
        </h2>
        <p>
          We collect information such as your name, email address, billing and
          shipping address, payment details, and any other information you
          provide when placing an order.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800">
          How We Use Your Information
        </h2>
        <p>
          We use your information to fulfill your orders, communicate with you,
          screen for potential fraud, and improve our services.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800">
          Sharing Your Information
        </h2>
        <p>
          We do not share your personal information with third parties except to
          comply with the law, protect our rights, or fulfill your order.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800">Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal
          information at any time. Please contact us if you wish to exercise
          these rights.
        </p>
        <p>For more information, please contact us at [Contact Email].</p>
      </div>
    </div>
  );
}

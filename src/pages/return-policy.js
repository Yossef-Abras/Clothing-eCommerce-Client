import React from "react";

export default function ReturnPolicy() {
  return (
    <div className="container mx-auto p-6 max-w-3xl shadow-lg rounded-lg my-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Return Policy</h1>
      <div className="space-y-6 text-gray-700">
        <p>
          Your satisfaction is our top priority. If you are not completely
          satisfied with your purchase, we are here to help.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          1. Customer Return Request
        </h2>
        <p>
          The customer submits a return request through the website. They can
          access the Orders Page in their account, select the item they wish to
          return, and follow the instructions to complete the return request.
          The request must include the order number, the item to be returned,
          and the reason (such as incorrect size, damaged item, or
          dissatisfaction).
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          2. Eligibility Check
        </h2>
        <p>
          We verify that the item is within the return window (30 days from the
          date of purchase) and meets the return conditions (unused, with tags
          attached).
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          3. Sending Return Instructions
        </h2>
        <p>
          If the item is eligible for return, we send clear instructions to the
          customer, including the return address and the preferred shipping
          method.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          4. Shipping the Item
        </h2>
        <p>
          The customer ships the item to our return address. Once the product
          arrives, we check its condition to ensure it complies with the return
          policy.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          5. Product Inspection
        </h2>
        <p>
          Upon receiving the product, it is inspected to ensure it is unused,
          undamaged, and in its original packaging. For damaged or defective
          products, we process the return promptly to ensure a full refund. If
          the product does not meet the return criteria, the customer will be
          notified of the reason for the rejection.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          6. Processing the Refund
        </h2>
        <p>
          After the return is approved, we process the refund using the original
          payment method. We notify the customer that the refund may take 5-10
          business days to appear in their account.
        </p>
      </div>
    </div>
  );
}

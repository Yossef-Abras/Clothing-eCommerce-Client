import React from 'react';

export default function ReturnPolicy() {
    return (
        <div className="container mx-auto p-6 max-w-3xl shadow-lg rounded-lg my-4 bg-orange-100">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Return & Exchange Policy</h1>
            <div className="space-y-6 text-gray-700">
                <p>Your satisfaction is our top priority. If you are not completely satisfied with your purchase, we are here to help.</p>
                <h2 className="text-2xl font-semibold text-gray-800">Returns</h2>
                <p>You have 30 days from the date of purchase to return any item. To be eligible for a return, the item must be unused, in the same condition that you received it, and in the original packaging.</p>
                <h2 className="text-2xl font-semibold text-gray-800">Exchanges</h2>
                <p>If you need to exchange an item for a different size or color, please contact us within 30 days of your purchase. We will process the exchange once we receive the returned item.</p>
                <h2 className="text-2xl font-semibold text-gray-800">Refunds</h2>
                <p>Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed and applied to your original method of payment within a certain amount of days.</p>
                <p>For more details, please contact us at [Contact Email].</p>
            </div>
        </div>
    );
}

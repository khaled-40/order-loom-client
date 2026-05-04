import React from "react";
import quotation from '../../assets/reviewQuote.png'

const ReviewCard = ({ review }) => {
    console.log(review)
    const { quote, name, role, avatar } = review;
    console.log(quote)

    return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 max-w-md">
            {/* Quote Icon */}
            <div className="text-5xl text-gray-200 mb-3">
                <img src={quotation} alt="" />
            </div>

            {/* Review Text */}
            <p className="text-gray-600 text-sm mb-6">
                {quote}
            </p>

            {/* Reviewer Info */}
            <div className="flex items-center gap-3">
                <img
                    src={avatar}
                    alt={name}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <h4 className="text-sm font-semibold text-gray-800">
                        {name}
                    </h4>
                    <p className="text-xs text-gray-500">
                        {role}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
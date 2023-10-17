import React from 'react';

interface RatingProps {
    currentRating: number;
    updateRating: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ currentRating, updateRating }) => {
    const renderStars = (): JSX.Element[] => {
        const stars: JSX.Element[] = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <div
                    key={i}
                    className={`star ${i <= currentRating ? 'text-yellow-500' : ''}`}
                    onClick={() => handleStarClick(i)}
                >
                    ★
                </div>
            );
        }

        return stars;
    }

    const handleStarClick = (rating: number): void => {
        updateRating(rating);
    }

    return (
        <div className="flex text-xl rating-container">
            {renderStars()}
        </div>
    );
}

export default Rating;

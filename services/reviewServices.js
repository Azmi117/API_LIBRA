const { Review } = require('../models');

const getAllReview = async (params) => {
    const book_id = params;
    const review = await Review.findAll({
        where:{
            book_id
        }
    });
    if(!review) throw new Error ('No review exist');

    return review;
}

const createReview = async (params) => {
    const {user_id, book_id, komentar, rating} = params;

    const review = await Review.create({
        user_id,
        book_id,
        komentar,
        rating
    });

    if(!review) throw new Error('Failed Create Review');

    return review;
}

const updateReview = async (params) => {
    const {id, komentar, rating} = params;
    const update = await Review.update(
        {komentar, rating},
        {
            where:{
                id
            }
        }
        );

    if(!update) throw new Error('Review not found');

    const user = await Review.findByPk(id);

    return user;
}

const deleteReview = async (params) => {
    const id = params;
    const review = await Review.destroy({
        where:{
            id
        }
    });

    if(!review) throw new Error('Review not found');

    return { message: 'delete success' };
}

module.exports = {
    getAllReview,
    createReview,
    updateReview,
    deleteReview
}
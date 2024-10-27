const reviewServices = require('../services/reviewServices');

const getAllReview = async (req, res, next) => {
    try{
        const review = await reviewServices.getAllReview(req.params.id);
        res.status(200).json(review);
    }catch(error){
        next(error);
    }
}

const createReview = async (req, res, next) => {
    try{
        let reviewData = {
            ...req.body,
            book_id: req.params.id,
            user_id: req.user.id
        }

        const review = await reviewServices.createReview(reviewData);
        res.status(201).json(review);
    }catch(error){
        next(error);
    }
}

const updateReview = async (req, res, next) => {
    try{
        const review = await reviewServices.updateReview({
            id: req.params.id,
            ...req.body
        });

        res.status(200).json(review);

    }catch(error){
        next(error);
    }
}

const deleteReview = async (req, res, next) => {
    try{
        await reviewServices.deleteReview(req.params.id);
        res.status(204).send();
    }catch(error){
        next(error);
    }
}

module.exports = {
    getAllReview,
    createReview,
    updateReview,
    deleteReview
}
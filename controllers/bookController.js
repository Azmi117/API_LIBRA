const bookService = require('../services/bookService');

const getAllBook = async (req, res, next) => {
    try {
        const { genre, title, limit, page } = req.query;
        const parsedLimit = parseInt(limit, 10) || 10; // Default to 10 if NaN
        const parsedPage = parseInt(page, 10) || 1; // Default to 1 if NaN

        const params = {
            genre,
            title,
            limit: parsedLimit,
            offset: (parsedPage - 1) * parsedLimit
        };

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const bookData = await bookService.getAllBook(params, baseUrl);

        res.status(200).json(bookData);
    } catch (error) {
        next(error);
    }
};





const getBookById = async (req, res, next) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const book = await bookService.getBookById(req.params.id, baseUrl);
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}


const createBook = async (req, res, next) => {
    try {
        let bookData = {
            ...req.body,
            photo: req.file ? req.file.path.replace(/\\/g, '/') : null,
            upload_by: req.user.username
        };

        const book = await bookService.createBook(bookData);

        if (book.photo) {
            book.photo = `${req.protocol}://${req.get('host')}/${book.photo}`;
        }

        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
};

const updateBook = async (req, res, next) => {
    try{
        let photo = req.file ? req.file.path : null;

            if (photo) {
                photo = photo.replace(/\\/g, '/');
            }

        const book = await bookService.updateBook({
            id:req.params.id,
            photo:photo,
            ...req.body
        });

        book.photo = `${req.protocol}://${req.get('host')}/${book.photo}`;

        res.status(200).json(book);
    }catch(error){
        next(error);
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const id = req.params.id; 
        await bookService.deleteBook(id);
        res.status(204).send(); 

        return { message: 'delete success' };
    } catch (error) {
        next(error);
    }
};




module.exports = {
    getAllBook,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}
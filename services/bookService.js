const { Op } = require('sequelize');
const { Book } = require('../models');

const getAllBook = async (params, baseUrl) => {
    const { title, genre, limit, offset } = params;

    const queryOptions = {
        limit: limit || 10,
        offset: offset || 0
    };

    if (genre) {
        queryOptions.where = { genre };
    }

    if (title) {
        queryOptions.where = {
            ...queryOptions.where,
            title: {
                [Op.iLike]: `%${title}%` 
            }
        };
    }

    const booksData = await Book.findAndCountAll(queryOptions);

    if (!booksData) throw new Error('No Book exist');

    const books = booksData.rows.map(book => {
        if (book.photo) {
            book.photo = `${baseUrl}/${book.photo}`;
        }
        return book;
    });

    return {
        totalItems: booksData.count,
        books: books,
        totalPages: Math.ceil(booksData.count / (limit || 10)),
        currentPages: Math.floor((offset || 0) / (limit || 10)) + 1
    };
};

const getBookById = async (params, baseUrl) => {
    const id = params;
    const book = await Book.findByPk(id);
    if (!book) throw new Error('Book not found');

    if (book.photo) {
        book.photo = `${baseUrl}/${book.photo}`;
    }

    return book;
}


const createBook = async (params) => {
    const {title, author, pages, synopsis, photo, upload_by, genre} = params;
    const book = await Book.create({
        title, author, pages, synopsis, photo, upload_by, genre
    });
    
    if(!book) throw new Error ('Failed create book');

    return book;
}

const updateBook = async (params) => {
    const {id, title, author, pages, synopsis, photo, upload_by, genre} = params;
    const update = await Book.update(
        {title, author, pages, synopsis, photo, upload_by, genre},
        {
            where:{
                id
            }
        }
        );

    if(!update) throw new Error('Book not found');

    const book = await Book.findByPk(id);

    return book;

    
}

const deleteBook = async (params) => {
    const id = params;
    const book = await Book.destroy({
        where: { 
            id 
        }
    });

    if (!book) throw new Error('Book not found');

    return book;
};


module.exports = {
    getAllBook,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}
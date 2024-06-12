import express from 'express';
import { createCategory, getAllCategories, getCategory, updateCategory, removeCategory } from '../controller/category'

const categoryRouter = express.Router();

categoryRouter.post('/category/add', createCategory);
categoryRouter.get('/category', getAllCategories);
categoryRouter.get('/category/:id', getCategory);
categoryRouter.put('/category/:id/update', updateCategory);
categoryRouter.delete('/category/:id', removeCategory);

export default categoryRouter;

import { Router } from 'express';

import { categories } from '../controllers/index.js';

const categoriesRouter = Router();

categoriesRouter.get('/', categories.getCategories);

export default categoriesRouter;

import { Request, Response, Router } from 'express';
import Test from '../services/test';
const router = Router();

router.get('/', async function(req: Request, res: Response) {
    const response = await Test.testService();

    res.send(response);
});

export default router;
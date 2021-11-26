import express, { Request, Response } from 'express';
import cors from 'cors';
import { sendMail } from './mail';

const port = 4000;

const main = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post('/send', async (req: Request, res: Response) => {
    try {
      await sendMail(req.body);
      res.json({
        success: 'Message was sent!',
      });
    } catch (e: any) {
      res.status(e.responseCode).json(e);
    }
  });

  app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
  });
};

main();

import express, { Request, Response } from 'express';
import cors from 'cors';
import { sendMail } from './mail';

const port = 4000;

const main = () => {
  const app = express();
  app.use(cors());

  app.get('/send', async (req: Request, res: Response) => {
    try {
      await sendMail(req.query.to as string);
      res.json({
        success: 'Message was sent!',
      });
    } catch (e) {
      res.status(e.responseCode).json(e);
    }
  });

  app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
  });
};

main();

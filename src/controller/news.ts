import { Request } from '../extendReqSession';
import { Response, NextFunction } from 'express';
import axios from 'axios';

interface ISourceResponce {
  id: string;
  name: string;
}

interface IResposeElement {
  source: ISourceResponce;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface IResponseData {
  status: string;
  totalResults: number;
  articles: Array<IResposeElement>;
}

interface customData {
  headline: string;
  link: string;
}

class News {
  constructor() {
    // Empty
  }

  async search(req: Request, res: Response, next: NextFunction) {
    if (req.session.user === '') {
      console.log('USER_NOT_LOGIN');
      res.status(401).send({
        status: 0,
        message: 'User is not login!',
      });
      return;
    }

    const { search } = req.query;
    if (!search) {
      res.send({
        status: 0,
        type: 'SEARCH_NOT_FOUND',
        message: 'search query is empty',
      });
      return;
    }
    const url = 'https://newsapi.org/v2/everything?q=' + search + '&page=1&apikey=?';         // Get api key from https://newsapi.org/
    const encoded = encodeURI(url);
    axios.get(encoded).then((response) => {
      const result: IResponseData = response.data;
      const customResult: Array<customData> = new Array<customData>();
      result.articles.forEach((element: IResposeElement) => {
        const newData: customData = {
          headline: element.description,
          link: element.url,
        };
        customResult.push(newData);
      });

      const newsData: Array<customData> = new Array<customData>();
      for (let i = 0; i < 10; i++) {
        newsData.push(customResult[i]);
      }

      res.send({
        count: 10,
        data: newsData,
      });
    });
  }
}

export default new News();

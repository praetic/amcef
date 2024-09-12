import  { Request, Response, NextFunction } from 'express'

export default (err: Error, req: Request, res: Response, _next: NextFunction)=> {
    console.error('Error handler: ', err);
    
    return res.status(500).json(err);
  }
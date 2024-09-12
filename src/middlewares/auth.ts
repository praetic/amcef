import  { Request, Response, NextFunction } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import config from 'config'
import generateTokens from '../utils/generateTokens'

export default (req: Request, res: Response, _next: NextFunction)=> {
    const {accessToken, refreshToken} = req.cookies

    const accessTokenSecret = config.get('jwt').accessTokenSecret
    jwt.verify(accessToken, accessTokenSecret, (err:JsonWebTokenError, decoded:any)=>{
        if(err) {
            if(!refreshToken){
                return res.status(403).json({ message: 'Invalid access token and no refresh token provided' });
            }
            const refreshTokenSecret = config.get('jwt').refreshTokenSecret
            jwt.verify(refreshToken, refreshTokenSecret, (err:JsonWebTokenError, decoded:any) => {
                if (err) {
                  return res.status(403).json({ message: 'Invalid refresh token' });
                }
                const {accessToken: newAccessToken,refreshToken : newRefreshToken} = generateTokens({ email: decoded.email })

                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,                
                    maxAge: 15 * 60 * 1000,
                  });
                
                res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,                   
                maxAge: 7 * 24 * 60 * 60 * 1000, 
                });
                _next()
            })
        }else{
            _next()
        }


    })   
    return res.status(500).json();
  }


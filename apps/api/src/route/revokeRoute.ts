import { Router, Request, Response } from 'express';
import { authenticated, setAuthenticated } from './auth/authenticationRoute';

const router = Router();


router.post('/revoke-access-token', async (req: Request, res: Response) => {
  if(!authenticated){
    return res.status(403).json({msg: "You are not authenticated to revoke the access token, we don't have the access token yet"})
  }
  const { access_token } = req.body;

  if (!access_token) {
    return res.status(400).json({ error: 'Access token is required.' });
  }

  const tokenRevocationUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + access_token;

  try {
    const response = await fetch(tokenRevocationUrl, { method: 'GET' });

    if (response.ok) {
      console.log('Access token revoked successfully.');
      setAuthenticated(false);
      res.json({ message: 'Access token revoked successfully.' });
    } else {
      console.error('Error revoking access token:', response.statusText);
      res.status(500).json({ error: 'Error revoking access token.' });
    }
  } catch (error) {
    console.error('Error revoking access token:', error);
    res.status(500).json({ error: 'Error revoking access token.' });
  }
});


export { router as revokeRoute };
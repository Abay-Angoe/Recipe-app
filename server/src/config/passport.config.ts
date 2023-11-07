import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import * as dotenv from 'dotenv';
import { Strategy, Profile } from 'passport';
import * as authServices from '../services/auth.service';


dotenv.config();


export default function (passport: any): void {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "http://localhost:8000/api/v1/auth/google/callback",
  },
    async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
      try {
        const userExist = await authServices.getUserByGoogleId(profile.id);

        if (userExist) {
          return done(null, userExist);
        }
        const user = await authServices.registerUserByGoogleId(profile.id, profile.displayName!);

        done(null, user);

      } catch (error) {
        done(error, null);
      }
    }));

  passport.serializeUser(async (user: any, done: (error: any, id?: any) => void) => {
    try {
      done(null, user.googleId);
    } catch (error) {
      done(error, null);
    }
  });

  passport.deserializeUser(async (id: string, done: (error: any, user?: any) => void) => {
    try {
      done(null, id);
    } catch (error) {
      done(error, null);
    }
  }
  );

}


import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';
import UserRepository from '@app/repositories/user.repository';
import JwtSettings from '@app/settings/jwt.settings';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JwtSettings.secretKey,
};

/**
 * A callback function used for a JWT strategy in Passport.js.
 *
 * Verifies that the user associated with a given JWT payload exists in the database.
 * Optionally extends the payload with additional user data if needed.
 *
 * @param payload - The decoded JWT payload containing user information
 * @param done - A callback function to signal completion or error
 */
const strategyCallback = async (
  payload: JwtPayload,
  done: VerifiedCallback
) => {
  const userEmail = payload.email;

  try {
    const userExists = await UserRepository.userExists(userEmail);

    if (userExists) {
      // Select the user and extend the payload data if required
      // ..
      return done(null, payload);
    } else {
      return done(null, null);
    }
  } catch (error) {
    return done(error, null);
  }
};

export default new Strategy(options, strategyCallback);

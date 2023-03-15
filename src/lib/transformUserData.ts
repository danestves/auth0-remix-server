import { camelize } from './camelize.js';
import type { Auth0UserProfile, UserProfile } from '../Auth0RemixTypes.js';

export const transformUserData = (data: Auth0UserProfile) =>
  camelize(data) satisfies UserProfile;

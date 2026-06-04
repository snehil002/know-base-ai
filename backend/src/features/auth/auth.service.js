const crypto = require('crypto');
const jwt = require("jsonwebtoken");

const authModel = require("./auth.model");
const emailService = require('../../utils/emailService');
const { JWT_SECRET, APP_URL } = require("../../config/env");

const generateJWTToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.sendMagicLink = async ({ companyEmail }) => {
  try {
    let user = await authModel.User.findOne({ companyEmail });
    if (!user) {
      user = await authModel.User.create({ companyEmail });
    }

    // Clear out any old tokens for this user
    await authModel.MagicToken.deleteMany({ userId: user._id });

    // 1. Generate the raw, secure random token
    const rawToken = crypto.randomBytes(32).toString('hex');

    // 2. Hash the token using SHA-256
    const hashedToken = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');

    // 3. Save the HASHED token to the database
    await authModel.MagicToken.create({
      userId: user._id,
      hashedToken: hashedToken
    });

    // 4. Send the RAW token in the URL (Never expose the hash to the user)
    const magicLinkUrl = `${APP_URL}/api/auth/verify?magicToken=${rawToken}`;

    await emailService.sendVerifyEmail({
      recipientEmail: companyEmail,
      magicLinkUrl,
      expirationMinutes: 15,
    });

    return { companyEmail, magicLinkUrl };

  } catch (err) {
    if (!err.forFrontend) {
      err.forFrontend = {
        message: "Failed to send verification email",
        statusCode: 500,
      };
    }
    throw err;
  }
};

exports.verifyMagicLink = async ({ magicToken: rawTokenFromUrl }) => {
  try {
    // 1. Hash the incoming raw token to match what's in the database
    const hashedTokenFromUrl = crypto
      .createHash('sha256')
      .update(rawTokenFromUrl)
      .digest('hex');

    // 2. Look up the document using the hashed token
    const savedToken = await authModel.MagicToken.findOne({ hashedToken: hashedTokenFromUrl })
      .populate('userId', '+isVerified');

    if (!savedToken) {
      const err = new Error("Invalid or expired magic link.");
      err.forFrontend = {
        message: err.message,
        statusCode: 400,
      };
      throw err;
    }

    // 3. NODE.JS EXPIRATION CHECK (15 minutes = 900,000 milliseconds)
    const tokenAgeInMilliseconds = Date.now() - savedToken.createdAt.getTime();
    const fifteenMinutes = 15 * 60 * 1000;

    if (tokenAgeInMilliseconds > fifteenMinutes) {
      // Manually delete it since we know it's dead, instead of waiting for TTL
      await authModel.MagicToken.deleteOne({ _id: savedToken._id });
      
      const err = new Error("Magic link has expired.");
      err.forFrontend = {
        message: err.message,
        statusCode: 400,
      };
      throw err;
    }

    const user = savedToken.userId;

    if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }

    // 4. Delete the token immediately so it's single-use
    await authModel.MagicToken.deleteOne({ _id: savedToken._id });

    const jwtToken = generateJWTToken(user._id);

    return {
      userId: user._id,
      user: {
        fullName: user.fullName,
        companyEmail: user.companyEmail,
      },
      jwtToken,
    };

  } catch (err) {
    if (!err.forFrontend) {
      err.forFrontend = {
        message: "Failed to verify email and authenticate user",
        statusCode: 500,
      };
    }
    throw err;
  }
};

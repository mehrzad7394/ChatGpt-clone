import { verifyToken } from "@clerk/backend";

const verifyTokenMiddleware = async (req, res, next) => {
  const bearerToken = req.headers.authorization?.replace("Bearer ", "");

  if (!bearerToken) {
    return res.status(401).send("Unauthenticated!");
  }

  try {
    const verifiedToken = await verifyToken(bearerToken, {
      secretKey: process.env.CLERK_SECRET_KEY,
      authorizedParties: [process.env.CLIENT_URL], // Replace with your authorized parties
      clockSkewInMs: 500000000,
    });

    req.verifiedToken = verifiedToken; // Attach verified token to request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).send("Unauthenticated!");
  }
};

export default verifyTokenMiddleware;

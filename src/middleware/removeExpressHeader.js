const removeExpressHeader = () => {
  return (req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
  };
};
export default removeExpressHeader;

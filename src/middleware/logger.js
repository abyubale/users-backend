import fs from 'fs';

const logger = (loggerFilePath) => {
  return (req, res, next) => {
    const { url, method, headers, ip } = req;
    const loggerMsg = `${new Date()} ${method}- ${url} ${headers['user-agent']} ${ip} \n`;
    fs.appendFile(loggerFilePath, loggerMsg, (err) => {
      if (err) {
        console.log(err);
      }
      next();
    });
  };
};
export default logger;

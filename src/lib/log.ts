export const logMessage = (
  message: string,
  color: "green" | "red" | "yellow" | "blue"
) => {
  const colors = {
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
  };
  return console.log(`${colors[color]}${message}\x1b[0m`);
};

/**
 *
 * @description magicTrimmer removes leading and trailing spaces from a string
 */

 const magicTrimmer = (payload) => {
    const data = {};
    if (payload) {
      Object.keys(payload).forEach((key) => {
        const value = payload[key];
        Object.assign(data, { [key]: value.trim()  value });
      });
      payload = data;
    }
    return payload;
  };

  module.exports = magicTrimmer;
module.exports = {
    getMain: (req, res) => {
      console.log("get main")
        res.send('Welcome to API v1.');
    },
    getJson: (req, res) => {
      console.log("get main")
      const randArr = ['String 1', 'String 2', 'String 3'];
      const rand = randArr[Math.floor(Math.random() * randArr.length)];
      res.json({test: rand});
    }
};
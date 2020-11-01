const config = require("config").imagga;
const axios = require("axios");

class TagService {
  runAutoTagging(req, res) {
    let getImageTags = function (image) {
      return new Promise((resolve, reject) => {
        console.log("get tags for", image.url)
        return axios.get(`${config.apiUrl}/v2/tags?image_url=${encodeURIComponent(image.url)}`, {
          headers: {
            'Authorization': config.authorization
          }
        })
          .then((response) => {
            image.tags = processTags(response.data.result.tags)
            resolve(image)
          })
          .catch((err) => {
            console.log("-----------error get tags for",image.url, err.response.data);
            reject(err)
          })
      })
    }
    console.log("***********runAutoTagging called");

    let { images } = req.body;

    let delay = 0;
    const delayIncrement = 500;

    // need to delay the requests not to be blocked by Imagga
    let imagePromises = images.map((image) => {
      delay += delayIncrement;

      return new Promise(resolve => setTimeout(resolve, delay))
        .then(() => {
          return getImageTags(image);
        });

    })
    Promise.all(imagePromises)
      .then((imagesResult) => {
        console.log("Promise.all success response", imagesResult);
        res.send({ message: "Tags Runned", images: imagesResult });
      })
      .catch((err) => {
        res.status(err.statusCode || 400).send({ message: err.message || err });
      })
  }
}
// select only tags with higher than 20 confidence, flatten the array
function processTags(tags) {
  let final = []
  tags.forEach((item) => {
    if (item.confidence > 30) {
      final.push(item.tag.en)
    }
  });
  console.log("tags processed", final);
  return final;

}

module.exports = new TagService();


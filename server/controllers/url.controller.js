const URL = require("../models/url.model");
const { v4: uuidv4 } = require("uuid");

const createURL = async (req, res) => {
  try {
    const { url } = req.body;
    const protocol = req.protocol;
    const host = req.get("host");

    const find_long_url = await URL.findOne({
      long_url: url,
    });

    if (!url || !verify_url(url)) {
      //checking is valid url or not
      return res
        .status(400)
        .json({ success: false, message: "No or Invalid URL" });
    }

    if (url.replace(/^(https?:\/\/)?(www\.)?/, "").length < 20) {
      return res
        .status(400)
        .json({ success: false, message: "URL is too short" });
    }

    if (find_long_url) {
      //checking is larger url already exist or not.
      return res.status(200).json({
        _id: find_long_url._id,
        success: true,
        message: "Already exist.Please run short url into browser.",
        short_url: protocol + "://" + host + "/" + find_long_url.short_url,
      });
    }

    const newData = await URL.create({
      //saving and creating new short url
      long_url: url,
      short_url: await verify_short_uri(),
      short_url_full_info:
        protocol + "://" + host + "/" + (await verify_short_uri()),
    });

    res.status(200).json({
      _id: newData._id,
      success: true,
      message: "Created.Please run short url into browser.",
      short_url: protocol + "://" + host + "/" + newData.short_url,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

const deleteUrl = async (req, res) => {
  try {
    const delete_url = await URL.findOneAndDelete({
      _id: req.params.id,
    });
    if (!delete_url) {
      return res.status(400).json({ success: false, message: "Not Found" });
    }
    res.status(200).json({ success: true, message: "Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

const redirectToUrl = async (req, res) => {
  try {
    const full_url = await URL.findOne({
      short_url: req.params.id,
    });
    if (!full_url) {
      return res.status(400).json({ success: false, message: "Not Found" });
    }
    res.redirect(full_url.long_url);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

const verify_short_uri = async () => {
  try {
    const short_url_code = uuidv4().slice(0, 8);
    const verify = await URL.findOne({ short_url: short_url_code });
    if (verify) return await verify_short_uri();
    return short_url_code;
  } catch (err) {
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

const verify_url = (urlString) => {
  try {
    const regex =
      /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    return regex.test(urlString);
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports = {
  createURL,
  redirectToUrl,
  deleteUrl,
};

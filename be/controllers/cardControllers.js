const Card = require("../model/cardModel");
const cardSchema = require("../schema/cardSchema");
const _ = require("lodash");
//const generatebusinessCardNumber = require("../model/cardModel");

//4
const card_post = async (req, res) => {
  const credentials = new cardSchema(req.body);
  const error = credentials.validateCard();

  //give random number
  async function generatebusinessCardNumber(Card) {
    while (true) {
      let randomNumber = _.random(1000, 999999);
      let card = await Card.findOne({ bizNumber: randomNumber });
      if (!card) return String(randomNumber);
    }
  }
  if (error) return res.status(400).send(error.details[0].message);

  let { bizName, about, address, phone, pic } = req.body;
  let card = new Card({
    bizName: bizName,
    about: about,
    address: address,
    phone: phone,
    pic: pic ? pic : "https://cdn.pixabay.com/photo/2015/10/05",
    bizNumber: await generatebusinessCardNumber(Card),
    user_id: req.user._id,
  });
  let post = await card.save();
  res.send(post);
};

//5
const get_card = async (req, res) => {
  const card = await Card.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(card);
};

//6
const update_card = async (req, res) => {
  const credentials = new cardSchema(req.body);
  const error = credentials.validateCard();
  if (error) return res.status(400).send(error.details[0].message);

  let card = await Card.findOneAndUpdate({ _id: req.params.id }, req.body);
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");

  card = await Card.findOne({ _id: req.params.id });
  res.send(card);
};

//7
const delete_card = async (req, res) => {
  const card = await Card.findOneAndDelete({
    _id: req.params.id,
  });
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(card);
};

//8
const cards_array = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    console.log(req.user);
    const allUserCards = await Card.find({ user_id: currentUserId });
    res.status(200).json({
      status: "succes",
      results: allUserCards.length,
      data: allUserCards,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = { card_post, get_card, update_card, delete_card, cards_array };

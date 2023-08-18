const { v4: uuidv4 } = require("uuid");

const ListingModel = require("../models/listings");

// Seed 2 listings for test user. Update to vinesh's seeded user
const seedListings = async (req, res) => {
  try {
    await ListingModel.deleteMany();

    await ListingModel.create([
      {
        _id: "64d0f3f75676c304033d8c89",
        listing_id: "1cabb62c-5e73-4738-b2fd-3da98aa5c08f",
        title: "My beloved bike",
        description: `I’m too busy with my coding bootcamp to ride it. Feel free to borrow it on weekends`,
        type: "loan",
        owner_id: "Owner1",
        date_available_from: `${new Date()}`,
        date_available_to: "2022-09-30",
        image_url:
          "https://images.immediate.co.uk/production/volatile/sites/21/2021/03/20210317_SB_5DSR_MG_4042-4cbecec.jpg?quality=90&resize=768%2C574",
      },
      {
        _id: "64d0f3f75676c304033d8c90",
        listing_id: "c66bb8e0-ef62-4f8a-a1b8-9b3b3cfb906d",
        title: "Onions",
        description: `Onions are a rich source of fiber and prebiotics, which are necessary for optimal gut health. I bought way too many onions. Giving away for free`,
        type: "free",
        owner_id: "Owner1",
        date_available_from: `${new Date()}`,
        date_available_to: "2022-08-30",
        image_url:
          "https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/onions.jpg?itok=NqLGNDHS",
      },
    ]);
    res.json({ status: "ok", msg: "Seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "Seeding error" });
  }
};

// Get all listings
const getAllListings = async (req, res) => {
  try {
    const allListings = await ListingModel.find();
    res.json(allListings);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "Error getting listings" });
  }
};

// Get listing by listing_id
const getListingById = async (req, res) => {
  try {
    const listing = await ListingModel.find({
      listing_id: req.params.listing_id,
    });
    console.log(listing);
    if (listing.length === 0) {
      return res
        .status(400)
        .json({ status: "error", error: "Listing not found" });
    }
    res.json(listing);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", message: "Cannot get listing" });
  }
};

// Create new listing
const createListing = async (req, res) => {
  try {
    const createdListing = new ListingModel({
      listing_id: uuidv4(),
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      owner_id: req.body.owner_id,
      date_available_from: req.body.date_available_from,
      date_available_to: req.body.date_available_to,
      image_url: req.body.image_url,
    });
    await createdListing.save();
    res.json({
      status: "ok",
      msg: "Listing saved",
      listing_id: createdListing.listing_id,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", message: "Cannot create listing" });
  }
};

//update a particular listing by listing_id
const patchListing = async (req, res) => {
  try {
    const listing = await ListingModel.find({
      listing_id: req.params.listing_id,
    });
    if (listing.length === 0) {
      return res
        .status(400)
        .json({ status: "error", error: "Listing not found" });
    }

    const updatedListing = {};
    if ("title" in req.body) updatedListing.title = req.body.title;
    if ("description" in req.body)
      updatedListing.description = req.body.description;
    if ("type" in req.body) updatedListing.type = req.body.type;
    if ("owner_id" in req.body) updatedListing.owner_id = req.body.owner_id;
    if ("date_available_from" in req.body)
      updatedListing.date_available_from = req.body.date_available_from;
    if ("date_available_to" in req.body)
      updatedListing.date_available_to = req.body.date_available_to;
    if ("image_url" in req.body) updatedListing.image_url = req.body.image_url;

    await ListingModel.updateOne(
      { listing_id: req.params.listing_id },
      updatedListing
    );
    res.json({ status: "ok", message: "Listing updated" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", message: "Cannot update listing" });
  }
};

//delete a particular listing by id
const deleteListing = async (req, res) => {
  try {
    const listing = await ListingModel.find({
      listing_id: req.params.listing_id,
    });
    if (listing.length === 0) {
      return res
        .status(400)
        .json({ status: "error", error: "Listing not found" });
    }
    await ListingModel.findOneAndDelete({ listing_id: req.params.listing_id });

    res.json({ status: "ok", message: "Listing deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "Cannot delete listing" });
  }
};

module.exports = {
  seedListings,
  getAllListings,
  getListingById,
  createListing,
  patchListing,
  deleteListing,
};

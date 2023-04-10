const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// Load input validation
const validateQuoteInput = require("../../validation/quote");
// Load Quote model
const Quote = require("../../models/Quote");

// @route POST api/quotes/create
// @desc Create a new quote
// @access Private
router.post("/create", (req, res) => {
    // Form validation
    const { errors, isValid } = validateQuoteInput(req.body);
    const { quoteName, email, subtasks } = req.body; // Get the quote data from the request body
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newQuote = new Quote({ // Create a new Quote object
      quoteName: quoteName,
      email: email,
      subtasks: subtasks
    });
  
    // Save the quote to the database
    newQuote
      .save()
      .then(quote => {
        console.log("Quote created successfully:", quote);
        res.json(quote);
      })
      .catch(err => {
        console.error("Failed to create quote:", err);
        res.status(500).json({ error: "Failed to create quote" });
      });
  });

// @route GET api/quotes/all
// @desc Fetch all quotes based on user email
// @access Private
router.get("/all", (req, res) => {
  console.log("TESTING GET ALL QUOTES");
  const email = req.query.email; // Get the email from the query parameter

  // Find all quotes with the provided email
  Quote.find({ email: email })
    .then(quotes => {
      console.log("Quotes fetched successfully:", quotes);
      res.json(quotes);
    })
    .catch(err => {
      console.error("Failed to fetch quotes:", err);
      res.status(500).json({ error: "Failed to fetch quotes" });
    });
});

// @route DELETE api/quotes/delete/:id
// @desc Delete a quote by ID
// @access Private
router.delete("/delete/:id", (req, res) => {
  const quoteId = req.params.id; // Get the quote ID from the URL parameter

  // Find the quote by ID and remove it from the database
  Quote.findByIdAndRemove(quoteId)
    .then(quote => {
      if (!quote) {
        // If quote is not found, return an error
        return res.status(404).json({ error: "Quote not found" });
      }
      console.log(`Quote with ID ${quoteId} deleted successfully`);
      res.json({ success: true });
    })
    .catch(err => {
      console.error(`Failed to delete quote with ID ${quoteId}:`, err);
      res.status(500).json({ error: "Failed to delete quote" });
    });
});

  module.exports = router;
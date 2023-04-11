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
    const fs = require('fs'); // Import the fs module to read the JSON file

    // Load the rateMap from the JSON file
    const rateMapPath = 'client/src/utils/rateMap.json';
    const rateMap = JSON.parse(fs.readFileSync(rateMapPath, 'utf-8'));

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newQuote = new Quote({ // Create a new Quote object
      quoteName: quoteName,
      email: email,
      subtasks: subtasks
    });

    // Initialize total costs
    let totalHumanResourceCost = 0;
    let totalPhysicalResourceCost = 0;
    let totalSubtaskCost = 0;
    let quoteCost = 0;

    // Define a function to generate a random number between min and max (inclusive)
    function getRandomNumber(min, max) {
      return Math.random() * (max - min) + min;
    }
    // create fudge factor for the quote and store in database
    const fudgeFactor = getRandomNumber(0.5, 1.5);
    newQuote.fudgeFactor = fudgeFactor;
    
    // Iterate through each subtask object in the subtasks array
    subtasks.forEach(subtask => {
      const humanResources = subtask.humanResources || []; // Access human resources, default to an empty array if not available
      const physicalResources = subtask.physicalResources || []; // Access physical resources, default to an empty array if not available

      // Iterate through humanResources
      humanResources.forEach(humanResource => {
        const hrHours = humanResource.hrHours; 
        const hrRate = humanResource.hrRate;
         // Get the rate value from the rateMap, default to 0 if rate not found
        const rateValue = rateMap[hrRate] || 0;

        // Calculate human resource cost for the subtask
        const humanResourceCost = hrHours * rateValue;
        // Add human resource cost to total human resource cost
        totalHumanResourceCost += humanResourceCost;
      });

      // Iterate through physicalResources
      physicalResources.forEach(physicalResource => {
        const prResourceType = physicalResource.prResourceType;
        const prCost = parseInt(physicalResource.prCost);
        const prHours = physicalResource.prHours;

        if (prResourceType === 'One-off') {
          // Add physical resource cost to total physical resource cost
          totalPhysicalResourceCost += parseInt(prCost);

        } else if (prResourceType === 'Hourly') {
          // Multiply prCost by prHours for hourly resources
          const totalCost = parseInt(prCost) * parseInt(prHours);
          // Add physical resource cost to total physical resource cost
          totalPhysicalResourceCost += totalCost;
        }
      });
      // calculate total cost for subtask by adding the sum of human and physical resources and then multiply fudge factor
      totalSubtaskCost = (totalHumanResourceCost+totalPhysicalResourceCost)*fudgeFactor;
      // save total costs for the subtask as a whole & the human and physical resources totals
      subtask.subtaskTotal = totalSubtaskCost;

      // add the total cost for the subtask to the quote cost
      quoteCost += totalSubtaskCost;

      // reset subtask-level items to 0 for next subtask
      totalHumanResourceCost = 0;
      totalPhysicalResourceCost = 0;
      totalSubtaskCost = 0;
    });
    
    // set the quote cost and new subtask object with the totals
    newQuote.quoteCost = quoteCost;
    newQuote.subtasks = subtasks;
    
    // Save the quote to the database
    newQuote
      .save()
      .then(quote => {
        console.log("Quote created successfully");
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
      quotes.forEach(quote => {
        console.log(quote.fudgeFactor);
      });
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

// @route GET api/quotes/all
// @desc Fetch all quotes based on user email
// @access Private
router.get("/view", (req, res) => {
  console.log("TESTING VIEW QUOTE");
  const quoteId = req.query.quoteId; // Get the email from the query parameter

  // Find all quotes with the provided email
  Quote.find({ _id: quoteId })
    .then(quote => {
      console.log("Quote found successfully:", quote);
      console.log(quoteId);
      res.json(quote);
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to find quote" });
    });
});

  module.exports = router;
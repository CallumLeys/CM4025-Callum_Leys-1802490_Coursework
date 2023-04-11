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
    
    // Iterate through each subtask object in the subtasks array
    subtasks.forEach(subtask => {
      const humanResources = subtask.humanResources || []; // Access human resources, default to an empty array if not available
      const physicalResources = subtask.physicalResources || []; // Access physical resources, default to an empty array if not available

      // Iterate through humanResources and retrieve descriptions
      humanResources.forEach(humanResource => {
        const hrHours = humanResource.hrHours; // Access the hrHours property of the human resource object
        const hrRate = humanResource.hrRate; // Access the hrRate property of the human resource object
        const rateValue = rateMap[hrRate] || 0; // Get the rate value from the rateMap, default to 0 if rate not found
        // Calculate human resource cost for the subtask
        const humanResourceCost = hrHours * rateValue;
        //console.log("Human Resource Hours:", hrHours);
        //console.log("Human Resource Rate:", hrRate);
        //console.log("Human Resource Rate Value:", rateValue);
        //console.log("Human Resource Cost for Subtask:", humanResourceCost);

        // Update human resource cost in the humanResources array
        humanResource.hrTotal = humanResourceCost;

        // Add human resource cost to total human resource cost
        totalHumanResourceCost += humanResourceCost;
      });

      // Iterate through physicalResources and retrieve descriptions
      physicalResources.forEach(physicalResource => {
        const prResourceType = physicalResource.prResourceType; // Access the prResourceType property of the physical resource object
        const prCost = physicalResource.prCost; // Access the prCost property of the physical resource object
        const prHours = physicalResource.prHours; // Access the prHours property of the physical resource object

        // Use prResourceType, prCost, and prHours as needed
        //console.log("Physical Resource Type:", prResourceType);

        if (prResourceType === 'One-off') {
          //console.log("Physical Resource Cost:", prCost);
          // Update physical resource cost in the physicalResources array
          physicalResource.prTotal = parseInt(prCost);
          // Add physical resource cost to total physical resource cost
          totalPhysicalResourceCost += parseInt(prCost);

        } else if (prResourceType === 'Hourly') {
          //console.log("Physical Resource Cost:", prCost);
          //console.log("Physical Resource Hours:", prHours);
          // Multiply prCost by prHours for hourly resources
          const totalCost = parseInt(prCost) * parseInt(prHours);
          //console.log("Total Cost:", totalCost);
          // Update physical resource cost in the physicalResources array
          physicalResource.prTotal = totalCost;
          // Add physical resource cost to total physical resource cost
          totalPhysicalResourceCost += totalCost;
        }
      });
      subtask.subtaskTotalCost = totalHumanResourceCost + totalPhysicalResourceCost;

      //console.log('HR total:',totalHumanResourceCost);
      //console.log('PR total:',totalPhysicalResourceCost);
      totalSubtaskCost = totalHumanResourceCost+totalPhysicalResourceCost;
      //console.log('Subtask total:',totalSubtaskCost);
      quoteCost += totalSubtaskCost;
    });

    newQuote.quoteCost = quoteCost;
    console.log('Quote total:',quoteCost);
    console.log('QUOTE TEST----',newQuote)
    
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
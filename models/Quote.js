const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  quoteName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  quoteCost:{
    type: Number
  },
  subtasks: [
    {
      subtaskName: {
        type: String,
        required: true
      },
      subtaskTotal: {
        type: Number
      },
      humanResources: [
        {
          hrJobDescription: {
            type: String,
            required: function() {
              return this.humanResources && this.humanResources.length > 0;
            }
          },
          hrHours: {
            type: Number,
            required: function() {
              return this.humanResources && this.humanResources.length > 0;
            }
          },
          hrRate: {
            type: String,
            required: function() {
              return this.humanResources && this.humanResources.length > 0;
            }
          },
          htTotal: {
            type: Number
          }
        }
      ],
      physicalResources: [
        {
          prResourceType: {
            type: String,
            required: function() {
              return this.physicalResources && this.physicalResources.length > 0;
            }
          },
          prDescription: {
            type: String,
            required: function() {
              return this.physicalResources && this.physicalResources.length > 0;
            }
          },
          prCost: {
            type: String,
            required: function() {
              return this.physicalResources && this.physicalResources.length > 0;
            }
          },
          prHours: {
            type: Number,
            required: function() {
              return this.physicalResources && this.physicalResources.length > 0 && this.prResourceType != 'One-off';
            }
          },
          prTotal: {
            type: Number
          }
        }
      ]
    }
  ]
});

// Custom validation to ensure at least one of humanResources or physicalResources is present
UserSchema.path("subtasks").validate(function(value) {
  for (let i = 0; i < value.length; i++) {
    if ((value[i].humanResources && value[i].humanResources.length > 0) ||
        (value[i].physicalResources && value[i].physicalResources.length > 0)) {
      return true;
    }
  }
  return false;
}, "At least one of humanResources or physicalResources is required.");

module.exports = User = mongoose.model("quotes", UserSchema);
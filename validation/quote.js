const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateQuoteInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.quoteName = !isEmpty(data.quoteName) ? data.quoteName : "";
  data.subtasks = Array.isArray(data.subtasks) ? data.subtasks : [];

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // value checks
  if (Validator.isEmpty(data.quoteName)) {
    errors.quoteName = "Quote name is required";
  }

  // subtasks checks
  if (data.subtasks.length === 0) {
    errors.subtasks = "At least one subtask is required";
  } else {
    data.subtasks.forEach((subtask, index) => {
      if (!subtask.subtaskName || Validator.isEmpty(subtask.subtaskName)) {
        errors[`subtaskName_${index}`] = "Subtask name is required";
      }
      if (
        (!subtask.humanResources || subtask.humanResources.length === 0) &&
        (!subtask.physicalResources || subtask.physicalResources.length === 0)
      ) {
        errors[`resources_${index}`] =
          "At least one of humanResources or physicalResources is required";
      } else {
        if (
          subtask.humanResources &&
          subtask.humanResources.length > 0
        ) {
          subtask.humanResources.forEach((hr, hrIndex) => {
            if (
              !hr.hrJobDescription ||
              Validator.isEmpty(hr.hrJobDescription)
            ) {
              errors[`hrJobDescription_${index}_${hrIndex}`] =
                "HR Job Description is required";
            }
            if (!hr.hrHours || Validator.isEmpty(hr.hrHours.toString())) {
                errors[`hrHours_${index}_${hrIndex}`] = "HR Hours is required";
            }
            if (Validator.isEmpty(hr.hrRate)) {
              errors[`hrRate_${index}_${hrIndex}`] = "HR Rate is required";
            }
          });
        }
        if (
          subtask.physicalResources &&
          subtask.physicalResources.length > 0
        ) {
          subtask.physicalResources.forEach((pr, prIndex) => {
            if (
              !pr.prResourceType ||
              Validator.isEmpty(pr.prResourceType)
            ) {
              errors[`prResourceType_${index}_${prIndex}`] =
                "PR Resource Type is required";
            }
            if (!pr.prDescription || Validator.isEmpty(pr.prDescription)) {
              errors[`prDescription_${index}_${prIndex}`] =
                "PR Description is required";
            }
            if (Validator.isEmpty(pr.prCost)) {
              errors[`prCost_${index}_${prIndex}`] =
                "PR Cost is required";
            }            
            if (!pr.prHours || Validator.isEmpty(pr.prHours.toString())) {
              if (pr.prResourceType == 'Hourly') {
                errors[`prHours_${index}_${prIndex}`] =
                  "PR Hours is required";
              }
            }
          });
        }
      }
    });
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
``

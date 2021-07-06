module.exports = {
    id_empty: (name) => {
      return `${name} id is required`;
    },
    id_wrong: (name) => {
      return `${name} id is wrong, no ${name} data found`;
    },
    code_used: (name) => {
      return `${name} code has been used for other block`;
    },
    interval_used: () => {
      return `had already data within time interval`;
    },
    code_empty: (name) => {
      return `${name} code is required`;
    },
    code_wrong: (name) => {
      return `${name} code is wrong, no ${name} data found`;
    },
    not_found: (name) => {
      return `${name} data is not found`;
    },
    input_incorrect: () => {
      return `set of input data are not correct`;
    },
    no_permission: () => {
      return `current user role have no permission to do action / or to do action with parameters that you input`
    },
    forbiden_input: () => {
      return `some input (${name}) are not allowed`
    }
  }
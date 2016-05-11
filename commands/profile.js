'use strict';

const profile = require('@blinkmobile/aws-profile-management').profile;

function write (profileName) {
  return profile.write(profileName)
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = function (input, flags, options) {
  if (input[0]) {
    return write(input[0]).then(() => profile.show());
  }

  profile.show();
};

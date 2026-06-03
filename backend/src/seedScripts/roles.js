const authModel = require('../features/auth/auth.model');

exports.seedRoles = async () => {
  try {
    const rolesToSeed = [
      { _id: 'invited' },
      { _id: 'member' },
      { _id: 'admin' },
      { _id: 'owner' },
    ];

    for (const role of rolesToSeed) {
      // upsert: true updates the role if it exists, or creates it if it doesn't
      await authModel.Role.findByIdAndUpdate(role._id, role, { upsert: true });
    }

    console.log('Roles dictionary created successfully.');
  
  } catch (err) {
    err.forBackend = {
      message: 'Roles dictionary creation failed.',
    };
    throw err;
  }
};
const { Role } = require('../features/auth/auth.model');

const seedRoles = async () => {
  const rolesToSeed = [
    { _id: 'invited' },
    { _id: 'member' },
    { _id: 'admin' },
    { _id: 'owner' },
  ];

  for (const role of rolesToSeed) {
    // upsert: true updates the role if it exists, or creates it if it doesn't
    await Role.findByIdAndUpdate(role._id, role, { upsert: true });
  }

  console.log('Roles dictionary created successfully.');
};

module.exports = seedRoles;
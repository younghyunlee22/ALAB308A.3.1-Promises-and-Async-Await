import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  try {
    const valueReturnedFromCentral = await central(id);
    // console.log("line 13", valueReturnedFromCentral);
    const valueReturnedFromDB = await dbs[valueReturnedFromCentral](id);
    // console.log("line 15", valueReturnedFromDB);
    const valueReturnedFromVault = await vault(id);
    // console.log("line 17", valueReturnedFromVault);
    return {
      id: id,
      name: valueReturnedFromVault.name,
      username: valueReturnedFromDB.username,
      email: valueReturnedFromVault.email,
      address: valueReturnedFromVault.address,
      phone: valueReturnedFromVault.phone,
      website: valueReturnedFromDB.website,
      company: valueReturnedFromDB.company,
    };
  } catch (err) {
    console.log(err);
  }
}

getUserData(1);

// Logging the result
// Method 1.

getUserData(1)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Method 2.

(async () => {
  try {
    const result = await getUserData(1);
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
})();

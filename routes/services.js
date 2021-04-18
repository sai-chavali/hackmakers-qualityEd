const path = require('path');
const admin = require('firebase-admin');

/*
* Setting up clients
* */
let serviceAccount;
let firebaseDatabaseURL = "https://hackmakers-qualityed-default-rtdb.firebaseio.com/";
if (process.env.NODE_ENV !== 'production') {
    serviceAccount = require(
        path.join(__dirname, '../dev-hackmakers-qualityed-firebase-admin-sdk.json'));
} else if (process.env.NODE_ENV === 'production') {
    console.log('Setting up prod firebase account details');
    // todo: replace this when you get actual details
    serviceAccount = {
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY,
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    }
    firebaseDatabaseURL = "https://hackmakers-qualityed-default-rtdb.firebaseio.com/";
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: firebaseDatabaseURL
});

// Authentication check middleware
function checkAuth(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.startsWith(
        'Bearer ')) {
        const idToken = req.headers.authorization.split('Bearer ')[1];
        admin.auth()
            .verifyIdToken(idToken)
            .then((decodedIdToken) => {
                req.principle = decodedIdToken;
                next()
            })
            .catch((err) => {
                err.message = 'Unauthorized' + err;
                err.status = 403;
                next(err)
            });
    } else {
        const error = new Error('Unauthorized');
        error.status = 403;
        next(error);
    }
}

module.exports = {
    checkAuth
}

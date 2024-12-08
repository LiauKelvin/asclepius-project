const { Firestore } = require('@google-cloud/firestore');
const InputError = require('../exceptions/InputError');

async function storeData(id, data) {
    try {
        const db = new Firestore({databaseId: "(default)"});
        const predictCollection = db.collection('predictions');
        return predictCollection.doc(id).set(data);
    } catch (error) {
        console.error('Error storing data:', error.message);
        throw new InputError('Error storing prediction data');
    }  
}

module.exports = storeData;
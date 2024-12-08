const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeImage(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = score[0] * 100;

        // Menentukan label bersarakan score apakah lebih atau kurang dari 50%
        let label, suggestion;

        if (score[0] > 0.5) {
            label = 'Cancer'
            suggestion = "Segera periksa ke dokter!"
        } else {
            label = 'Non-cancer'
            suggestion = "Penyakit kanker tidak terdeteksi."
        }

        return { confidenceScore, label, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }
}

module.exports = predictClassification;
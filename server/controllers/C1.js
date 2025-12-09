import axios from "axios";
import modela1 from "../models/Models11.js";
const C1 = async (req, res) => {
    try {
        const { Name } = req.body;

        if (!Name || Name.length == 0) {
            return res.status(400)
                .json({
                    message: "no name is there"
                })

        }
        const promises = Name.map(async (names) => {
            const getname = await axios.get(`https://api.nationalize.io?name=${names}`);
            const country1 = getname.data.country[0];

            const savedata = new modela1({
                Name: names,
                Predicted_Country: country1?.country_id || "NA",
                Confidence_Score: country1?.probability || 0,
                status: (country1?.probability || 0) > 0.6,
                Statuschcek: (country1?.probability || 0) > 0.6 ? "checked" : "toCheck",
                synced: false
            });
            return savedata.save();

        })
        const result = await Promise.all(promises);
        return res.status(201).json({
            message: "Batch processed successfully",
            data: result
        });

    }
    catch (e) {
        console.error(e);
        return res.status(500).json({
            message: "Internal server error",
            error: e.message
        });
    }
}
export default C1;
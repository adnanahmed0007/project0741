import cron from "node-cron";
import modela1 from "../models/Models11.js";


cron.schedule("*/5 * * * *", async () => {
    try {
        console.log("[Cron Job] Checking for verified leads to sync...");


        const leadsToSync = await modela1.find({ status: true, synced: false });

        if (leadsToSync.length === 0) {
            console.log("[Cron Job] No leads to sync right now.");
            return;
        }

        for (const lead of leadsToSync) {

            console.log(`[CRM Sync] Sending verified lead ${lead.Name} to Sales Team...`);

            lead.synced = true;
            await lead.save();
        }

        console.log(`[Cron Job] ${leadsToSync.length} leads synced successfully.`);

    } catch (err) {
        console.error("[Cron Job] Error:", err.message);
    }
});

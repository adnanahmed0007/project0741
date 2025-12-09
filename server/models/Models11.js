import express from "express";
import mongoose from "mongoose";
const model = new mongoose.Schema({
    Name:
    {
        type: String,
        required: true,
    }
    ,
    Predicted_Country:
    {
        type: String,
        required: true,
    },
    Confidence_Score:
    {
        type: Number,
        required: true,
    },
    status:
    {
        type: Boolean,
        default: false
    }
    , Statuschcek:
    {
        type: String,
        default: "toCheck",
    },
    synced: {
        type: Boolean,
        default: false
    }


})
const modela1 = mongoose.model("modelC1", model);
export default modela1;
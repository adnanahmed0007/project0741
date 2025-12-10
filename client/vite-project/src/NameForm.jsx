import React, { useState } from "react";
import axios from "axios";

const App = () => {
    const [names, setNames] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [filter, setFilter] = useState("all");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResults([]);

        // Split names by comma or space
        const nameArray = names
            .split(/[\s,]+/)
            .map((n) => n.trim())
            .filter((n) => n.length > 0);

        try {
            const response = await axios.post(
                "http://localhost:3000/api/process-names",
                { Name: nameArray }, { withCredentials: true }
            );

            setResults(response.data.data);
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredResults = results.filter((r) => {
        if (filter === "verified") return r.status === true;
        if (filter === "tocheck") return r.status === false;
        return true;
    });

    return (
        <div style={{ maxWidth: "800px", margin: "40px auto", fontFamily: "Arial" }}>
            <h1>Name Nationality Predictor</h1>

            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Enter names separated by space or comma"
                    value={names}
                    onChange={(e) => setNames(e.target.value)}
                    style={{
                        width: "100%",
                        height: "80px",
                        padding: "10px",
                        fontSize: "16px",
                    }}
                />

                <button
                    type="submit"
                    style={{
                        marginTop: "10px",
                        padding: "10px 20px",
                        background: "black",
                        color: "white",
                        cursor: "pointer",
                        borderRadius: "5px",
                        border: "none",
                    }}
                >
                    Predict
                </button>
            </form>

            {loading && (
                <p style={{ marginTop: "20px", fontSize: "18px" }}>Processing...</p>
            )}

            {results.length > 0 && (
                <div style={{ marginTop: "30px" }}>
                    <h3>Results</h3>

                    {/* Filter Buttons */}
                    <div style={{ marginBottom: "15px" }}>
                        <button onClick={() => setFilter("all")}>All</button>
                        <button onClick={() => setFilter("verified")} style={{ marginLeft: "10px" }}>
                            Verified
                        </button>
                        <button onClick={() => setFilter("tocheck")} style={{ marginLeft: "10px" }}>
                            To Check
                        </button>
                    </div>

                    <table border="1" cellPadding="10" style={{ width: "100%" }}>
                        <thead>
                            <tr style={{ background: "#eee" }}>
                                <th>Name</th>
                                <th>Predicted Country</th>
                                <th>Confidence</th>
                                <th>Status</th>
                                <th>Status Check</th>
                                <th>Synced</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResults.map((r, index) => (
                                <tr key={index}>
                                    <td>{r.Name}</td>
                                    <td>{r.Predicted_Country || "NA"}</td>
                                    <td>{r.Confidence_Score}</td>
                                    <td>{r.status ? "Verified" : "Not Verified"}</td>
                                    <td>{r.StatusCheck}</td>
                                    <td>{r.issynced ? "Yes" : "No"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default App;

